import React from "react";

type Props = {};

export default function search({}: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full py-2 pr-8 pl-4 leading-tight rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  );
}
