import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const LINKS = [
    {
      title: "Shop",
      items: ["All Products", "New Arrivals", "Best Sellers", "Deals & Offers"],
    },
    {
      title: "Customer Service",
      items: ["Contact Us", "Order Tracking", "Returns & Refunds", "FAQs"],
    },
    {
      title: "About EzyPick",
      items: ["Our Story", "Careers", "Privacy Policy", "Terms & Conditions"],
    },
  ];
  

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full mt-10 bg-pale-red pt-10  text-white">
      <div className="mx-auto  px-5 lg:px-8 container text-sm">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 ">
          <div>
            <Image
              src="/logo2.png"
              alt="logowhite"
              width={200}
              height={200}
            />

            <div>
              <p>
                2nd Floor, Hitech Plaza, <br />
                11/A Gulshan Avenue, <br />
                Dhaka 1212, Bangladesh{" "}
              </p>
            </div>
            <p>
              Get touch on{" "}
              <Link href="#" className="underline">
                support@ezypick.shop
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-4 mt-10 md:mt-0">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <p className="font-bold tracking-wider"> {title}</p>

                {items.map((link) => (
                  <li key={link}>
                    <span className="py-1.5 font-normal  cursor-pointer hover:text-blue-gray-900 duration-300 transition-all ease-in-out">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-red-200 py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center font-normal  md:mb-0">
            &copy;{currentYear}{" "}
            <a href="https://material-tailwind.com/">
              EzyPick - Effortless Choices
            </a>
            . All Rights Reserved.
          </p>

          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Link href="#" className="text-white text-base">
              <FaFacebook />
            </Link>
            <Link href="#" className="text-white text-base">
              <FaTwitter />
            </Link>
            <Link href="#" className="text-white text-base">
              <FaYoutube />
            </Link>
            <Link href="#" className="text-white text-base">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
