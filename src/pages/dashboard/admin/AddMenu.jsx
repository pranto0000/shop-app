import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from 'sweetalert2'
const AddMenu = () => {
    const {register,handleSubmit,reset} = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    // image hosting key 
    const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`
    
    const onSubmit = async(data) => {
      const imageFile = {image:data.image[0]};
        const hostingImg = await axiosPublic.post(image_hosting_api,imageFile,{
          headers:{
            'content-type':'multipart/form-data'
          }
        })
        console.log(hostingImg.data);
        if (hostingImg.data.success) {
          const menuItem = {
            name:data.name,
            category:data.category,
            price:parseFloat(data.price),
            recipe:data.recipe,
            image:hostingImg.data.data.display_url
          }
          // console.log(menuItem);
          const postMenuItem = axiosSecure.post('/menu',menuItem)
          if (postMenuItem) {
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Item is inserted successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
    }
    
      
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>

      {/* from here  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-gray-700">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full bg-white border-gray-400"
            />
          </div>

          {/* 2nd row  */}
          <div className="flex items-center justify-between gap-4">
            {/* categories  */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text text-gray-700">
                  Choose Category*
                </span>
              </label>
              <select  {...register("category", { required: true })} className="select select-bordered bg-white border-gray-400" defaultValue="default">
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drink</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices  */}
            <div className="form-control w-full my-6 ">
              <label className="label">
                <span className="label-text text-gray-700">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full bg-white border-gray-400"
              />
            </div>
          </div>

          {/* 3rd row  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">Recipe Details</span>
            </label>
            <textarea
                {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24 bg-white border-gray-400 "
              placeholder="Tall worlds about your recipe"
            ></textarea>
          </div>

          {/* 4th row  */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700">Upload Photo</span>
            </label>
            <input
                {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full bg-white"
            />
           
          </div>

          <button className="btn bg-green text-white px-6 my-6 border-none"><FaUtensils/> Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
