import React, { useEffect } from "react";
import PendingTable from "./PendingTable";
import CompletedOrder from "../components/CompletedOrder";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCompleted, getPending, postPending } from "../redux/order/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { postloading, error, postmsg,success } = useSelector((store) => store.stock);

  useEffect(() => {
    if (success==true) {
      toast.success(postmsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [postmsg, error,success]);

  const addInput = (data) => {
    dispatch(postPending(data))
      .then(() => dispatch(getPending()))
      .then(() => dispatch(getCompleted()));
  };
  return (
    <div className=" w-[90%] md:w-[70%] mx-auto mt-28 mb-12 font-joseph">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-center text-4xl md:text-5xl mb-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-red-300">
        Problem-Order Matching System
      </h1>
      <div className=" flex justify-center ">
        <label
          htmlFor="newInput"
          className="btn btn-outline border-b-[0px] font-Roboto border-gray-300 text-gray-400 hover:text-black rounded-none"
        >
          New Input
        </label>
      </div>
      <h1 className="text-center py-2 dark:bg-gray-900 mb-2 text-xl font-serif">
        Pending Order Table
      </h1>
      <div>
        <PendingTable />
      </div>

      <div className="mt-10">
        <CompletedOrder />
      </div>
      <input type="checkbox" id="newInput" className="modal-toggle" />
      <label
        htmlFor="newInput"
        className="modal cursor-pointer backdrop-filter backdrop-blur-sm"
      >
        <label className="modal-box relative bg-gray-800" htmlFor="">
        <label htmlFor="newInput" className="btn btn-sm bg-transparent outline-none border-none absolute right-2 top-2">✕</label>
          <div className="w-full py-3">
            <p className="text-center mb-2 text-xl">Add New Input</p>
            <form
              action=""
              className="space-y-4"
              onSubmit={handleSubmit(addInput)}
            >
              <select
                className="w-full select"
                {...register("Type", {
                  required: "Type is required",
                })}
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
              <input
                type="number"
                placeholder="Qty"
                className="input w-full"
                {...register("Qty", {
                  required: "Qty is required",
                })}
              />
              <p className="mt-2 text-red-300">{errors?.Qty?.message}</p>
              <input
                type="number"
                placeholder="price"
                className="input w-full"
                {...register("Price", {
                  required: "Price is required",
                })}
              />
              <p className="mt-2 text-red-300">{errors?.Price?.message}</p>
              <button
                type="submit"
                className="btn btn-outline w-full font-Roboto border-gray-300 text-gray-400 hover:text-black rounded-none"
              >
                {postloading?"loading...":"Add New Input"}
              </button>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
};

export default Table;
