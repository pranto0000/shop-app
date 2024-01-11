// /* eslint-disable react/prop-types */
// import React, { createContext, useEffect, useState } from 'react'
// import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import app from "../firebase/firebase.config.js"
// import axios from 'axios'

// export const AuthContext = createContext()
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null)
//     const [loading,setLoading] = useState(true)


//     // create an account
//     const createUser = (email,password) => {
//       setLoading(true);
//       return createUserWithEmailAndPassword(auth, email, password)
      
//     }
//     // sign up with gmail
//     const signUpWithGmail = () => {
//       setLoading(true)
//      return signInWithPopup(auth, googleProvider)
//     }

//     // login using email and password 
//     const login = (email, password) => {
//       setLoading(true)
//       return signInWithEmailAndPassword(auth, email, password)
//     }

//     // logout 
//     const logOut = () => {
//       setLoading(true)
//      return signOut(auth)
//     }

//     // update profile 
//     const updateUserProfile = (name,photoURL) => {
//       return updateProfile(auth.currentUser, {
//         displayName: name, photoURL: photoURL
//       })
//     }

//     // check signed-in user 
//     useEffect(()=> {
//       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         console.log(currentUser);
//         setUser(currentUser);
//         if (currentUser) {
//           const userInfo = {email: currentUser.email}
//         axios.post('https://shop-app-0kv8.onrender.com/jwt',userInfo)
//         .then((response) => {
//           // console.log(response.data.accessToken);
//           if (response.data.token) {
//             localStorage.setItem('access-token', response.data.token);
            
//           }
//         })
//         }else{
//           localStorage.removeItem('access-token');
//         }
        
//         setLoading(false);
//       });
//       return () => {
//         return unsubscribe();
//       }
//     },[])


//     const authInfo = {
//       user,
//       createUser,
//       signUpWithGmail,
//       login,
//       logOut,
//       updateUserProfile,
//       loading,
//   }
//   return (
//     <AuthContext.Provider value={authInfo}>
//         {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

// // /* eslint-disable react/prop-types */
// // import React from 'react';
// // import { createContext } from 'react';
// // import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// // import { useState } from 'react';
// // import { useEffect } from 'react';
// // import app from '../firebase/firebase.config';


// // export const AuthContext = createContext();
// // const auth = getAuth(app);
// // const googleProvider = new GoogleAuthProvider();

// // const AuthProvider = ({children}) => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);

// //     const createUser = (email, password) => {
// //         setLoading(true);
// //         return createUserWithEmailAndPassword(auth, email, password);
// //     }

// //     const signUpWithGmail = () => {
// //         setLoading(true);
// //         return signInWithPopup(auth, googleProvider);
// //     }

// //     const login = (email, password) =>{
// //         return signInWithEmailAndPassword(auth, email, password);
// //     }

// //     const logOut = () =>{
// //         localStorage.removeItem('genius-token');
// //         setLoading(true);
// //         return signOut(auth);
// //     }

// //     // update your profile
// //     const updateUserProfile = (name, photoURL) => {
// //       return  updateProfile(auth.currentUser, {
// //             displayName: name, photoURL: photoURL
// //           })
// //     }

// //     useEffect( () =>{
// //         const unsubscribe = onAuthStateChanged(auth, currentUser =>{
// //             // console.log(currentUser);
// //             setUser(currentUser);
// //             if(currentUser){
// //                 const userInfo ={email: currentUser.email}
// //                 axios.post('https://shop-app-0kv8.onrender.com/jwt', userInfo)
// //                   .then( (response) => {
// //                     // console.log(response.data.token);
// //                     if(response.data.token){
// //                         localStorage.setItem("access-token", response.data.token)
// //                     }
// //                   })
// //             } else{
// //                localStorage.removeItem("access-token")
// //             }
           
// //             setLoading(false);
// //         });

// //         return () =>{
// //             return unsubscribe();
// //         }
// //     }, [])

// //     const authInfo = {
// //         user, 
// //         loading,
// //         createUser, 
// //         login, 
// //         logOut,
// //         signUpWithGmail,
// //         updateUserProfile
// //     }

// //     return (
// //         <AuthContext.Provider value={authInfo}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // export default AuthProvider;

/* eslint-disable react/prop-types */
import React from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    // update your profile
    const updateUserProfile = (name, photoURL) => {
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            if(currentUser){
                const userInfo ={email: currentUser.email}
                axios.post('https://shop-app-0kv8.onrender.com/jwt', userInfo)
                  .then( (response) => {
                    // console.log(response.data.token);
                    if(response.data.token){
                        localStorage.setItem("access-token", response.data.token)
                    }
                  })
            } else{
               localStorage.removeItem("access-token")
            }
           
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        createUser, 
        login, 
        logOut,
        signUpWithGmail,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;