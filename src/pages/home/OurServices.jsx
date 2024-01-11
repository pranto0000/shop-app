import React from "react";

const serviceLists = [
    {id:1,title:"Catering", des:"Delight your guests with our flavors and presentation", image:"/images/home/services/icon1.png"},
    {id:2,title:"First delivery", des:"We deliver your order promptly to your door", image:"/images/home/services/icon2.png"},
    {id:3,title:"Online Ordering", des:"Explore menu & order with ese using our Online Ordering", image:"/images/home/services/icon3.png"},
    {id:4,title:"Gift Cards", des:"Gift the gift of excepitional dining Food! Gift Cards", image:"/images/home/services/icon4.png"},
]
const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
      <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">OUR STORY & SERVICES</p>
            <h2 className="title text-gray-600">
              Our Culinary Journey And Services
            </h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and offer exceptional serveces, blending culinart artisty with earm hospitality.
            </p>

            <button className="btn bg-green text-white px-8 py-3 rounded-full border-none">Explore</button>
        
          </div>
        </div>

        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border">
                            <img src={service.image} alt="" className="mx-auto" />
                            <h5 className="pt-3 font-semibold">{service.title}</h5>
                            <p className="text-[#90BD95]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default OurServices;
