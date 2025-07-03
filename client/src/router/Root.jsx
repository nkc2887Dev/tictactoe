import React from 'react'
import Header from '../pages/Header/Header'
import { Outlet } from 'react-router-dom'

function Root() {

  return (
    <div className='main'>
          <Header />
          <Outlet/>
          {/* <Footer/> */}
    </div>
  )
}

export default Root