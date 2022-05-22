//import packages
import React from "react";
import { ethers, Signer, utils } from "ethers";
import { MdAdd, MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

// import files
import "../style.css";
import Template from "./template";
import {precision} from '../../CONST';
import Beast_ABI from "../artifacts/contracts/beast_token.sol/Beast_Token.json";
import KGF_ABI from "../artifacts/contracts/monster_token.sol/Monster_Token.json";
import DEX_MAIN from "../artifacts/contracts/dex_main.sol/Decentralize_Exchange.json";

// import dot env files
let BEAST_TOKEN_ADDRESS=process.env.REACT_APP_BEAST_TOKEN_ADDRESS;
let KGF_TOKEN_ADDRESS= process.env.REACT_APP_KGF_TOKEN_ADDRESS;
let DEX_MAIN_ADDRESS= process.env.REACT_APP_DEX_MAIN_ADDRESS;

function LiquidityPoolProvide() {
  let [valueofBST, setValueofBST] = React.useState("");
  let [valueofKGF, setValueofKGF] = React.useState("");
  let [kgf_token_price, set_kgf_token_price] = React.useState();
  let [bst_token_price, set_bst_token_price] = React.useState();
  let [share_of_pool, setShare_of_Pool] = React.useState();
  let [priceTokenA, setPriceTokenA] = React.useState("");
  let [priceTokenB, setPriceTokenB] = React.useState("");

  // bottom token a per token b
  let [priceText, setPriceText] = React.useState([]);

  const onChangeAmountOfBST = (e) => {
    console.log(e.target.value, "bst");
    setValueofBST(e.target.value);
  };
  const onChangeAmountOfKGF = (e) => {
    console.log(e.target.value, "kgf");
    setValueofKGF(e.target.value);
  };

  // page load first tym
  React.useEffect(() => {
    loadvalues();
  }, []);

  async function loadvalues() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const Decentralize_Exchange_Contract = new ethers.Contract(
        DEX_MAIN_ADDRESS,
        DEX_MAIN.abi,
        provider
      );

      const transcation =  await Decentralize_Exchange_Contract.getPoolDetails();
      const transcation2 = await Decentralize_Exchange_Contract.liquidityProvider(account);

      // console.log(transcation,'**',transcation2)
      // Each_TokenA_Value,Each_TokenB_Value
      // token_A_Balance,token_B_Balance,value

      // pool details
      let { Each_TokenA_Value, Each_TokenB_Value, totalvalue } = transcation;

      // provide details
      let { token_A_Balance, token_B_Balance, value } = transcation2;

      console.log(
        (transcation.TokenA_Balance).toString()/precision,
        (transcation.TokenB_Balance).toString()/precision,
        token_A_Balance.toString() / precision,
        token_B_Balance.toString() / precision,
      );

      // set_kgf_token_price(Each_TokenB_Value.toString() / precision);
      // set_bst_token_price(Each_TokenA_Value.toString() / precision);

       let totalvalue_provider = token_A_Balance.toString() / precision + token_B_Balance.toString() / precision;

        
        let price_A = Number(Each_TokenA_Value.toString() / precision).toFixed(3);
        let price_B = Number(Each_TokenB_Value.toString() / precision).toFixed(3);

        setPriceTokenA(price_A);
        setPriceTokenB(price_B);

        let per_BST = (Number(price_A) / Number(price_B)).toFixed(3);
        let per_KGF = (Number(price_B) / Number(price_A)).toFixed(3);

        setPriceText([per_BST, per_KGF]);

        setShare_of_Pool(totalvalue_provider);
    }
  }

  async function addLiquidtyProvide() {
    if (valueofBST > 0 && valueofKGF > 0) {
      if (window.ethereum) {
        try {
          const [account] = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          // if(wins)
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          const signer = provider.getSigner();

          let precision_tokenA = ethers.utils.parseUnits(valueofBST, 18);
          let precision_tokenB = ethers.utils.parseUnits(valueofKGF, 18);

          // console.log('t',precision_tokenA,precision_tokenB)
          const BST_contract = new ethers.Contract(
            BEAST_TOKEN_ADDRESS,
            Beast_ABI.abi,
            signer
          );
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

          // console.log(ethers.utils.parseUnits(valueofBST, 18).toString(),'**');

          try {
            const transcation = await BST_contract.approve_BeastToken(
              DEX_MAIN_ADDRESS,
              precision_tokenA
            );

            let data = await transcation.wait();

            console.log(data, "approve_BeastToken successfully");

            const transcation2 = await KGF_contract.approve_MonsterToken(
              DEX_MAIN_ADDRESS,
              precision_tokenB
            );

            let data2 = await transcation2.wait();

            console.log(data2, "approve_MonsterToken successfully");

            const transcation3 =
              await Decentralize_Exchange_Contract.addLiquidty_Pool(
                precision_tokenA,
                precision_tokenB
              );

            let data3 = await transcation3.wait();

            console.log("transcation completed", data3);

            alert("transcation completed");

            setValueofKGF("");

            setValueofBST("");

            loadvalues();
          } catch (error) {
            console.log(error);
            alert("transcation error");
          }
        } catch (error) {
          alert("CONTRACT_ADDRESS not set properly");
        }
      } else {
        alert("Please Install MetMask");
      }
    } else {
      alert("Zero balance Cannot Deposit");
    }
  }

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
        Add Liquidity
      </h3>

      <Template
        leftTop={"Input"}
        value={valueofBST}
        rightTop={"BST"}
        onChanges={(e) => onChangeAmountOfBST(e)}
        icon={"Icon"}
      />
      <div className="swapIcon">
        <MdAdd />
      </div>
      <Template
        leftTop={"Input"}
        value={valueofKGF}
        rightTop={"KGF"}
        onChanges={(e) => onChangeAmountOfKGF(e)}
        icon={"Icon"}
      />

      {/* need to work reusable */}

      <p style={{ fontSize: "20px" }}>Price And Pool Share</p>

      <div style={{}} className="bottomDesign">
        <div className="bottomDesignChilds">
          <p>{priceText[1]}</p>
          <p style={{}}>BST Per KGF</p>
        </div>

        <div className="bottomDesignChilds">
          <p style={{}}> {priceText[0]} </p>
          <p style={{}}>KGF Per BST</p>
        </div>

        <div className="bottomDesignChilds">
          <p style={{}}>{share_of_pool}</p>
          <p style={{}}>Share of Pool</p>
          {/* <a href="" onClick={()=> getBalance()}>Click Here</a> */}
        </div>
      </div>

      <div className="bottomDiv">
        <div className="btn" onClick={() => addLiquidtyProvide()}>
          Provide
        </div>
      </div>

      {/*  */}
    </div>
  );
}

export default LiquidityPoolProvide;
