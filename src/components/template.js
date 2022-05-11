import React from "react";
import "../style.css";

function Template(props) {
  const onInputChange = (e) => {
    if (e.target.value === "") {
      props.onChanges(e);
    }
  };

  return (
    <div>
      <div className="boxTemplate">
        <div className="boxBody">
          <div>
            <p className="leftHeader"> {props.leftTop} </p>
            <input
              className="textField"
              value={props.value}
              onChange={(e) => onInputChange(e)}
              placeholder="Enter amount"
            />
          </div>
          <p className="rightContent">{props.icon}</p>
          <div className="rightContent">{props.rightTop}</div>
        </div>
      </div>
    </div>
  );
}

export default Template;
