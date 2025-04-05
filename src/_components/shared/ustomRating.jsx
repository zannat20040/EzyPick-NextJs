import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function CustomRating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<FaStar key={i} className="text-pale-red w-4 h-4" />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} className="text-pale-red w-4 h-4" />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} className="text-gray-400  w-4 h-4" />);
    }
  }

  return <div className="flex items-center gap-[2px]">{stars}</div>;
}
