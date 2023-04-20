import React, { useEffect, useState } from "react";
import Buyer from "../components/Buyer";
import Seller from "../components/Seller";
import { useDispatch, useSelector } from "react-redux";
import { getPending } from "../redux/order/action";

const PendingTable = () => {
  const dispatch = useDispatch();
  const { pendingOrder, loading } = useSelector((store) => store.stock);

  useEffect(() => {
    dispatch(getPending());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <div className=" w-full flex justify-center py-4">
          <div className="rounded-full w-[90px] h-[90px] border-t-2 border-gray-400 animate-spin"></div>
        </div>
      ) : (
        <div className=" flex flex-col md:flex-row gap-4 md:gap-2 justify-between text-green-400">
          {/* buyer table */}{" "}
          <div className="md:w-1/2 ">
            <Buyer pendingOrder={pendingOrder} loading={loading} />
          </div>
          {/* seller table */}
          <div className="md:w-1/2">
            <Seller pendingOrder={pendingOrder} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTable;
