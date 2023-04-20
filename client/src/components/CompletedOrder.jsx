import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompleted } from "../redux/order/action";
import load from "../assets/load.gif";

const CompletedOrder = () => {
  const dispatch = useDispatch();
  const { completedOrder, isloading } = useSelector((store) => store.stock);

  useEffect(() => {
    dispatch(getCompleted());
  }, [dispatch]);

  return (
    <div className="border-b-2 border-gray-600 mt-3">
      <div className="">
        <h1 className="text-center py-2 dark:bg-gray-900 text-xl font-serif mb-2">
          Completed Order Table
        </h1>
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="w-[50%] border-r-2 border-gray-600">Price</th>
              <th className=" ">Qty</th>
            </tr>
          </thead>
          {isloading ? (
            <tbody className=" w-[200%] flex justify-center py-4">
              <tr className="rounded-full w-[60px] h-[60px] border-t-2 border-gray-400 animate-spin"></tr>
            </tbody>
          ) : (
            <tbody>
              {completedOrder &&
                completedOrder
                  .reverse()
                  .slice(0, 6)
                  .map((e) => (
                    <tr className="" key={e.ref}>
                      <td className="border-r-2 border-gray-600">{e.Price}</td>
                      <td>{e.Qty}</td>
                    </tr>
                  ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default CompletedOrder;
