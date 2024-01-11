import React from "react";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2'

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });
  console.log(orders);
  const handleConfirm =async (item) => {
    console.log(item);
    await axiosSecure.patch(`/payments/${item._id}`)
    .then(res => {
        console.log(res.data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Confirmed!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
    })
  }
  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-4 ">
        <h5 className="text-black">All Orders</h5>
        <h5 className="text-black">Total Orders: {orders.length}</h5>
      </div>

      {/* table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table  md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-sm border-none">
              <tr className="border-none">
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((item, index) => (
                <tr key={index}>
                  <th className="text-gray-600 font-medium">{index + 1}</th>
                  <td className="text-gray-600 font-medium">{item.email}</td>
                  <td className="text-gray-600 font-medium">
                    {item.transitionId}
                  </td>
                  <td className="text-gray-600 font-medium">${item.price}</td>
                  <td className="text-gray-600 font-medium">{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button onClick={() => handleConfirm(item)} className="btn btn-xs text-white border-none bg-green">
                        <GiConfirmed className="text-white" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-xs bg-orange-500 text-white border-none">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
