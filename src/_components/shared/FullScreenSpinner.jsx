import React from "react";

export default function FullScreenSpinner({label}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <span className="text-white text-lg ml-4">{label}</span>
    </div>
  );
}
