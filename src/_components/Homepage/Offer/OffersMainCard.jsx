import { useAuth } from "@/Context/AuthContext";
import { logInteraction } from "@/utils/logInteraction";
import Image from "next/image";
import Link from "next/link";

export default function OffersMainCard({ mainOffer }) {
  const { user } = useAuth(); // assuming you store user here

  const handleTrackClick = async (e) => {
    // Track but don't block navigation
    if (user?.email) {
      await logInteraction({
        email: user.email,
        type: "click",
        product: {
          _id: mainOffer._id,
          name: mainOffer.name,
          category: mainOffer.category,
          subcategory: mainOffer.category?.subcategory,
          seller: mainOffer.sellerName,
          price: mainOffer.price,
        },
      });
    }
  };

  return (
    <>
      {mainOffer && (
        <Link
          href={`/product/${mainOffer.name}/pid-${mainOffer._id}`}
          onClick={handleTrackClick}
        >
          <div className="h-full relative flex ">
            <Image
              src={mainOffer?.thumbnail} // assumes image is stored as URL path
              alt={mainOffer?.name || "main offer"}
              width={1024}
              height={650}
              unoptimized={true}
              quality={100}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background: `linear-gradient(to bottom, #f8796c, transparent)`,
              }}
              className={`h-full absolute top-0 p-5 w-full `}
            >
              <p className="text-white capitalize">
                {mainOffer.category.title}
              </p>
              <h1 className="font-bold text-2xl text-white">
                {mainOffer?.offer}
              </h1>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
