import { useEffect, useState } from "react";
import QuantityUpdate from "./QuantityUpdate";
import { IoIosRemoveCircle } from "react-icons/io";
import swal from "sweetalert";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/Context/AuthContext";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const price = item.productId.price;
  const { user } = useAuth();
  const [showMessage, setShowMessage] = useState("");
  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage("");
      }, 2000); // ⏳ 2 seconds

      return () => clearTimeout(timeout); // cleanup on re-render
    }
  }, [showMessage]);

  const handleRemove = async () => {
    const willDelete = await swal({
      title: "Are you sure you want to delete this product?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!willDelete) {
      return swal("Product deletion from cartlist cancelled!");
    }

    try {
      const res = await axiosInstance.post("/api/user-cart/cart/remove", {
        email: user.email,
        productId: item.productId._id,
      });

      if (res.data) {
        await swal("Product removed from cartlist successfully", {
          icon: "success",
        });
      }
    } catch (err) {
      toast.error("Failed to remove from cartlist");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-5 justify-between items-center border-b border-neutral-100 pb-6">
      <div className="col-span-5 flex flex-wrap items-center gap-10">
        <img
          className="w-[75px] h-[75px] rounded-lg bg-slate-500"
          src={item.productId.thumbnail}
          alt=""
        />
        <div className="flex flex-col flex-wrap">
          {showMessage && (
            <p className="bg-red-50 w-fit text-red-600 py-1 px-3 mt-2 font-semibold text-xs rounded-md ">
              {showMessage}
            </p>
          )}
          <span className="text-lg break-words font-medium">
            {item.productId.name}
          </span>
          <p className="text-sm text-gray-400">
            Category: {item.productId.category.title}
          </p>
          <p className="text-sm text-gray-400">Price: {price}৳</p>
        </div>
      </div>

      <div className="col-span-1 flex justify-center">
        <QuantityUpdate
          setShowMessage={setShowMessage}
          quantity={quantity}
          setQuantity={setQuantity}
          productId={item.productId._id}
        />
      </div>

      <div className="col-span-1 text-center">
        <h6 className="text-xl font-medium text-slate-800">
          {price * quantity}৳
        </h6>
      </div>

      <button onClick={handleRemove} className="col-span-1 flex justify-end">
        <IoIosRemoveCircle className="text-2xl text-pale-red cursor-pointer" />
      </button>
    </div>
  );
}
