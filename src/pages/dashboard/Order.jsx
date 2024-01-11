import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
    const {user} = useAuth()
    console.log(user?.email);
    const token = localStorage.getItem('access-token');
    const {refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return res.json()
          },
    })
    // console.log(orders);

    const formatData = (createdAt) => {
        const createdAtDate = new Date(createdAt)
        return createdAtDate.toLocaleDateString()
    }
  return (
    <div className="max-w-screen-2xl section-container mx-auto xl:px-24 px-4">
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* banner  */}
          <div className=" space-y-7 px-4">
            <h2 className="text-gray-600 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track Your All <span className="text-green"> Oradrs!</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table  */}
        <div>
        {
        (orders.length > 0) ? <div>
          <div className="py-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm border-none">
              <tr className="border-none">
                <th>#</th>
                <th>Order Date</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatData(item.createdAt)}</td>
                  <td className="font-medium text-black">{item.transitionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <th>
                    <Link to='/contact' className="btn btn-ghost text-red btn-xs">Contact</Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
        </div> : <div className="text-center mt-20">
          <p>Cart is empty. Please add Products.</p>
          <Link to='/menu'><button className="btn bg-green text-white mt-3 border-none">Back to Menu</button></Link>
        </div>
      }
        </div>
     
    </div>
  );
};

export default Order;
