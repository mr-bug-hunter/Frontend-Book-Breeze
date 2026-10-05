import './App.css'
import {  Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Header from './components/Header'
import Home from './page/Home'
import Footer from './components/Footer'
import CategoryPage from './page/CategoryPage'
import AllBooks from "./page/AllBooks"
import ProductDetails from "./page/ProductDetails"
import HorrorSection from './page/HorrorSection'
import RomanceSection from './page/RomanceSection'
import Cart from './page/Cart'
import Wishlist from "./page/Wishlist"
import Address from './page/Address'
import Checkout from "./page/Checkout"
import Orders from './page/Orders'
import Profile from './page/Profile'

function App() {

  const [search, setSearch] = useState("")
  
  return (
    <>
    <Header search={search} setSearch={setSearch} />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<AllBooks search={search} />}/>
      <Route path='/category/:categoryName' element={<CategoryPage search={search} />} />
      <Route path='/product/:productId' element={<ProductDetails/>}/>
      <Route path='/horror' element={<HorrorSection search={search} />}/>
      <Route path='/romance' element={<RomanceSection search={search} />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path='/addresses' element={<Address/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/orders' element= {<Orders/>} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
