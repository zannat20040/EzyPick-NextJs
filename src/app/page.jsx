import { BannerCarousel } from "@/_ClientSideComponents/Home/BannerCarousel";
import Categories from "@/_components/Homepage/Catagories";
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
        <Categories />
      </div>
    </div>
  );
}
