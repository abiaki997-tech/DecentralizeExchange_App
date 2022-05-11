import React from "react";

// import { MdAdd } from "react-icons/md";
import "../style.css";
import Template from "./template";

function User() {

    let [valueofBST,setValueofBST]= React.useState;
    let [valueofKGF,setValueofKGF]= React.useState;

  const onChangeAmountOfBST = (e) => {
      setValueofBST(e.target.value)
  };
  const onChangeAmountOfKGF = (e) => {
    setValueofKGF(e.target.value)
};

  return (
    <div className="tabBody">
      <h1 style={{ color: "red", background: "white", paddingLeft: "205px" }}>
        User
      </h1>

      <Template
        leftTop={"Input"}
        value={valueofBST}
        rightTop={"Beast"}
        onChanges={(e) => onChangeAmountOfBST(e)}
        icon={"icon"}
      />
      <div className="swapIcon">{/* <MdAdd /> */}+</div>
      <Template
        leftTop={"Input"}
        value={valueofKGF}
        rightTop={"KGF"}
        onChanges={(e) => onChangeAmountOfKGF(e)}
        icon={"icon"}
      />

      {/* need to work reusable */}
      <p style={{ color: "white", marginLeft: "150px" }}>
        price and pool share
      </p>
      <div style={{ display: "flex", marginLeft: "150px" }}>
        <div style={{ margin: "10px" }}>
          <p style={{ color: "white", margin: "10px" }}>0.1123</p>
          <p style={{ color: "white", margin: "10px", fontSize: "12px" }}>
            Eth per Usdt
          </p>
        </div>

        <div style={{ margin: "10px" }}>
          <p style={{ color: "white", margin: "10px" }}>0.001</p>
          <p style={{ color: "white", margin: "10px", fontSize: "12px" }}>
            Usdt per Eth
          </p>
        </div>

        <div style={{ margin: "10px" }}>
          <p style={{ color: "white", margin: "10px", fontSize: "12px" }}>
            Your Share Details
          </p>
          <p style={{ color: "white", margin: "10px", fontSize: "12px" }}>
            Click Here
          </p>
        </div>
      </div>
      <div className="bottomDiv">
        <div className="btn" onClick={() => console.log("a")}>
          Provide
        </div>
      </div>

      {/*  */}
    </div>
  );
}

export default User;
