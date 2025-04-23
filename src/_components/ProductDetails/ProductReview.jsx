"use client";
import CustomRating from "@/_components/shared/ustomRating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

// A component for rendering individual product reviews
const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState({});
  const [responseText, setResponseText] = useState("");
  const [likes, setLikes] = useState(reviews?.likes || 0);
  const [dislikes, setDislikes] = useState(reviews?.dislikes || 0);

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/json/Review.json`
        );
        const filterProduct = response.data.filter(
          (data) => data.product_id === productId
        );

        if (filterProduct.length > 0) {
          const filterProductReview = filterProduct[0];
          setDislikes(filterProductReview.dislikes);
          setLikes(filterProductReview.likes);
          setReviews(filterProductReview);
        } else {
          setReviews({}); // Set an empty object or handle it in a way that fits your needs
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  // Handle like button click
  const handleLike = () => {
    setLikes(likes + 1);
    // Send a request to the backend to update the like count
    // axios.post(`/api/reviews/like/${review.review_id}`);
  };

  // Handle dislike button click
  const handleDislike = () => {
    setDislikes(dislikes + 1);
    // Send a request to the backend to update the dislike count
    // axios.post(`/api/reviews/dislike/${review.review_id}`);
  };

  // Handle customer reply submission
  const handleReply = (e) => {
    e.preventDefault();
    // Send a request to the backend to submit a reply
    // axios.post(`/api/reviews/reply/${review.review_id}`, { response_text: responseText });

    // Clear the input field
    setResponseText("");
  };

  return (
    <div className="review">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <p className="text-gray-700"> {reviews.username}</p>
      </div>

      <div className="flex gap-3 items-center mt-2">
        <CustomRating rating={reviews.rating} />
        <h3 className="font-semibold">{reviews.review_title}</h3>
      </div>

      <p>{new Date(reviews.review_date).toLocaleDateString()}</p>

      <p className="my-2 text-gray-800">{reviews.review_text}</p>

      {/* Like/Dislike Buttons */}
      <div className="flex gap-5 items-center">
        <button onClick={handleLike} className="flex gap-3 items-center">
          <AiFillLike /> {likes}
        </button>
        <button onClick={handleDislike} className="flex gap-3 items-center">
          <AiFillDislike /> {dislikes}
        </button>
      </div>

      {/* Replies Section */}
      {reviews?.responses?.length > 0 && (
        <div className="replies p-5 bg-gray-100 my-3">
          {reviews?.responses?.map((response) => (
            <div key={response.response_id} className="response  mb-5 ">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <p className="text-gray-600">{response.username}</p>
                </div>
                <p>
                  <small>
                    {new Date(response.response_date).toLocaleDateString()}
                  </small>
                </p>
              </div>
              <p className="my-2 text-gray-800">{reviews.review_text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      <form
        onSubmit={handleReply}
        className="mt-6 flex flex-col items-end gap-2"
      >
        <textarea
          rows={3}
          className="border-gray-200  border p-5  w-full textarea outline-none focus:outline-none focus:shadow-none"
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Write your reply..."
        ></textarea>
        <button type="submit" className="btn w-fit bg-pale-red text-white ">
          Reply
        </button>
      </form>
    </div>
  );
};

export default ProductReview;
