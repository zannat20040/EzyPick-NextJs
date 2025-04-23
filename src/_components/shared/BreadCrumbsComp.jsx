"use client";
import { Breadcrumbs } from "@material-tailwind/react";

export function BreadCrumbsComp({ category, subcategory }) {
  const crumbList = [category, subcategory];
  return (
    <div className="container px-5 lg:px-8 mx-auto mt-5">
      <Breadcrumbs>
        <a href="#" className="opacity-60 text-pale-red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        {crumbList.map((crumb, index) => (
          <a
            key={crumb}
            href="#"
            className={` hover:text-pale-red ${
              index === crumbList.length - 1 ? "opacity-100" : "opacity-60"
            }`}
          >
            <span className='capitalize'>{crumb}</span>
          </a>
        ))}
      </Breadcrumbs>
    </div>
  );
}
