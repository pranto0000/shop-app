/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart.jsx";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()
  const location = useLocation()

  const [cart,refetch] = useCart()

  // add to cart btn
  const handleAddToCart = (item) => {
    // console.log("nnn",item);
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      }
      // console.log(cartItem);
      fetch("https://shop-app-0kv8.onrender.com/carts", {
        method: "POST",
        headers:{
          "content-type": "application/json",
        },
        body:JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.menuItemId) { 
            refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Food added on the Cart",
              showConfirmButton: false,
              timer: 1500
            });
          }
          if (!data.menuItemId) {
            refetch()
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Product already exists in the cart!",
            });
          }
          
          
        });
    }else{
      Swal.fire({
        title: "Please Login?",
        text: "Without an account can't able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SignUp Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup',{state:{from:location}})
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };
  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl relative bg-white mr-5 md:my-5 w-full mx-auto"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className=" hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white border-none"
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

// import React, { useContext, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthProvider";
// import Swal from 'sweetalert2'
// import useCart from "../hooks/useCart";
// import axios from 'axios';

// const Cards = ({ item }) => {
//   const { name, image, price, recipe, _id } = item;

//   const {user} = useContext(AuthContext);
//   const [cart, refetch] = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
//   // console.log(item)
//   const [isHeartFilled, setIsHeartFilled] = useState(false);

//   const handleHeartClick = () => {
//     setIsHeartFilled(!isHeartFilled);
//   };

//   // add to cart handler
//   const handleAddToCart = item => {
//     // console.log(item);
//     if(user && user.email){
//         const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

//         axios.post('https://shop-app-0kv8.onrender.com/carts', cartItem)
//         .then((response) => {
//           console.log(response);
//           if(response){
//             refetch(); // refetch cart
//               Swal.fire({
//                   position: 'center',
//                   icon: 'success',
//                   title: 'Food added on the cart.',
//                   showConfirmButton: false,
//                   timer: 1500
//                 })
//           }
//         })
//         .catch( (error) => {
//           console.log(error.response.data.message);
//           const errorMessage = error.response.data.message;
//           Swal.fire({
//             position: 'center',
//             icon: 'warning',
//             title: `${errorMessage}`,
//             showConfirmButton: false,
//             timer: 1500
//           })
//         });
//     }
//     else{
//         Swal.fire({
//             title: 'Please login to order the food',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Login now!'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               navigate('/login', {state: {from: location}})
//             }
//           })
//     }
// }

//   return (
//     <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
//       <div
//         className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
//           isHeartFilled ? "text-rose-500" : "text-white"
//         }`}
//         onClick={handleHeartClick}
//       >
//         <FaHeart className="w-5 h-5 cursor-pointer" />
//       </div>
//       <Link to={`/menu/${item._id}`}>
//         <figure>
//           <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
//         </figure>
//       </Link>
//       <div className="card-body">
//        <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
//         <p>Description of the item</p>
//         <div className="card-actions justify-between items-center mt-2">
//           <h5 className="font-semibold">
//             <span className="text-sm text-red">$ </span> {item.price}
//           </h5>
//           <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">Add to Cart </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cards;