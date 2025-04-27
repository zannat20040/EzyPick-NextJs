"use client";

import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import CustomRating from "../shared/ustomRating";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import getUserByEmail from "@/utils/getUserByEmail";

const ProductReview = ({ productId, product }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({}); // ✅ store user data here
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
      checkIfCanReview();
    }
  }, [user?.email]);

  useEffect(() => {
    fetchReviews();
  }, [productId, userData]); // reload when userData ready

  // ✅ Fetch logged-in user data only once
  const fetchUserData = async () => {
    try {
      const res = await getUserByEmail(user.email);
      setUserData(res);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkIfCanReview = async () => {
    try {
      const res = await axiosInstance.get(`/api/orders/check-purchase`, {
        params: { email: user.email, productId },
      });
      setCanReview(res.data.purchased);
    } catch (error) {
      console.error("Error checking purchase:", error);
      setCanReview(false);
    }
  };

  // ✅ Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/api/reviews/${productId}`);
      const productReviews = res.data.reviews || [];

      setReviews(productReviews);

      if (userData) {
        const hasReviewed = productReviews.some(
          (review) => review.userId?.toString() === userData._id?.toString()
        );

        setAlreadyReviewed(hasReviewed);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // ✅ Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userData) return toast.error("User data not loaded yet!");
    console.log("handleSubmitReview", userData);
    try {
      const res = await axiosInstance.post("/api/reviews", {
        productId,
        rating,
        reviewTitle,
        reviewText,
        userId: userData._id,
        username: userData.name,
        userImage: userData.profile_img,
        email: user.email,
      });
      toast.success("Review submitted successfully!");
      setReviewTitle("");
      setReviewText("");
      setRating(0);
      fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  // ✅ Submit Reply
  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedReviewId || !responseText.trim()) return;
    if (!userData) return toast.error("User data not loaded yet!");

    try {
      await axiosInstance.post(`/api/reviews/${selectedReviewId}/responses`, {
        userId: userData._id,
        username: userData.name,
        userImage: userData.company_logo || userData.profile_img,
        responseText,
        responseType: "customer",
      });

      setResponseText("");
      setSelectedReviewId(null);
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit reply");
      console.error("Error posting reply:", error);
    }
  };

  const isSeller = product?.postedBy === user?.email;

  return (
    <div className="space-y-10">
      {/* ✅ Show reviews if any */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review  p-5 ">
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="w-10 rounded-full bg-gray-200">
                  <img src={review.userImage} alt="user avatar" />
                </div>
              </div>
              <p className="text-gray-700">{review.username}</p>
            </div>

            <div className="flex gap-3 items-center mt-1">
              <CustomRating rating={review.rating} />
              <h3 className="font-semibold">{review.reviewTitle}</h3>
            </div>

            <p className="text-sm text-gray-500">
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>
            <p className="my-2 text-gray-800">{review.reviewText}</p>

            <div className="flex gap-5 items-center my-1y">
              <button
                onClick={() => handleLike(review._id)}
                className="flex gap-2 items-center"
              >
                <AiFillLike /> {review.likes || 0}
              </button>
              <button
                onClick={() => handleDislike(review._id)}
                className="flex gap-2 items-center"
              >
                <AiFillDislike /> {review.dislikes || 0}
              </button>
            </div>

            {/* Responses */}
            {review?.responses?.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg space-y-2 mt-4">
                {review.responses.map((response) => (
                  <div
                    key={response._id}
                    className="border-b py-2 last:border-none"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="avatar">
                        <div className="w-10 rounded-full bg-gray-200">
                          <img src={response?.userImage} alt="user avatar" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {response.username}
                        </p>
                        {isSeller && (
                          <p className="text-gray-600 text-xs">seller</p>
                        )}
                      </div>
                    
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(response.responseDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{response.responseText}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="">
              <button
                onClick={() => setSelectedReviewId(review._id)}
                className="text-pale-red text-xs"
              >
                Want to give a Reply?
              </button>
            </div>
            {/* Reply Form */}
            {selectedReviewId === review._id && (
              <form
                onSubmit={handleReply}
                className="flex flex-col gap-y-2 mt-2"
              >
                <textarea
                  rows={3}
                  className="border p-3 w-full rounded-md focus:outline-none"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write your reply..."
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReviewId(null)}
                    className="btn btn-sm bg-gray-400 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm bg-pale-red text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        ))
      ) : (
        <p className="py-2 ">Be the first reviewer for this product.</p>
      )}

      {/* ✅ Review Form always at top */}
      {canReview && !alreadyReviewed && userData.role === "buyer" && (
        <div className="border p-3 rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-2">
            {/* Review Title */}
            <div className="grid grid-cols-2 gap-2">
              <input
                name="reviewTitle"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Review Title"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
                required
              />

              {/* Rating - Allow decimal input */}
              <input
                name="rating"
                type="number"
                step="0.1" // ✅ This allows float like 4.5
                min={0.5}
                max={5}
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                placeholder="Give rating (0.5 - 5)"
                className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
                required
              />
            </div>
            {/* Review Text */}
            <textarea
              name="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              rows="4"
              className="w-full px-4 py-3 rounded border border-soft-gray focus:outline-none text-sm"
              required
            ></textarea>

            <button type="submit" className="btn bg-pale-red text-white">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
