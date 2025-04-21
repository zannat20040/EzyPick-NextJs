import Link from "next/link";
import RegisterComponent from "@/_ClientSideComponents/Authentication/RegisterComponent";
import SocialLogin from "@/_ClientSideComponents/Authentication/SocialLogin";

export default function RegisterPage() {
  
  return (
    <div className="mt-10  container px-4  space-y-3 rounded  bg-white">
      <RegisterComponent />
      {/* <SocialLogin /> */}
      <p className="text-sm text-center gap-2 flex justify-center sm:px-6 text-gray">
        Don&apos;t have an account?
        <Link
          href={"/authentication"}
          className="underline hover:text-pale-red duration-300  transition-all"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
