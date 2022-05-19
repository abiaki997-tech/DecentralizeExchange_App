async function connect() {

    let res = await connectToMetamask();

    if (res === true) {

        provider = new ethers.providers.Web3Provider(window.ethereum);

        signer = provider.getSigner();

        add = await signer.getAddress();

        setAddress(add);

        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            setMyContract(contract);
        } catch (err) {
            alert("CONTRACT_ADDRESS not set properly");
        }
    } else {
            alert("Couldn't connect to Metamask");
    }
}



async function handleConnectWallet() {

    try {

      let accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('accounts are connected',accounts)
      return true
      
    } catch (error) {

      console.log("error");
      console.error(error);
      return false

    }
  
}


export {handleConnectWallet}