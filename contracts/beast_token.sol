// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7.0 < 0.9.0;



import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
// import "./mock_ethprice.sol";

contract Beast_Token is ERC20 {


    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}


	


	function addTokens_Beast(uint _tokens) public {
		_mint(msg.sender, _tokens * (10 ** 18));
	}
	
	function approve_BeastToken(address to,uint tokens)public returns (bool value){
		return approve(to,tokens);
	}
	
	function transfer_BeastToken(address from,address to, uint amount) public returns (bool value){
		return transferFrom(from,to,amount);
	}

	function transfer_to_BeastToken( address to, uint amount) public returns (bool value){
		return transfer(to,amount);
	}

	function checkbalance_BeastToken(address  owner) public view returns(uint value) {
		return balanceOf(owner);
	}

  


}