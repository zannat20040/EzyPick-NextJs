import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-5 ">
      <h1 className="text-center ">UH OH! You're lost.</h1>
      <p className="py-3 mx-auto text-center max-w-md w-full">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="flex justify-center w-full  ">
        <Link href={"/"} className="w-fit bg-pale-red py-2 px-6 text-white   rounded hover:bg-black duration-300">Go back</Link>
      </div>
    </div>
  );
}
