import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart.jsx";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // calculate price 
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity
  }

  // // handleIncrease function
  // const handleIncrease = async (item) => {
  //   // console.log(item._id);
  //   fetch(`http://localhost:6001/carts/${item._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify({ quantity: item.quantity + 1 }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const updatedCart = cartItems.map((cartItem) => {
  //         if (cartItem.id === item.id) {
  //           return {
  //             ...cartItem,
  //             quantity: cartItem.quantity + 1,
  //           };
  //         }
  //         return cartItem;
  //       });
  //       refetch();
  //       setCartsItems(updatedCart);
  //     });
  //     refetch();

  // };

  // // handleDecrease function
  // const handleDecrease = (item) => {
  //   // console.log(item._id);
  //  if (item.quantity > 1) {
  //   fetch(`http://localhost:6001/carts/${item._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify({ quantity: item.quantity - 1 }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const updatedCart = cartItems.map((cartItem) => {
  //         if (cartItem.id === item.id) {
  //           return {
  //             ...cartItem,
  //             quantity: cartItem.quantity - 1,
  //           };
  //         }
  //         return cartItem;
  //       });
  //       refetch();
  //       setCartsItems(updatedCart);
  //     });
  //     refetch();
  //  }
  //  else{
  //   alert("Item can't be zero")
  //  }
  // };

  // // calculate total price 
  // const cartSubTotal = cart.reduce((total,item) => {
  //   return total + calculatePrice(item)
  // },0)

  // const orderTotal = cartSubTotal

  // // handleItem btn
  // const handleDelete = (item) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`http://localhost:6001/carts/${item._id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           refetch()
  //           if (data.deletedCount > 0) {
  //             refetch();
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "Your file has been deleted.",
  //               icon: "success",
  //               customClass: {},
  //             });
  //           }
  //         });
  //     }
  //   });
  // };

   // Handle quantity increase
   const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6001/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete =   (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:6001/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
             Swal.fire("Deleted!", "Your file has been deleted.", "success");
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };
  return (
    <div className="section-container z-5">
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* banner  */}
          <div className=" space-y-7 px-4">
            <h2 className="text-gray-600 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart  */}
      {
        (cart.length > 0) ? <div>
          <div className="py-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm border-none">
              <tr className="border-none">
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-black">{item.name}</td>
                  <td>
                    <button
                      className="btn btn-xs text-white"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none bg-white text-black"
                      onChange={() => console.log(item.quantity)}
                    />
                    <button
                      className="btn btn-xs text-white"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>${calculateTotalPrice(item).toFixed(2)}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* customer details  */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Customer Datails</h3>
          <p>
            <span className="text-gray-600">Name:</span> {user.displayName}
          </p>
          <p>
            <span className="text-gray-600">Email:</span> {user.email}
          </p>
          <p>
            <span className="text-gray-600">User_Id:</span> {user.uid}
          </p>
        </div>

        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Shopping Datails</h3>
          <p>
            <span className="text-gray-600">Totle Items:</span> {cart.length}
          </p>
          <p>
            <span className="text-gray-600">Totle Price:</span> ${orderTotal.toFixed(2)}
          </p>
          <Link to="/process-checkout" className="btn btn-md  bg-green text-white px-8 py-1 mt-5 border-none">
            Procceed Checkout
          </Link>
        </div>
      </div>
        </div> : <div className="text-center mt-20">
          <p>Cart is empty. Please add Products.</p>
          <Link to='/menu'><button className="btn bg-green text-white mt-3 border-none">Back to Menu</button></Link>
        </div>
      }
    </div>

    
  );
};

export default CartPage;
