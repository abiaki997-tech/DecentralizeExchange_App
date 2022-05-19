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
  // input value store
  let [value1, setvalue1] = React.useState("");
  let [value2, setvalue2] = React.useState("");

  // disabled input 1 & 2
  let [valuedisabled1, setvaluedisabled1] = React.useState(false);
  let [valuedisabled2, setvaluedisabled2] = React.useState(false);

  let [icon, setIcon] = React.useState(["BST", "KGF"]);

  // bottom token a per token b
  let [priceText, setPriceText] = React.useState([]);

  let [priceTokenA, setPriceTokenA] = React.useState("");
  let [priceTokenB, setPriceTokenB] = React.useState("");

  // page load first tym
  React.useEffect(() => {
    loadvalues();
  }, []);

  async function loadvalues() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      const transcation = await Decentralize_Exchange_Contract.getPoolDetails();

      // pool details
      let { Each_TokenA_Value, Each_TokenB_Value, totalvalue } = transcation;

      let price_A = Number(Each_TokenA_Value.toString() / precision).toFixed(3);
      let price_B = Number(Each_TokenB_Value.toString() / precision).toFixed(3);

      setPriceTokenA(price_A);
      setPriceTokenB(price_B);

      let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
      let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

      setPriceText([...priceText, per_BST, per_KGF]);
    }
  }

  const onChangeAmount1 = (e) => {
    console.log(e.target.value, "token a");

    console.log("handle value", icon[0]);

    setvalue1(e.target.value);

    setvalue2(0.0);

    setvaluedisabled2(true);

    handlechangeAmount1(e.target.value);
  };

  const onChangeAmount2 = (e) => {
    console.log(e.target.value, "token b");

    console.log("handle value", icon[0]);

    setvalue2(e.target.value);

    setvalue1(0.0);

    setvaluedisabled1(true);

    handlechangeAmount2(e.target.value);
  };

  const handlechangeAmount1 = async (value) => {
    if (typeof window.ethereum !== "undefined" && value) {
      console.log(value);

      let precision_value = ethers.utils.parseUnits(value, 18);

      console.log(precision_value);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      if (icon[0] == "BST") {
        //   given token B
        const transcation =
          await Decentralize_Exchange_Contract.estimate_tokenB(precision_value);

        console.log(transcation, "*transcation*");

        let {
          new_TokenB,
          new_TokenA,
          given_TokenB,
          price_TokenA,
          price_TokenB,
        } = transcation;

        let givenTokenB = Number(given_TokenB.toString() / precision).toFixed(
          3
        );

        setvalue2(givenTokenB);

        setvaluedisabled2(false);

        //   new token b= balance token b

        //   console.log(new_TokenB.toString() / precision, "TokenB Balance");
        //   console.log(new_TokenA.toString() / precision, "TokenA Balance");
        //   console.log(given_TokenB.toString() / precision, "Give TokenB");
        //   console.log(price_TokenA.toString() / precision, "price_TokenA");
        //   console.log(price_TokenB.toString() / precision, "price_TokenB");

        console.log(
          `${price_TokenA.toString() / precision} Token_B per Token_A`
        );
        console.log(
          `${price_TokenB.toString() / precision} Token_A per Token_B`
        );

        let price_A = Number(price_TokenA.toString() / precision).toFixed(3);
        let price_B = Number(price_TokenB.toString() / precision).toFixed(3);

        setPriceTokenA(price_A);
        setPriceTokenB(price_B);

        let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
        let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

        setPriceText([per_BST, per_KGF]);

        // setPriceText([per_BST,per_KGF]);
        // setIcon([...icon.reverse()]);

        console.log(icon[0], "icon1");
      } else {
        //   given token A
        const transcation =
          await Decentralize_Exchange_Contract.estimate_tokenA(precision_value);

        console.log(transcation, "*transcation*");

        let {
          new_TokenB,
          new_TokenA,
          given_TokenA,
          price_TokenA,
          price_TokenB,
        } = transcation;

        let givenTokenA = Number(given_TokenA.toString() / precision).toFixed(
          3
        );

        setvalue2(givenTokenA);

        setvaluedisabled2(false);

        console.log(
          `${price_TokenA.toString() / precision} Token_B per Token_A`
        );
        console.log(
          `${price_TokenB.toString() / precision} Token_A per Token_B`
        );

        let price_A = Number(price_TokenA.toString() / precision).toFixed(3);
        let price_B = Number(price_TokenB.toString() / precision).toFixed(3);

        setPriceTokenA(price_A);
        setPriceTokenB(price_B);

        let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
        let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

        setPriceText([per_BST, per_KGF]);

        console.log(icon[0], "icon1");
      }
    } else {
      alert("Something Went Wrong!");
    }
  };

  const handlechangeAmount2 = async (value) => {
    if (typeof window.ethereum !== "undefined" && value) {
      console.log(value);

      let precision_value = ethers.utils.parseUnits(value, 18);

      console.log(precision_value);

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      if (icon[0] == "BST") {
        //   given token B
        const transcation =
          await Decentralize_Exchange_Contract.estimate_tokenB(precision_value);

        console.log(transcation, "*transcation*");

        let {
          new_TokenB,
          new_TokenA,
          given_TokenB,
          price_TokenA,
          price_TokenB,
        } = transcation;

        let givenTokenB = Number(given_TokenB.toString() / precision).toFixed(
          3
        );

        setvalue1(givenTokenB);

        setvaluedisabled1(false);

        //   new token b= balance token b

        //   console.log(new_TokenB.toString() / precision, "TokenB Balance");
        //   console.log(new_TokenA.toString() / precision, "TokenA Balance");
        //   console.log(given_TokenB.toString() / precision, "Give TokenB");
        //   console.log(price_TokenA.toString() / precision, "price_TokenA");
        //   console.log(price_TokenB.toString() / precision, "price_TokenB");

        // console.log(
        //   `${price_TokenA.toString() / precision} Token_B per Token_A`
        // );
        // console.log(
        //   `${price_TokenB.toString() / precision} Token_A per Token_B`
        // );

        let price_A = Number(price_TokenA.toString() / precision).toFixed(3);
        let price_B = Number(price_TokenB.toString() / precision).toFixed(3);

        setPriceTokenA(price_A);
        setPriceTokenB(price_B);

        let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
        let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

        setPriceText([per_BST, per_KGF]);

        console.log(icon[0], "icon1");
      } else {
        //   given token A
        const transcation =
          await Decentralize_Exchange_Contract.estimate_tokenA(precision_value);

        console.log(transcation, "*transcation*");

        let {
          new_TokenB,
          new_TokenA,
          given_TokenA,
          price_TokenA,
          price_TokenB,
        } = transcation;

        let givenTokenA = Number(given_TokenA.toString() / precision).toFixed(
          3
        );

        setvalue1(givenTokenA);

        setvaluedisabled1(false);

        // console.log(
        //   `${price_TokenA.toString() / precision} Token_B per Token_A`
        // );
        // console.log(
        //   `${price_TokenB.toString() / precision} Token_A per Token_B`
        // );

        let price_A = Number(price_TokenA.toString() / precision).toFixed(3);
        let price_B = Number(price_TokenB.toString() / precision).toFixed(3);

        setPriceTokenA(price_A);
        setPriceTokenB(price_B);

        let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
        let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

        setPriceText([per_BST, per_KGF]);

        console.log(icon[0], "icon1");
      }
    } else {
      alert("Something Went Wrong!");
    }
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

  const handleSwapSubmit = async() => {
    console.log("handlesubmit state start");
    if (value1 > 0) {
      // swap
      // given kgf token and take bst token

      if (window.ethereum) {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // if(wins)
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        let precision_token = ethers.utils.parseUnits(value1, 18);

        if (icon[1] == "BST") {
          // swapTokenA func
          // precision impelmented
          //  approve kgf token and swap tokena
          // console.log('t',precision_tokenA,precision_tokenB)

          const KGF_contract = new ethers.Contract(
            KGF_TOKEN_ADDRESS,
            KGF_ABI.abi,
            signer
          );

          const Decentralize_Exchange_Contract = new ethers.Contract(
            DEX_MAIN_ADDRESS,
            DEX_MAIN.abi,
            signer
          );

          try {


            const transcation2 = await KGF_contract.approve_MonsterToken(
              DEX_MAIN_ADDRESS,
              precision_token
            );

            let data2 = await transcation2.wait();

            console.log(data2,'approve_MonsterToken successfully')

            const transcation3 = await Decentralize_Exchange_Contract.swapTokenA(precision_token);

            let data3 = await transcation3.wait();

            console.log("transcation completed",  data3);
  
            alert("transcation completed");

  
            setvalue1("");

            setvalue2("");

            loadvalues()

          } catch (error) {

            console.log(error)
            alert("transcation error");
          }
        } else {
          // given bst token and take kgf token
          // swapTokenB func
          const BST_contract = new ethers.Contract(
            BEAST_TOKEN_ADDRESS,
            Beast_ABI.abi,
            signer
          );
          const Decentralize_Exchange_Contract = new ethers.Contract(
            DEX_MAIN_ADDRESS,
            DEX_MAIN.abi,
            signer
          );

          
          try {



            const transcation = await BST_contract.approve_BeastToken(
              DEX_MAIN_ADDRESS,
              precision_token
            );

            let data = await transcation.wait();

            console.log(data,'approve_BeastToken successfully')

            const transcation3 = await Decentralize_Exchange_Contract.swapTokenA(precision_token);

            let data3 = await transcation3.wait();

            console.log("transcation completed",  data3);
  
            alert("transcation completed");

  
            setvalue1("");

            setvalue2("");

            loadvalues()

          } catch (error) {

            console.log(error)
            alert("transcation error");
          }
        }
      } else {
        alert("Please Install MetaMask");
      }
    } else {
      alert("Zero balance Cannot Swap");
    }
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

      <p style={{ fontSize: "20px" }}>Price </p>

      <div style={{}} className="bottomDesign">
        <div className="bottomDesignChilds">
          <p>{priceText[1]}</p>
          <p style={{}}>BST Per KGF</p>
        </div>

        <div className="bottomDesignChilds">
          <p style={{}}>{priceText[0]} </p>
          <p style={{}}>KGF Per BST</p>
        </div>
      </div>

      <div className="bottomDiv">
        <button className="button-33" onClick={handleSwapSubmit}>
          Connect Wallet
        </button>
      </div>

      {/*  */}
    </div>
  );
}

export default LiquidityPoolProvide;
