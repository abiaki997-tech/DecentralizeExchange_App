import React from 'react'
import {
Link
} from "react-router-dom";

function Home() {
  

  return (
   <div className='home'>
          <div>
                <button className='button-33'><Link to="/user">User</Link></button>
                <button className='button-33'><Link to="/provide">Provide</Link></button>
                <button className='button-33'><Link to="/swap">Swap</Link></button>
          </div>
   </div>
  )
}

export default  Home;