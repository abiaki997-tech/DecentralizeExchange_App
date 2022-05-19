import React from "react";
import "../style.css";
import {pattern} from '../CONSTANTS'




function Template(props) {
  
  const onInputChange = (e) => {


    if (e.target.value == "" || pattern.test(e.target.value)) {
      props.onChanges(e);
    ;

      return pattern.test(e.key )
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
              disabled = {props.disabled? "disabled" : ""}
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
