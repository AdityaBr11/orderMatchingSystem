import React from "react";
import PendingTable from "./PendingTable";
import CompletedOrder from "../components/CompletedOrder";

const Table = () => {
  return (
    <div className=" w-[85%] md:w-[60%] mx-auto mt-32">
      <h1 className="text-center py-2 dark:bg-gray-900 mb-2 text-xl font-serif">
        Pending Order Table
      </h1>
      <div>
        <PendingTable />
      </div>

      <div className="mt-10">
        <CompletedOrder />
      </div>
    </div>
  );
};

export default Table;
