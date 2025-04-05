import { BannerCarousel } from "@/_ClientSideComponents/Home/BannerCarousel";
import Allproduct from "@/_components/Homepage/Allproduct";
import Categories from "@/_components/Homepage/Catagories";
import Offers from "@/_components/Homepage/Offers";
import Recommentation from "@/_components/Homepage/Recommentation";
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
      {/* top recommendation */}
      <div>
        <Recommentation />
      </div>
      {/* all product */}
      <div>
        <Allproduct />
      </div>
      {/* footer */}
      <div>
        <Allproduct />
      </div>
      
    </div>
  );
}
