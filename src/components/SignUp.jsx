import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic.jsx";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, createUser, login, updateUserProfile } =
    useContext(AuthContext);

    const axiosPublic = useAxiosPublic()

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfor)
            .then((response) => {
              // console.log(response);
              alert("Account Create successfully");
              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
              // ...
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      console.log(data);
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("SignIn successfully");
            navigate("/");
            // ...
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow-green w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg text-black">Create A Account! !</h3>

          {/* name  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered bg-white border-gray-400"
              {...register("name")}
            />
          </div>

          {/* email  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-white border-gray-400"
              {...register("email")}
            />
          </div>

          {/* password  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-white border-gray-400"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error text  */}

          {/* Login Button  */}
          <div className="form-control mt-6">
            <input
              type="Submit"
              value="Signup"
              className="btn bg-green border-none text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-red ml-1"
            >
              Login
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* SOCIAL SIGN IN  */}

        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none"
            onClick={handleRegister}
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default SignUp;

// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import Modal from "./Modal";
// import { AuthContext } from "../contexts/AuthProvider";
// import axios from "axios";
// // import useAxiosPublic from "../hooks/useAxiosPublic";

// const Signup = () => {
//   const { signUpWithGmail, createUser, updateUserProfile } =
//     useContext(AuthContext);
//     // const axiosPublic = useAxiosPublic();

//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const email = data.email;
//     const password = data.password;
//     // console.log(email, password)
//     createUser(email, password)
//       .then((result) => {
//         // Signed up
//         const user = result.user;
//         updateUserProfile(data.email, data.photoURL).then(() => {
//           const userInfor = {
//             name: data.name,
//             email: data.email,
//           };
//           axios.post("/users", userInfor)
//             .then((response) => {
//               // console.log(response);
//               alert("Signin successful!");
//               navigate(from, { replace: true });
//             });
//         });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//       });
//   };

//   // login with google
//   const handleRegister = () => {
//     signUpWithGmail()
//       .then((result) => {
//         const user = result.user;
//         const userInfor = {
//           name: result?.user?.displayName,
//           email: result?.user?.email,
//         };
//         axios
//           .post("/users", userInfor)
//           .then((response) => {
//             // console.log(response);
//             alert("Signin successful!");
//             navigate("/");
//           });
//       })
//       .catch((error) => console.log(error));
//   };
//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//       <div className="mb-5">
//         <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//           <h3 className="font-bold text-lg">Please Create An Account!</h3>
//           {/* name */}
//           {/* <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input
//               type="name"
//               placeholder="Your name"
//               className="input input-bordered"
//               {...register("name")}
//             />
//           </div> */}

//           {/* email */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="email"
//               placeholder="email"
//               className="input input-bordered"
//               {...register("email")}
//             />
//           </div>

//           {/* password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               className="input input-bordered"
//               {...register("password")}
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover mt-2">
//                 Forgot password?
//               </a>
//             </label>
//           </div>

//           {/* error message */}
//           <p>{errors.message}</p>

//           {/* submit btn */}
//           <div className="form-control mt-6">
//             <input
//               type="submit"
//               className="btn bg-green text-white"
//               value="Sign up"
//             />
//           </div>

//           <div className="text-center my-2">
//             Have an account?
//             <Link to="/login">
//               <button className="ml-2 underline">Login here</button>
//             </Link>
//           </div>
//         </form>
//         <div className="text-center space-x-3">
//           <button
//             onClick={handleRegister}
//             className="btn btn-circle hover:bg-green hover:text-white"
//           >
//             <FaGoogle />
//           </button>
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaFacebookF />
//           </button>
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaGithub />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
