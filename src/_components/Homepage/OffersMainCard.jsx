import Image from "next/image";

export default function OffersMainCard({ mainOffer }) {
  return (
    <>
      {mainOffer && (
        <div className="h-full relative flex ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${mainOffer?.image}`} // assumes image is stored as URL path
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
            <p className="text-white">category</p>
            <h1 className="font-bold text-2xl text-white">
              {mainOffer?.offer}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
