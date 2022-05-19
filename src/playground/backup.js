import React from "react";
import { ethers, Signer, utils } from "ethers";
// import { MdAdd } from "react-icons/md";


import "../style.css";
import Template from "./template";
import {BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS} from '../CONSTANTS';
import Beast_ABI from '../artifacts/contracts/beast_token.sol/Beast_Token.json';
import KGF_ABI from '../artifacts/contracts/monster_token.sol/Monster_Token.json';
import {handleConnectWallet} from '../helpers/connect_wallet'

function User() {
  let [valueofBST, setValueofBST] = React.useState("");
  let [valueofKGF, setValueofKGF] = React.useState("");
  let [kgfcontract,setkgfcontract]=React.useState(null);
  let [bstcontract,setbstcontract]=React.useState(null);
  let [signeraddress,setsigneraddress]=React.useState();


  const onChangeAmountOfBST = (e) => {
    console.log(e.target.value, "bst");
    setValueofBST(e.target.value);
  };
  const onChangeAmountOfKGF = (e) => {
    console.log(e.target.value, "kgf");
    setValueofKGF(e.target.value);
  };


  async function mint_Token(){

    if(valueofBST > 0 && valueofKGF > 0){

      if(handleConnectWallet()){

        // if(wins)
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
  
        const contractUser = await signer.getAddress();
        
        setsigneraddress(contractUser);
  
        // below conditions why stored signer/user contract address
  
        // https://docs.ethers.io/v5/api/signer/
  
        // const signer = provider.getSigner(); // user
        // const contractUser = await signer.getAddress();
        // setUser(contractUser);
        // const contractUserBalance = await provider.getBalance(contractUser);
        // setUserBalance(ethers.utils.formatEther(contractUserBalance));
  
        try {
          const BST_contract = new ethers.Contract(BEAST_TOKEN_ADDRESS, Beast_ABI.abi, signer);
          const KGF_contract = new ethers.Contract(KGF_TOKEN_ADDRESS, KGF_ABI.abi, signer);
  
          setkgfcontract(KGF_contract);
          setbstcontract(BST_contract);

      
          const transcation = await BST_contract.addTokens_Beast(valueofBST);

          const transcation2 = await KGF_contract.addTokens_Monster(valueofKGF);

          let data = await transcation.wait()
          let data2 = await transcation2.wait()

          console.log('transcation completed')

          alert('transcation completed');

          setValueofKGF('')
          setValueofBST('')
  

        } catch (error) {

          alert("CONTRACT_ADDRESS not set properly");

        }
  
  
      }else{
        alert("Please Install MetMask")
      }
    }else{
      alert("Zero balance Cannot Deposit")
    }
    
  }

  async function getBalanceUserEther(){

    if(handleConnectWallet()){


        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
  
        const contractUser = await signer.getAddress();

        const contractUserBalance = await provider.getBalance(contractUser);

        console.log(contractUser,'signer addresss')

        console.log(ethers.utils.formatEther(contractUserBalance));
        // setUserBalance(ethers.utils.formatEther(contractUserBalance));

    }else{

      alert("Please Install MetMask")

    }
  }

  async function getBalance() {

    if (typeof window.ethereum !== 'undefined') {
  
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log(account,BEAST_TOKEN_ADDRESS)
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const BST_contract = new ethers.Contract(BEAST_TOKEN_ADDRESS, Beast_ABI.abi, provider);

      const transcation = await BST_contract.checkbalance_BeastToken(account);

      let ethBalance = ethers.utils.formatEther(transcation)

      console.log(ethBalance,'ethbalance')

      // let data = await transcation.wait()
      console.log("Balance: ", transcation.toString());
    }
  }

 

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
          <p style={{ color: "white", margin: "10px", fontSize: "12px" }} onClick={()=> getBalanceUserEther()}>
            Your Share Details
          </p>
        </div>
      </div>
      <div className="bottomDiv">
        <div className="btn" onClick={() => mint_Token()}>
          Provide
        </div>
      </div>

      {/*  */}
    </div>
  );
}

export default User;
