import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import React, { useEffect } from "react";
import SearchTable from "@/components/Table/SearchTable";
import { data } from "../data/MOCK_DATA";

const HomePage = () => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="p-20 justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Table */}
      <div className="flex flex-col mt-4">
        <SearchTable data={data} />
      </div>
    </div>
  );
};

export default HomePage;
