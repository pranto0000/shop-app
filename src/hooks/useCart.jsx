import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider.jsx'
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const {refetch, data:cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://shop-app-0kv8.onrender.com/carts?email=${user?.email}`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return res.json()
          },
    })
  return [cart,refetch]
}

export default useCart