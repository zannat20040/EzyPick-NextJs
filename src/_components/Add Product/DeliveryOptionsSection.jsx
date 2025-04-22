"use client";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegSquarePlus } from "react-icons/fa6";

export default function DeliveryOptionsSection({
  selectedOptions = [],
  onChange,
}) {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [error, setError] = useState("");

  // Fetch delivery options from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axiosInstance.get("/api/deliveryOptions");
        console.log("-----d15-----", res.data);
        const titles = res.data.options.map((item) => item.title);
        setOptions(titles);
      } catch (err) {
        console.error("Failed to fetch delivery options:", err);
        setError("Failed to load delivery options");
      }
    };

    fetchOptions();
  }, []);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const handleAddNewOption = async () => {
    setError("");
    if (!newOption) return setError("Enter a valid option");
    const trimmed = newOption.trim();
    if (!trimmed) return setError("Enter a valid option");

    if (options.includes(trimmed)) {
      setError("Option already exists");
      return;
    }

    try {
      await axiosInstance.post("/api/deliveryOptions", { title: trimmed });
      setOptions((prev) => [...prev, trimmed]);
      setNewOption("");
    } catch (err) {
      console.error("Failed to add option:", err);
      setError("Failed to add delivery option");
    }
  };

  return (
    <>
      <div className=" text-gray-600 ">
        <p className="mt-2 mb-4 text-sm ">Add Delivery Types</p>
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 text-sm mb-1"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="checkbox checkbox-sm rounded-sm text-pale-red"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-1 mt-3">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new delivery option"
          className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
        />
        <Button
          type="button"
          onClick={handleAddNewOption}
          className="p-0 bg-white hover:shadow-none shadow-none text-white uppercase font-medium rounded"
        >
          <CiSquarePlus  className="text-3xl text-pale-red "/>
        </Button>
      </div>
      {error && (
        <p className="text-red-600 p-1 flex items-center gap-2 bg-red-50 mt-2 text-xs  px-3 rounded font-semibold">
          <RxCrossCircled
            className="text-red-600 text-base cursor-pointer"
            onClick={() => setError("")}
          />
          {error}
        </p>
      )}
    </>
  );
}
