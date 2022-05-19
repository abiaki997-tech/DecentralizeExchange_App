import React from "react";
import { ethers, Signer, utils } from "ethers";
import { MdOutlineSwapVert, MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

import "../style.css";
import Template from "./template";
import {
  BEAST_TOKEN_ADDRESS,
  KGF_TOKEN_ADDRESS,
  precision,
  DEX_MAIN_ADDRESS,
} from "../CONSTANTS";
import Beast_ABI from "../artifacts/contracts/beast_token.sol/Beast_Token.json";
import KGF_ABI from "../artifacts/contracts/monster_token.sol/Monster_Token.json";
import DEX_MAIN from "../artifacts/contracts/dex_main.sol/Decentralize_Exchange.json";
import { handleConnectWallet } from "../helpers/connect_wallet";

function LiquidityPoolProvide() {
  let [value1, setvalue1] = React.useState("");
  let [value2, setvalue2] = React.useState("");

  let [valuedisabled1, setvaluedisabled1] = React.useState(false);
  let [valuedisabled2, setvaluedisabled2] = React.useState(false);

  let [icon, setIcon] = React.useState(["BST", "KGF"]);

  let [priceText, setPriceText] = React.useState("");

  const onChangeAmount1 = (e) => {
    console.log(e.target.value, "token a");

    console.log("handle value", icon[0]);
    if (icon[0] == "BST") {
      handlechangeAmount1(e.target.value);
    } else {
      handlechangeAmount2(e.target.value);
    }
  };
  const onChangeAmount2 = (e) => {
    console.log(e.target.value, "token b");

    if (icon[0] == "BST") {
      console.log("handle value");
      handlechangeAmount1(e.target.value);
    } else {
      handlechangeAmount2(e.target.value);
    }
  };
  const handlechangeAmount1 = async (value) => {

    if (typeof window.ethereum !== "undefined" && value) {

      console.log(value);
  
      setvalue1(value);

      setvalue2(0.0);

      setvaluedisabled2(true);

      let precision_value = ethers.utils.parseUnits(value, 18);

      console.log(precision_value);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      //   given token B
      const transcation = await Decentralize_Exchange_Contract.estimate_tokenB(
        precision_value
      );

      console.log(transcation, "*transcation*");

      let { new_TokenB, new_TokenA, given_TokenB, price_TokenA, price_TokenB } =
        transcation;

      //   new token b= balance token b

    //   console.log(new_TokenB.toString() / precision, "TokenB Balance");
    //   console.log(new_TokenA.toString() / precision, "TokenA Balance");
    //   console.log(given_TokenB.toString() / precision, "Give TokenB");
    //   console.log(price_TokenA.toString() / precision, "price_TokenA");
    //   console.log(price_TokenB.toString() / precision, "price_TokenB");

      let givenTokenB = Number(given_TokenB.toString() / precision).toFixed(3);

      setvalue2(givenTokenB);

      setvaluedisabled2(false);

      console.log(`${price_TokenA.toString() / precision} Token_B per Token_A`);
      console.log(`${price_TokenB.toString() / precision} Token_A per Token_B`);

      setPriceText(`${price_TokenB.toString() / precision} BST per KGF`);

      console.log(icon[0], "icon1");
    } else {
      alert("Something Went Wrong!");
    }
  };
  const handlechangeAmount2 = async (value) => {
    if (typeof window.ethereum !== "undefined" && value) {

      console.log(value);

      setvalue2(value);

      setvalue1(0.0);
      setvaluedisabled1(true);

      let precision_value = ethers.utils.parseUnits(value, 18);

      //   console.log(precision_value);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      //   given token A
      const transcation = await Decentralize_Exchange_Contract.estimate_tokenA(
        precision_value
      );

      console.log(transcation.toString(), "*transcation*");

      let { new_TokenB, new_TokenA, given_TokenA, price_TokenA, price_TokenB } =
        transcation;

      //   new token b= balance token b

    //   console.log(new_TokenB.toString() / precision, "TokenB Balance");
    //   console.log(new_TokenA.toString() / precision, "TokenA Balance");
    //   console.log(given_TokenA.toString() / precision, "Give TokenA");
    //   console.log(price_TokenA.toString() / precision, "price_TokenA");
    //   console.log(price_TokenB.toString() / precision, "price_TokenB");

      let givenTokenA = Number(given_TokenA.toString() / precision).toFixed(3);

      setvalue1(givenTokenA);

      setvaluedisabled1(false);

      console.log(`${price_TokenA.toString() / precision} Token_B per Token_A`);
      console.log(`${price_TokenB.toString() / precision} Token_A per Token_B`);

      setPriceText(`${price_TokenA.toString() / precision} KGF per BST`);

      console.log(icon[1], "icon2");
    } else {
      alert("Something Went Wrong!");
    }

    // setTimeout(() => {
    //   setvalue1(28);
    // }, 1000);
  };

  const swapchangeamount = () => {
    setvalue2(value1);
    setvalue1(value2);
  };

  const handleSwapClick = () => {
    console.log("handleclick state start");
    setIcon([...icon.reverse()]);
    swapchangeamount();
    console.log("handleclick state changed");
  };

  return (
    <div className="tabBody">
      <Link
        to={{
          pathname: "/",
          search: "",
          hash: "",
          state: {},
        }}
      >
        {" "}
        <div className="backIcon">
          <MdKeyboardBackspace />
        </div>
      </Link>

      <h3 style={{}} className="headerIcon">
        Swap
      </h3>

      <Template
        leftTop={"Input"}
        value={value1}
        rightTop={icon[0]}
        onChanges={(e) => onChangeAmount1(e)}
        disabled={valuedisabled1 ? "disabled" : ""}
        icon={"Icon"}
      />
      <div className="swapIcon" onClick={handleSwapClick}>
        <MdOutlineSwapVert />
      </div>
      <Template
        leftTop={"Input"}
        value={value2}
        rightTop={icon[1]}
        disabled={valuedisabled2 ? "disabled" : ""}
        onChanges={(e) => onChangeAmount2(e)}
        icon={"Icon"}
      />

      {/* need to work reusable */}

      <div style={{}} className="bottomDesign">
        <div className="bottomDesignChilds">
          <p>Price</p>
        </div>

        <div className="bottomDesignChilds">
          <p style={{}}> {priceText} </p>
        </div>
      </div>

      <div className="bottomDiv">
        <div className="btn" onClick={() => addLiquidtyProvide()}>
          Connect Wallet
        </div>
      </div>

      {/*  */}
    </div>
  );
}

export default LiquidityPoolProvide;
