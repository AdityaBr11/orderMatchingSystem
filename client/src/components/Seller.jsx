import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPending } from "../redux/order/action";

const Seller = ({ pendingOrder, loading }) => {
  return (
    <table className="table table-zebra w-full text-red-400 border-b-2 border-gray-600">
      <thead>
        <tr>
          <th className="w-[50%] border-r-2 border-gray-600">Seller Price</th>
          <th className=" ">Seller Qty</th>
        </tr>
      </thead>
      <tbody>
        {pendingOrder &&
          pendingOrder
            .filter((el) => el.Type === "Seller")
            .reverse()
            .sort((a, b) => a.Price - b.Price)
            .slice(0, 5)
            .map((e, i) => (
              <tr key={i}>
                <td className="border-r-2 border-gray-600">{e.Price}</td>
                <td>{e.Qty}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Seller;
