import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards.jsx";
import { FaFilter } from "react-icons/fa"
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  // loading data
  useEffect(() => {
    // fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("https://shop-app-0kv8.onrender.com/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching Data", error);
      }
    };
    // call the function
    fetchData();
  }, []);

  // filtering data based on cetegory
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1)
  };

  // show all data function 
  const showAll = () => {
    setFilteredItems(menu)
    setSelectedCategory("all");
    setCurrentPage(1);
  }

  // sorting based on A-Z,Z-A, Low-Hign pricing 
  const handleSortChange = (option) => {
    setSortOption(option)

    let sortedItems = [...filteredItems]

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a,b) => a.name.localeCompare(b.name))
        break;
      
      case "Z-A":
        sortedItems.sort((a,b) => b.name.localeCompare(a.name))
        break;

      case "low-to-high":
        sortedItems.sort((a,b) => a.price - b.price)
        break;
          
      case "high-to-low":
        sortedItems.sort((a,b) => b.price - a.price)
        break;
      
      
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1)
  }


  // pagination logic 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFastItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFastItem,indexOfLastItem)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div>
      {/* menu banner  */}
      <div className="max-w-screen-2xl section-container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA]  to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  justify-center items-center ">
          {/* text  */}
          <div className=" text-center space-y-7 px-4">
            <h2 className="text-gray-600 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[#A4A4A4] md:w-4/5 mx-auto">
              Come with family & feel joy of mouthwatering food such as Greek
              Salad, Lasagne, Butternut Pumpkin, Tokuser Wagyu, Olivas Rellenas
              and more for a moderate cost
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full border-none">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop  */}
      <div className="section-container ">
        {/* fintring buttons anf sort  */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all category button  */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
            <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
            <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
            <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
            <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
            <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
          </div>

          {/* sorting and filtering  */}
          <div className="flex justify-end md-4 rounded-sm gap-2">
              {/* ICON  */}
            <div className="bg-yellow-400 p-2">
              <FaFilter className="h-4 w-5 text-white"/>
            </div>

              {/* sorting options  */}
              <select name="sort" id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-yellow-400 text-white px-2 py-1 rounded-sm"
              >
                  <option value="default">Default</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                  <option value="low-to-high">Low-to-high</option>
                  <option value="high-to-low">High-to-low</option>
                
              </select>

          </div>
        </div>

        {/* products card  */}
        <div className="bg-gray-200 mx-auto p-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {/* {
            filteredItems.map((item) => (
              <Cards key={item._id} item={item}/>
            ))
          } */}
          {
            currentItems.map((item) => (
              <Cards key={item._id} item={item}/>
            ))
          }
        </div>
      </div>

      {/* pagination sections  */}
      <div className="flex justify-center my-8">
          {
            Array.from({length:Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) => (
              <button key={index+1} onClick={()=> paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : " bg-gray-200"}`}
              >
                {
                  index + 1
                }
              </button>
            ))
          }
      </div>
    </div>
  );
};

export default Menu;
