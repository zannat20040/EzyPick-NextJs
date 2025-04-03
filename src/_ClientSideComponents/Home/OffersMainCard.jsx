import Image from "next/image";

export default function OffersMainCard({mainOffer}) {
  return (
    <>
      {mainOffer && (
        <div className="h-full relative flex ">
          <Image
            src={mainOffer?.image}
            alt={mainOffer?.title ||'main offer'}
            width={1024}
            height={650}
            unoptimized={true}
            quality={100}
            className="h-full w-full object-cover"
          />
          <div
            style={{
              background: `linear-gradient(to top, ${mainOffer?.bgColor}, transparent)`,
            }}
            className={`h-full absolute top-0 p-5 w-full `}
          >
            <p className="text-white">{mainOffer?.category}</p>
            <h1 className="font-bold text-2xl text-white">
              {mainOffer?.discount}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
