"use client";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export default function DynamicSpecifications({ initialData = {}, onSave }) {
  const [specs, setSpecs] = useState(initialData);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

  /* ---------- auto-save ---------- */
  useEffect(() => onSave(specs), [specs, onSave]);

  /* ---------- add / remove / update ---------- */
  const addField = () => {
    const key = fieldName.trim();
    if (!key || specs[key]) return;
    setSpecs({ ...specs, [key]: fieldType === "tags" ? [] : "" });
    setFieldName("");
  };

  const updateValue = (key, val) => setSpecs({ ...specs, [key]: val });

  const removeField = (key) => {
    const { [key]: _, ...rest } = specs;
    setSpecs(rest);
  };

  /* ---------- tags helpers ---------- */
  const addTag = (key, tag) => {
    const clean = tag.trim();
    if (!clean || specs[key].includes(clean)) return;
    updateValue(key, [...specs[key], clean]);
  };

  const removeTag = (key, idx) =>
    updateValue(
      key,
      specs[key].filter((_, i) => i !== idx)
    );

  /* ---------- UI ---------- */
  return (
    <div className="text-gray-700">
      <p className="mt-6 mb-4 text-sm">Specifications</p>

      {/* add-field bar */}
      <div className="flex gap-1">
        <input
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="Title"
          className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
        />
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="border rounded text-sm px-1"
        >
          <option value="text">Text</option>
          <option value="tags">Tags</option>
        </select>
        <button type="button" onClick={addField} className="p-1">
          <IoIosAddCircleOutline className="text-xl text-pale-red" />
        </button>
      </div>

      {/* existing fields */}
      <div className="mt-3 space-y-2">
        {Object.entries(specs).map(([key, val]) => (
          <div key={key} className="flex gap-2 items-start">
            <label className="text-pale-red text-sm mt-1">{key}:</label>

            {/* text field */}
            {!Array.isArray(val) && (
              <input
                placeholder={`Enter ${key} value`}
                value={val}
                onChange={(e) => updateValue(key, e.target.value)}
                className="w-full px-2 py-1 placeholder:text-xs rounded border border-soft-gray focus:outline-none text-sm"
              />
            )}

            {/* tags field */}
            {Array.isArray(val) && (
              <div className="flex-1">
                <input
                  placeholder="Type tag, (comma to add)" /* ✱ changed */
                  className="w-full placeholder:text-xs px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
                  onChange={(e) => {
                    /* split by commas, keep last unfinished part */
                    const parts = e.target.value.split(",");
                    parts.slice(0, -1).forEach((p) => addTag(key, p)); // ✱ changed
                    e.target.value = parts.at(-1) ?? "";
                  }}
                />
                <div className="mt-1 flex flex-wrap gap-1">
                  {val.map((t, i) => (
                    <span
                      key={i}
                      onClick={() => removeTag(key, i)}
                      className="bg-pale-red text-white text-xs px-2 rounded cursor-pointer"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button type="button" onClick={() => removeField(key)} className="p-1">
              <RxCross2 className="text-pale-red" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
