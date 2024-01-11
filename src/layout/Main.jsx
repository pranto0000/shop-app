import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'

import '../App.css'
import Footer from '../components/Footer.jsx'
import { AuthContext } from '../contexts/AuthProvider.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const Main = () => {
  const {loading} = useContext(AuthContext)
  return (
    <div className='bg-primaryBG'>
       {
        loading ? 
          <LoadingSpinner/>
            :
             <div>
                <NavBar/>
                  <div className='min-h-screen'>
                  <Outlet/>
                  </div>
                <Footer/>
            </div>
        
       }   
    </div>
    // <div>
    //   {
    //     loading ? <LoadingSpinner/> : <div>
    //       <NavBar/> 
    //       <Outlet/>
    //       <Footer/>
    //       </div>
    //   }
    // </div>

  )
}

export default Main
// import React, { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import "../../src/App.css";
// import Footer from "../components/Footer";
// import { AuthContext } from "../contexts/AuthProvider";
// import LoadingSpinner from "../components/LoadingSpinner";

// const Main = () => {
//   const { loading } = useContext(AuthContext);
//   return (
//     <div>
//       {
//         loading ? <p>loading</p> : <div><Navbar />
//         <div className="min-h-screen">
//           <Outlet />
//         </div>
//         <Footer /></div>
//       }
//     </div>
//   );
// };

// export default Main;