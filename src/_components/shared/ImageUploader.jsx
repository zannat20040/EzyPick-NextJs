"use client";
import { useRef, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { FiUploadCloud } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";

export default function ImageUploader({
  placeholder,
  onUploadSuccess,
  additional_note,
  multiple = false,
  acceptedTypes = "image/*",
}) {
  const [filesInfo, setFilesInfo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const inputId = `file_input_${placeholder
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "_")}`;

  const handleClearFile = () => {
    // Revoke object URLs to free memory
    if (filesInfo?.files?.length) {
      filesInfo.files.forEach((file) => URL.revokeObjectURL(file.preview));
    }

    setFilesInfo(null);
    fileInputRef.current.value = "";
    if (onUploadSuccess) onUploadSuccess(multiple ? [] : null);
  };

  const handleUpload = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET); // your Cloudinary preset name
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME); // your Cloudinary cloud name

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          formData
        );


        return {
          id: res.data.asset_id,
          url: res.data.secure_url,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file),
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      setFilesInfo({
        count: uploadedFiles.length,
        files: uploadedFiles,
      });

      if (onUploadSuccess) {
        if (multiple) {
          onUploadSuccess(uploadedFiles.map((file) => file.url));
        } else {
          onUploadSuccess(uploadedFiles[0].url);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setError("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-3">
      {filesInfo ? (
        <div className="mx-auto max-w-[600px] rounded border-2 border-dashed border-gray-400 p-3 bg-white">
          <div className="flex justify-between items-start relative overflow-hidden">
            <div className="flex-1">
              {multiple ? (
                <>
                  <h5 className="text-lg font-medium tracking-tight mb-">
                    {filesInfo.count} files selected
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {filesInfo.files.map((file, idx) => (
                      <img
                        key={idx}
                        src={file.preview}
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex gap-x-6 items-center">
                  <img
                    className="w-16 h-16 rounded object-cover"
                    src={filesInfo.files[0].preview}
                    alt={filesInfo.files[0].name}
                  />
                  <div className="flex-1  overflow-hidden">
                    <h5 className="text-lg font-medium tracking-tight truncate ">
                      {filesInfo.files[0].name}
                    </h5>
                    <p className="text-gray-500">
                      {(filesInfo.files[0].size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              )}

              {uploading && (
                <p className="text-blue-600 text-sm mt-2">Uploading...</p>
              )}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              onClick={handleClearFile}
              className="ml-4 text-gray-500 hover:text-gray-700 absolute right-0 top-0"
              type="button"
              title="Remove"
            >
              <RxCrossCircled className="text-pale-red" />
            </button>
          </div>
        </div>
      ) : (
        <label
          className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-4 bg-white hover:border-gray-500 transition-colors cursor-pointer"
          htmlFor={inputId}
        >
          <FiUploadCloud className="text-2xl" />
          <div className=" text-center">
            <h5 className="whitespace-nowrap  font-medium tracking-tight">
              {placeholder}
            </h5>
            <p className="text-sm text-gray-500">{additional_note}</p>
          </div>
        </label>
      )}

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        className="hidden"
        accept={acceptedTypes}
        multiple={multiple}
        onChange={handleUpload}
      />
    </div>
  );
}
