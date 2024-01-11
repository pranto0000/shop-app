import React from 'react'
import Banner from '../../components/Banner.jsx'
import Categories from './Categories.jsx'
import SpecialDishes from './SpecialDishes.jsx'
import Testimonials from './Testimonials.jsx'
import OurServices from './OurServices.jsx'
import Cards from '../../components/Cards.jsx'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home