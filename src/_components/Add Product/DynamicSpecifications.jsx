"use client";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const DynamicSpecifications = ({ initialData = {}, onSave }) => {
  const [specs, setSpecs] = useState(initialData);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

  const handleAddField = () => {
    if (!newFieldName.trim()) return;

    const fieldName = newFieldName.trim();
    if (specs.hasOwnProperty(fieldName)) {
      alert("Field already exists!");
      return;
    }

    setSpecs((prev) => ({
      ...prev,
      [fieldName]: newFieldType === "text" ? "" : [],
    }));

    setNewFieldName("");
  };

  const handleTextChange = (field, value) => {
    setSpecs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagChange = (field, tags) => {
    setSpecs((prev) => ({
      ...prev,
      [field]: tags,
    }));
  };

  const removeField = (field) => {
    const newSpecs = { ...specs };
    delete newSpecs[field];
    setSpecs(newSpecs);
  };

  const handleSave = () => {
    onSave(specs);
  };

  return (
    <div className="specification-input text-gray-600">
      <p className="mt-6 mb-4 text-sm ">Add More Specifications</p>

      <div className="">
        <div className="flex items-center gap-1 justify-between">
          <input
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="New Specification title"
            className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
          />
          <select
            className="text-sm py-1 border-gray-300 border outline-none focus:outline-none rounded"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="tags">Tags</option>
          </select>
        </div>
        <Button
          type="button"
          onClick={handleAddField}
          className=" shadow-none hover:shadow-none bg-white px-0 flex gap-1 items-center py-1 mt-1 w-full   font-medium rounded text-pale-red"
        >
          <CiSquarePlus className="text-pale-red text-lg" /> Add more specification
        </Button>
      </div>

      <div className="">
        {Object.entries(specs).map(([field, value]) => (
          <div
            key={field}
            className=" flex gap-2 items-center mt-2 w-full justify-between"
          >
            {Array.isArray(value) ? (
              <>
                <TagsInput
                  tags={value}
                  field={field}
                  removeTag={() => removeField(field)}
                  onChange={(tags) => handleTagChange(field, tags)}
                />
              </>
            ) : (
              <>
                <label className="text-pale-red text-sm ">{field}:</label>
                <input
                  type="text"
                  value={value}
                  className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
                  onChange={(e) => handleTextChange(field, e.target.value)}
                />
                <button
                  type="button"
                  className="btn-sm cursor-pointer "
                  onClick={() => removeField(field)}
                >
                  <RxCross2 className="text-pale-red" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={handleSave}
        className="bg-pale-red mt-5 w-full text-white uppercase font-medium rounded"
      >
        Save Specifications
      </Button>
    </div>
  );
};

// Helper component for tags input
const TagsInput = ({ tags, onChange, field, removeField }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault(); // prevent newline/comma being entered
      const newTag = inputValue.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col  w-full">
      <div className="flex  gap-2 items-center justify-between">
        <div className="flex gap-2 items-center  w-full">
          <label className="text-pale-red text-sm ">{field}:</label>
          <div className="flex flex-col  w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 rounded border border-soft-gray focus:outline-none text-sm"
              placeholder="Type comma to enter the tag"
            />
          </div>
        </div>
        <button className="btn-sm cursor-pointer " onClick={removeField}>
          <RxCross2 className="text-pale-red" />
        </button>
      </div>
      <div className=" flex gap-1 items-center flex-wrap mt-1 ">
        {tags.map((tag, index) => (
          <span
            onClick={() => removeTag(index)}
            key={index}
            className=" bg-pale-red text-white rounded text-xs px-2 cursor-pointer  "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DynamicSpecifications;
