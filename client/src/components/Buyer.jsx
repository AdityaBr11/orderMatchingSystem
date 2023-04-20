import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPending } from "../redux/order/action";

const Buyer = ({ pendingOrder, loading }) => {
  return (
    <table className="table table-zebra w-full border-b-2 border-gray-600">
      <thead>
        <tr>
          <th className="w-[50%] border-r-2 border-gray-600">Buyer Qty</th>
          <th className=" ">Buyer Price</th>
        </tr>
      </thead>
      <tbody>
        {pendingOrder &&
          pendingOrder
            .filter((el) => el.Type === "Buyer")
            .reverse()
            .sort((a, b) => b.Price - a.Price)
            .slice(0, 5)
            .map((e, i) => (
              <tr key={i}>
                <td className="border-r-2 border-gray-600">{e.Qty}</td>
                <td>{e.Price}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Buyer;


