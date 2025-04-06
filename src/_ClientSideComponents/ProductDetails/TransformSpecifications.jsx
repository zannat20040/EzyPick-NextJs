import React from 'react'

export default function TransformSpecifications({specs}) {
    const textSpecs = [];
    const arraySpecs = [];
  
    for (let key in specs) {
  
      if (Array.isArray(specs[key])) {
        arraySpecs.push(
          <div key={key} className="flex flex-col gap-1 mt-2">
            <span className="capitalize font-bold">{key}:</span>
            <div className="flex flex-wrap gap-2">
              {specs[key].map((item, index) => (
                <button
                  key={index}
                  className="btn border border-soft-gray bg-white hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );
      } else {
        textSpecs.push(
          <div key={key} className="text-sm text-gray-500">
            <span className="capitalize ">{key}:</span> {specs[key]} |
          </div>
        );
      }
    }
  
    return (
      <div className="flex flex-col gap-3 mt-4 w-full">
        <div className="flex gap-1">{textSpecs}</div>
        <div className="flex flex-col gap-3">{arraySpecs}</div>
      </div>
    );
}
