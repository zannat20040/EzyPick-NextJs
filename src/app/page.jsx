import { BannerCarousel } from "@/_components/Homepage/BannerCarousel";
import Offers from "@/_components/Homepage/Offers";
import Headline from "@/_components/shared/Headline";

export default function Home() {
  return (
    <div>
      <BannerCarousel />
      {/* flash offer*/}
      <div className="">
        <Headline />
        <Offers />
      </div>
    </div>
  );
}
