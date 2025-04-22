import { BannerCarousel } from "@/_components/Homepage/Banner/BannerCarousel";
import Allproduct from "@/_components/Homepage/Allproduct";
import Categories from "@/_components/Homepage/Catagories";
import Offers from "@/_components/Homepage/Offer/Offers";
import Recommentation from "@/_components/Homepage/Recommentation";
import Footer from "@/_components/shared/Footer";
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
      
    </div>
  );
}
