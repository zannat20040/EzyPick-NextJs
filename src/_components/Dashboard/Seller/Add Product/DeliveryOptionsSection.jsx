"use client";
import axiosInstance from "@/utils/axiosInstance";
import { Button, Spinner } from "@material-tailwind/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

export default function DeliveryOptionsSection({
  selectedOptions = [],
  onChange,
}) {
  // ───────────────────── state ─────────────────────
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error"
  const [message, setMessage] = useState("");

  // ───────────────────── fetch once ─────────────────────
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/api/deliveryOptions");
        setOptions(data.options.map((o) => o.title));
      } catch {
        setStatus("error");
        setMessage("Failed to load delivery options");
      }
    })();
  }, []);

  // ───────────────────── helpers ─────────────────────
  const isDuplicate = useMemo(
    () =>
      options.some((o) => o.toLowerCase() === newOption.trim().toLowerCase()),
    [options, newOption]
  );

  // ───────────────────── event handlers ─────────────────────
  const toggleOption = useCallback(
    (opt) =>
      onChange(
        selectedOptions.includes(opt)
          ? selectedOptions.filter((o) => o !== opt)
          : [...selectedOptions, opt]
      ),
    [onChange, selectedOptions]
  );

  const addOption = async () => {
    const trimmed = newOption.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Enter a valid option");
      return;
    }
    if (isDuplicate) {
      setStatus("error");
      setMessage("Option already exists");
      return;
    }

    try {
      setStatus("loading");
      await axiosInstance.post("/api/deliveryOptions", { title: trimmed });
      setOptions((prev) => [...prev, trimmed]);
      setNewOption("");
      setStatus("idle");
    } catch {
      setStatus("error");
      setMessage("Failed to add delivery option");
    }
  };

  // ───────────────────── UI ─────────────────────
  return (
    <>
      <div className="text-gray-600">
        <p className="mt-2 mb-4 text-sm">Add Delivery Types</p>
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center space-x-2 text-sm mb-1 capitalize"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => toggleOption(opt)}
              className="checkbox checkbox-sm rounded-sm text-pale-red"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-1 mt-3">
        <input
          value={newOption}
          onChange={(e) => {
            setNewOption(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Add new delivery option"
          className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
        />
        <Button
          onClick={addOption}
          disabled={status === "loading"}
          className="p-0 min-w-[40px] bg-white hover:shadow-none shadow-none uppercase font-medium rounded"
        >
          {status === "loading" ? (
            <Spinner className="h-5 w-5 text-pale-red" />
          ) : (
            <IoIosAddCircleOutline className="text-xl text-pale-red" />
          )}
        </Button>
      </div>

      {status === "error" && (
        <p className="mt-2 flex items-center gap-2 rounded bg-red-50 p-1 px-3 text-xs font-semibold text-red-600">
          <RxCrossCircled
            className="cursor-pointer text-base"
            onClick={() => setStatus("idle")}
          />
          {message}
        </p>
      )}
    </>
  );
}
