import React from 'react'
import {
Link
} from "react-router-dom";

function Home() {
  

  return (
   <div>
          <div>
                <button><Link to="/user">User</Link></button>
                <button><Link to="/provide">Provide</Link></button>
          </div>
   </div>
  )
}

export default  Home;