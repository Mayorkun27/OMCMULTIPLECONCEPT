import React from 'react'
import NavBar from '../components/navs/NavBar'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="overflow-x-hidden styled-scrollbar min-h-screen bg-lighter">
        <NavBar />
        { children }
        <Footer />
    </div>
  )
}

export default MainLayout