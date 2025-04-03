import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

export default function ViewLessAll({ data, setShowOffers, chunkArray }) {
  const [isViewAll, setIsViewAll] = useState(false);
  const HandleAllOffer = () => {
    if (isViewAll) {
      setShowOffers(chunkArray(data, 3).slice(0, 1)); // Show only first 3 when "View Less"
    } else {
      setShowOffers(chunkArray(data, 3)); // Show all chunks when "View All"
    }
    setIsViewAll(!isViewAll);
  };

  return (
    <Button
      className="flex justify-end py-0 px-0 items-center border-0  bg-transparent shadow-none  hover:shadow-none  hover:text-pale-red"
      onClick={HandleAllOffer}
    >
      <p className="capitalize text-gray-700 text-sm font-light">
        {isViewAll ? "View Less" : "View All"}
      </p>
      <MdOutlineChevronRight className="text-pale-red text-xl" />
    </Button>
  );
}
