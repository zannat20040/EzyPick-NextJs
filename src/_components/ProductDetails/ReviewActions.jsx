import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const ReviewActions = ({ review, userEmail, refreshReviews }) => {
  const [loading, setLoading] = useState(false);

  const isLiked = review?.likedBy?.includes(userEmail);
  const isDisliked = review?.dislikedBy?.includes(userEmail);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.patch(`/api/reviews/${review._id}/like/`, {
        email: userEmail,
      });
      await refreshReviews();
    } catch (error) {
      console.error("Error liking review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axiosInstance.patch(`/api/reviews/${review._id}/dislike`, {
        email: userEmail,
      });
      await refreshReviews();
    } catch (error) {
      console.error("Error disliking review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-2 items-center ">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex gap-2 items-center `}
      >
        <AiFillLike
          className={`${isLiked ? " text-pale-red" : "text-black"}`}
        />{" "}
        {review.likes || 0}
      </button>

      <button
        onClick={handleDislike}
        disabled={loading}
        className={`flex gap-2 items-center `}
      >
        <AiFillDislike
          className={`${isDisliked ? " text-red-700" : "text-black"}`}
        />{" "}
        {review.dislikes || 0}
      </button>
    </div>
  );
};

export default ReviewActions;
