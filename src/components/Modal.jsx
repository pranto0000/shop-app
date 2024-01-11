import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { AuthContext } from "../contexts/AuthProvider.jsx";
const Modal = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const {signUpWithGmail,login} = useContext(AuthContext)
      const [errorMessage, setErrorMessage] = useState("")

      // redirecting to home page or specifig page 
      const location = useLocation()
      const navigate = useNavigate()
      const from = location.state?.from?.pathname || "/";


      const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        // console.log(email, password);
        login(email, password).then((result) => {
          const user = result.user;
          alert("Login successful")
          document.getElementById('my_modal_5').close()
          navigate(from,{replace: true})
        }).catch((error) => {
          const errorMessage = error.message
          setErrorMessage("Provide a correct email and password!")
        })
      }
  
    // google signin 
    const handleLogin = () => {
      signUpWithGmail().then((result) => {
        const user = result.user;
        alert("Login successful")
        navigate(from,{replace: true})
      }).catch((error) => console.log(error))
    }
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg text-black">Please Login !</h3>
            
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
            {
              errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
            }

            {/* Login Button  */}
            <div className="form-control mt-4">
              <input
                type="Submit"
                value="Login"
                className="btn bg-green border-none text-white"
              />
            </div>

            <p className="text-center my-2">
              Dont have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                SignUp Now
              </Link>
            </p>

            <button
                htmlFor="my_modal_5"
                onClick={()=>document.getElementById('my_modal_5').close()}
             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
            </button>
            
          </form>

          {/* SOCIAL SIGN IN  */}
          
          <div className="text-center space-x-3 mb-5">
                <button className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none" onClick={handleLogin}>
                    <FaGoogle/>
                </button>
                <button className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none">
                    <FaFacebookF/>
                </button>
                <button className="btn btn-circle bg-gray-400 hover:bg-green text-white border-none">
                    <FaGithub/>
                </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
