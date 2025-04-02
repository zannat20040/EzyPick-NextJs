// app/components/Offers.js
import OffersComponent from "@/_ClientSideComponents/Home/OffersComponent";
import axios from "axios";

const fetchOffers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/json/Offers.json`
    );
    return data || [];
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
