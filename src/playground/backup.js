import "./styles.scss";
import React from "react";
import ReactDOM from "react-dom";
import { MdAdd } from "react-icons/md";
import "./style.css";

// default code

class SandBox extends React.Component {
  render() {
    const onInputChange = (e) => {
      if (e.target.value === "") {
        console.log(e.target.value);
      }
    };

    return (
      
      <div className="tabBody"> 
       <h1 style={{color:"red",background:"white",paddingLeft:"205px"}}>User</h1>
      <div className="boxTemplate">
        <div className="boxBody">
          <div>
            <p className="leftHeader"> Input </p>
            <input
              className="textField"
              value="Enter a Amount"
              onChange={(e) => onInputChange(e)}
              placeholder={"Enter amount"}
            />
          </div>
          <p className="rightContent">icon</p>
          <div className="rightContent">Beast</div>  
        </div>
      </div>
      <div className="swapIcon">
				<MdAdd />
			</div>
      <div className="boxTemplate">
        <div className="boxBody">
          <div>
            <p className="leftHeader"> Input</p>
            <input
              className="textField"
              value="Enter a Amount"
              onChange={(e) => onInputChange(e)}
              placeholder={"Enter amount"}
            />
          </div>
          <p className="rightContent">icon</p>
          <div className="rightContent">KGF</div>
        </div>
      </div>
      <p style={{color:"white",marginLeft:"150px"}}>price and pool share</p>
      <div style={{display:"flex" ,marginLeft:"150px"}}>
       
      
       <div style={{margin:"10px"}}>
         <p style={{color:"white",margin:"10px"}}>0.1123</p>
         <p style={{color:"white",margin:"10px",fontSize:"12px"}}>Eth per Usdt</p>
       </div>

       <div style={{margin:"10px"}}>
         <p style={{color:"white",margin:"10px"}}>0.001</p>
         <p style={{color:"white",margin:"10px",fontSize:"12px"}}>Usdt per Eth</p>
       </div>

       <div style={{margin:"10px"}}>
         <p style={{color:"white",margin:"10px",fontSize:"12px"}}>Your Share Details</p>
         <p style={{color:"white",margin:"10px",fontSize:"12px"}}>Click Here</p>
       </div>
      
  
  
      </div>
      <div className="bottomDiv">
				<div className="btn" onClick={() => console.log('a')}>
				   Provide
				</div>
			</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SandBox />, rootElement);
