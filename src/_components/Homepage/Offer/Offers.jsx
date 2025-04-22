import OffersComponent from "@/_components/Homepage/Offer/OffersComponent";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const fetchOffers = async () => {
  try {
    const res = await axiosInstance.get("/items/products");

    // Filter products that contain a valid "offer"
    const offers = res.data?.data?.filter(
      (product) => product.offer && product.image
    );

    return offers || [];
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

const Offers = async () => {
  const offersData = await fetchOffers();

  if (!offersData.length) {
    return (
      <div className="text-center py-10">
        No offers available at the moment.
      </div>
    );
  }

  return <OffersComponent offers={offersData} />;
};

export default Offers;
