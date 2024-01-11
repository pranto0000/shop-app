import React from 'react'

const categoryItems = [
    {id: 1, title:"ShopSphere", des:"(86 Shop)", image: "/images/home/category/img1.png"},
    {id: 2, title:"StyleHarbor", des:"(12 Style)", image: "/images/home/category/img2.png"},
    {id: 3, title:"LuxeCart", des:"(48 Cart)", image: "/images/home/category/img3.png"},
    {id: 4, title:"TechTrove", des:"(255 Items)", image: "/images/home/category/img4.png"},
]
const Categories = () => {
  return (
    <div className='section-container py-16 bg-white'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title text-gray-600'>Popular Catagories</h2>
        </div>

        {/* category cards  */}
        <div className='flex flex-col sm:flex-row gap-8 flex-wrap justify-around items-center mt-12'>
            {
                categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-60 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex w-full mx-auto items-center justify-center'>
                            <img src={item.image} alt="" className=' p-5 rounded-full w-40 h-40' />
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-red'>{item.title}</h5>
                            <p className='text-gray-600'>{item.des}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories