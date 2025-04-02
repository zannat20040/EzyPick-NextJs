import { BannerCarousel } from "@/_ClientSideComponents/Home/BannerCarousel";
import Offers from "@/_components/Homepage/Offers";
import Headline from "@/_components/shared/Headline";

export default function Home() {
  return (
    <div>
      <BannerCarousel />
      {/* flash offer*/}
      <div>
        <Offers />
      </div>
      {/* catagory */}
      <div>
        <Headline label="Categories" />
      </div>
    </div>
  );
}
