"use client";
import React, { useEffect, useState } from "react";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { Button, Radio, Typography } from "@material-tailwind/react";
import Link from "next/link";
import ImageUploader from "@/_components/shared/ImageUploader";
import SocialLogin from "./SocialLogin";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
  const [showPass, setShowPass] = useState(false);
  const [showC_Pass, setShowC_Pass] = useState(false);
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [isPassSame, setIsPassSame] = useState(true);
  const [checkValue, setCheckValue] = useState("buyer");
  const { loading, signUp, setLoading } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  // const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsPassSame(!password || !c_password || password === c_password);
  }, [password, c_password]);

  const HandleUserSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.firstname.value;
    const lastName = form.lastname.value;
    const email = form.email.value;
    const pwd = form.password?.value;

    try {
      if (checkValue === "buyer") {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          email,
          password: pwd,
        };

        const userCredential = await signUp(email, pwd);
        const user = userCredential?.user;

        if (user) {
          try {
            await axiosInstance.post("/items/users", userData);
            toast.success("You have successfully registered!");
            form.reset();
            router.push("/order");
          } catch (error) {
            await user.delete?.();
            toast.error(
              error?.response?.data?.error ||
                error.message ||
                "Unexpected error occurred. Please try again."
            );
          }
        } else {
          toast.error("Unexpected error occurred. Please try again.");
        }
      } else {
        const sellerData = {
          seller_name: `${firstName} ${lastName}`,
          seller_email: email,
          seller_number: form.seller_number?.value,
          seller_address: form.seller_address?.value,
          company_name: form.company_name?.value,
          company_email: form.company_email?.value,
          company_phone: form.company_phone?.value,
          company_address: form.company_address?.value,
          profile_picture: profileImage,
          company_logo: logoImage,
          // company_documents: files,
        };

        const response = await axiosInstance.post("/items/seller", sellerData);
        if (response && response.data) {
          toast.success(
            "You have successfully requested for seller account! We will get back to you soon!"
          );
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response?.data.errors[0] || error.message
      );

      toast.error(
        error.message || "Unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={HandleUserSignUp} className="space-y-2 text-gray">
        <div className="flex gap-2 items-center">
          <p className="text-sm">Select account type </p>
          <Radio
            onClick={() => setCheckValue("buyer")}
            defaultChecked
            name="type"
            ripple={false}
            icon={<FaCircleCheck className="text-pale-red" />}
            className="border-soft-gray  p-0 transition-all hover:before:opacity-0"
            label={
              <Typography
                color="blue-gray"
                className="font-normal text-sm text-gray"
              >
                Buyer
              </Typography>
            }
          />
          <Radio
            onClick={() => setCheckValue("seller")}
            name="type"
            ripple={false}
            icon={<FaCircleCheck className="text-pale-red" />}
            className="border-soft-gray  p-0 transition-all hover:before:opacity-0"
            label={
              <Typography
                color="blue-gray"
                className="font-normal text-gray text-sm"
              >
                Seller
              </Typography>
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-2">
          <input
            required
            type="text"
            name="firstname"
            placeholder="First name"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
          />
          <input
            required
            type="text"
            name="lastname"
            placeholder="Last name"
            className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
          />
        </div>

        <input
          required
          type="email"
          name="email"
          placeholder="example@mail.com"
          className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
        />

        {checkValue === "buyer" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-2 ">
            {[
              {
                show: showPass,
                setShow: setShowPass,
                value: password,
                setValue: setPassword,
                name: "password",
                placeholder: "Password",
              },
              {
                show: showC_Pass,
                setShow: setShowC_Pass,
                value: c_password,
                setValue: setC_Password,
                name: "c_password",
                placeholder: "Confirm password",
              },
            ].map((item, i) => (
              <div key={i} className="text-sm relative">
                <input
                  required
                  onChange={(e) => item.setValue(e.target.value)}
                  type={item.show ? "text" : "password"}
                  name={item.name}
                  placeholder={item.placeholder}
                  className={`${
                    isPassSame ? "border-soft-gray" : "border-red-400"
                  } w-full px-4 py-3 rounded border focus:outline-none`}
                />
                {item.show ? (
                  <GoEyeClosed
                    className="cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                    onClick={() => item.setShow(!item.show)}
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer absolute top-0 bottom-0 my-auto right-3"
                    onClick={() => item.setShow(!item.show)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {checkValue === "seller" && (
          <div className="">
            <div className="gap-2 flex flex-col">
              <input
                required
                type="text"
                name="seller_number"
                placeholder="Your Phone Number"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
              />
              <input
                type="text"
                name="seller_address"
                placeholder="Your Address"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
              />
            </div>
            <ImageUploader
              placeholder="Upload Your Profile Picture"
              additional_note="Only PNG, JPG or JPEG allowed"
              multiple={false}
              onUploadSuccess={(id) => setProfileImage(id)}
            />
            <input
              required
              type="text"
              name="company_name"
              placeholder="Your Company Name"
              className="w-full px-4 py-3 my-2 rounded border border-soft-gray focus:outline-none text-sm"
            />
            <div className="flex gap-2">
              <input
                type="email"
                name="company_email"
                placeholder="Company Email"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
              />
              <input
                type="text"
                name="company_phone"
                placeholder="Company Phone"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
              />
            </div>
            <input
              required
              type="text"
              name="company_address"
              placeholder="Company Address"
              className="w-full px-4 py-3 my-2 rounded border border-soft-gray focus:outline-none text-sm"
            />
            <ImageUploader
              placeholder="Choose Your Company Logo"
              additional_note="File should be in PNG, JPEG or JPG format"
              multiple={false}
              onUploadSuccess={(id) => setLogoImage(id)}
            />

            {/* <ImageUploader
            placeholder="Upload Company Documents"
            additional_note="Multiple files allowed"
            multiple={true}
            onUploadSuccess={(ids) => setFiles(ids)}
          /> */}
          </div>
        )}

        <div className="flex justify-end text-xs">
          <Link
            href="#"
            className="hover:underline hover:text-pale-red transition-all duration-300"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          disabled={loading || !isPassSame || password.length < 6}
          type="submit"
          className="hover:bg-black bg-pale-red w-full text-white uppercase font-medium rounded"
        >
          {loading ? "Please wait a moment..." : ` Register as ${checkValue}`}
        </Button>
      </form>
      {checkValue === "buyer" && <SocialLogin />}
    </div>
  );
}
