// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 < 0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./beast_token.sol";
import "./monster_token.sol";
import "hardhat/console.sol";


contract Decentralize_Exchange
// is Beast_Token, Monster_Token
{

    Beast_Token t1;
    Monster_Token t2;


    uint price_Precision = 1 * (10 ** 18);

    uint K;
    uint Token_A_Balance;
    uint Token_B_Balance;
    // uint Each_Token_A_Value =  1 ;
    uint Each_Token_A_Value =  1 * price_Precision;
    // uint Each_Token_B_Value =  1 ;
    uint Each_Token_B_Value =  1 * price_Precision;

    uint256 totalvalue;




    // detail of each liquidity providers
    struct ProvidersDetails {
        uint value;
        uint token_A_Balance;
        uint token_B_Balance;
        uint tradingfee;
    }


    mapping(address => ProvidersDetails) public liquidityProvider;

    constructor(address tokenA,address tokenB){
            t1 = Beast_Token(tokenA);
            t2 = Monster_Token(tokenB);
    }




    // Restricts withdraw, swap feature till liquidity is added to the pool
    modifier activePool() {
        require(Token_A_Balance > 0, "Zero Liquidity");
        require(Token_B_Balance > 0,"Zero Liquidity");
        _;
    }

    function bind_t1_contract(address contractadress) public {
        t1 = Beast_Token(contractadress);
    }

    function bind_t2_contract(address contractadress) public {
        t2 = Monster_Token(contractadress);
    }
    //  addLiquidty_Pool - function
    function addLiquidty_Pool(uint token_A, uint token_B) public {


        // check enough balance have

        if (getbalanceTokenA(msg.sender) <= token_A && getbalanceTokenB(msg.sender) <= token_B) {
            revert("not enough balance");
        }

        // 1st time only set token value , is not good not set her
        // if(Each_Token_A_Value == 0 && Each_Token_B_Value == 0 ){
        //     Each_Token_A_Value = 1 * price_Precision;
        //     Each_Token_B_Value = 1 * price_Precision;
        // }

        // value 50:50
        uint tokenA_Value = Each_Token_A_Value * token_A;
        uint tokenB_Value = Each_Token_B_Value * token_B;

        // console.log(tokenA_Value,tokenB_Value)

        if (tokenA_Value != tokenB_Value) {
            revert("Not Equal Value");
        }

        Token_A_Balance += token_A;
        Token_B_Balance += token_B;

        uint k_cons = Token_A_Balance * Token_B_Balance;

        K = k_cons;

        // totalvalue = (Each_Token_A_Value/1 * price_Precision) * Token_A_Balance + (Each_Token_B_Value/1 * price_Precision) * Token_B_Balance;


        ProvidersDetails storage t = liquidityProvider[msg.sender];

        t.value =  tokenA_Value + tokenB_Value;
        t.token_A_Balance = t.token_A_Balance + token_A;
        t.token_B_Balance = t.token_B_Balance + token_B;
        t.tradingfee = 0;

        // subtract providers account value
        // step:1 approve(to,valu)  
        // step:2 transferfrom(from,to,value) 
        deductedTokenA(msg.sender, address(this), token_A);
        deductedTokenB(msg.sender, address(this), token_B);


    }
    //  addLiquidty_Pool - helper function
    function getbalanceTokenA(address owner) private view returns(uint value) {

        console.log(t1.checkbalance_BeastToken(owner));

        return t1.checkbalance_BeastToken(owner);
    }

    //  addLiquidty_Pool - helper function
    function getbalanceTokenB(address owner) private view returns(uint value) {

        console.log(t1.checkbalance_BeastToken(owner));

        return t2.checkbalance_MonsterToken(owner);
    }
    //  addLiquidty_Pool - helper function
    function deductedTokenA(address from, address to, uint tokenA) private returns(bool value) {
        return t1.transfer_BeastToken(from, to, tokenA);
    }
    //  addLiquidty_Pool - helper function
    function deductedTokenB(address from, address to, uint tokenB) private returns(bool value) {
        return t2.transfer_MonsterToken(from, to, tokenB);
    }

    //  function getDetailsDex() public pure returns(
    // uint K,
    // uint Token_A_Balance,
    // uint Token_B_Balance,
    // uint Each_Token_A_Value = 1,
    // uint Each_Token_B_Value = 1,
    // uint256 totalvalue,) {
    // 	return ();
    // }


    function getPoolDetails() external view returns(uint256 TokenA_Balance, uint256 TokenB_Balance, uint256 total_value, uint256 CONSTANT, uint Each_TokenA_Value, uint Each_TokenB_Value) {
        return (Token_A_Balance, Token_B_Balance, totalvalue, K, Each_Token_A_Value, Each_Token_B_Value);
    }

    //swap

    function estimate_tokenA(uint tokenB) view activePool public returns(uint new_TokenB, uint new_TokenA, uint given_TokenA, uint price_TokenA, uint price_TokenB) {

        // if(token )
        // CONDTIONS APPLY 
        //  estimate pseudocode
        //  * x=token a,y= token b,k=x*y
        //  if given x and take y
        //  * x=old_x + new x
        //  * y=k/new x
        //  * given y = old y - new y
        //  * price x = old_x/new x
        //  * price y= old y/new y

        // console.log(Token_A_Balance,new_TokenA,Token_B_Balance,new_TokenB,"**");

        // console.log(Token_A_Balance,new_TokenA,"data");

        new_TokenB = Token_B_Balance + tokenB;
        new_TokenA = K / new_TokenB;
        given_TokenA = Token_A_Balance - new_TokenA;
        price_TokenA = (Token_A_Balance * price_Precision) / new_TokenA;
        price_TokenB = (Token_B_Balance * price_Precision) / new_TokenB;

        return (
            new_TokenB, new_TokenA, given_TokenA, price_TokenA, price_TokenB
        );
    }

    function estimate_tokenB(uint tokenA) view activePool public returns(uint new_TokenB, uint new_TokenA, uint given_TokenB, uint price_TokenA, uint price_TokenB) {

        new_TokenA = Token_A_Balance + tokenA;
        new_TokenB = K / new_TokenA;
        given_TokenB = Token_B_Balance - new_TokenB;
        price_TokenA = (Token_A_Balance * price_Precision) / new_TokenA;
        price_TokenB = (Token_B_Balance * price_Precision) / new_TokenB;

        return (
            new_TokenB, new_TokenA, given_TokenB, price_TokenA, price_TokenB
        );
    }

    // ESTIMATE NO NEED TO CHECK CONDITIONS
    // SWAP CHECK AMOUNT TOKEN HAVE USER BALANCE CHECK
    // POOL CHECK AMOUNT TOKENS HAVE
    // pool stablity after calculation have 

    function swapTokenA(uint tokenB) activePool public returns(uint given_TokenA) {

        // token B user have enough balance check
  
        require(getbalanceTokenB(msg.sender) > tokenB, "not enough balance");

        uint new_TokenB = Token_B_Balance + tokenB;
        uint new_TokenA = K / new_TokenB;

        require(Token_A_Balance > new_TokenA, "Not Enough Tokens A have");

        given_TokenA = Token_A_Balance - new_TokenA;

        uint price_TokenA = (Token_A_Balance * price_Precision) / new_TokenA;

        uint price_TokenB = (Token_B_Balance * price_Precision) / new_TokenB;

        // atleast one token have
        if(new_TokenB <= 1_000_000 || new_TokenA <= 1_000_000){
           revert("Pool Stablity Collapse");
        }
        // require(Token_A_Balance > 1000000 && Each_Token_B_Value > 1000000 ,"Pool Stablity Collapse");

        // require((Each_Token_A_Value * Token_A_Balance) == (Each_Token_B_Value * Token_B_Balance), "Pool Stablity Collapse");


        Token_A_Balance = new_TokenA;
        Token_B_Balance = new_TokenB;
        Each_Token_A_Value = price_TokenA;
        Each_Token_B_Value = price_TokenB;
        // totalvalue = (Each_Token_A_Value/1 * price_Precision) * Token_A_Balance + (Each_Token_B_Value/1 * price_Precision) * Token_B_Balance;


    //    Transfer from used
         
         // send to contract
        // t1.approve_MonsterToken(address(this),tokenB); -- front end
        // t2.transfer_MonsterToken(msg.sender,address(this),tokenB);

        // send to user
        // t1.approve_BeastToken(msg.sender,given_TokenA); -- front end
        // t1.transfer_BeastToken(address(this),msg.sender,given_TokenA);

         //  Transfer 
        // send to user
        t1.transfer_to_BeastToken(msg.sender,given_TokenA); //--existing
        // send to contract
        t2.transfer_to_MonsterToken(address(this),tokenB); // -- not worked (true but owner token be not deducted,but reciver recive tokens)



        return given_TokenA;

    }

    function swapTokenB(uint tokenA) activePool public returns(uint given_TokenB) {

        // token B user have enough balance check
        require(getbalanceTokenA(msg.sender) > tokenA, "not enough balance");

        uint new_TokenA = Token_A_Balance + tokenA;
        uint new_TokenB = K / new_TokenA;


        require(Token_B_Balance > new_TokenB, "Not Enough Tokens A have");

        given_TokenB = Token_B_Balance - new_TokenB;
        uint price_TokenA = (Token_A_Balance * price_Precision) / new_TokenA;
        uint price_TokenB = (Token_B_Balance * price_Precision) / new_TokenB;



        // atleast one token have
        if(new_TokenB <= 1_000_000 || new_TokenA <= 1_000_000){
           revert("Pool Stablity Collapse");
        }

        // require((Each_Token_A_Value * Token_A_Balance) == (Each_Token_B_Value * Token_B_Balance), "Pool Stablity Collapse");


        Token_A_Balance = new_TokenA;
        Token_B_Balance = new_TokenB;
        Each_Token_A_Value = price_TokenA;
        Each_Token_B_Value = price_TokenB;
        // totalvalue = (Each_Token_A_Value/1 * price_Precision) * Token_A_Balance + (Each_Token_B_Value/1 * price_Precision) * Token_B_Balance;

 
        // send to contract
        // t1.approve_BeastToken(address(this),tokenA); -- front end
        // t1.transfer_BeastToken(msg.sender,address(this),tokenA);

        // send to user
        // t2.approve_MonsterToken(msg.sender,given_TokenB);
        // t2.transfer_MonsterToken(address(this),msg.sender,given_TokenB);

        // send to user
        // worked fine
        t2.transfer_to_MonsterToken(msg.sender,given_TokenB); 

        // sent to contract
        // -- not worked (transfer:true,--owner token be not deducted,but reciver recive tokens)
        t1.transfer_to_BeastToken(address(this),tokenA);

        //  emit Approval(msg.sender,address(this),tokenA);
        return given_TokenB;

    }
}