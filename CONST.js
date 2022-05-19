let REACT_APP_PORT=9099;
let BEAST_TOKEN_ADDRESS="0x647684EeB2f891eE5df9ea91537C2901ce9A6ad1";
let KGF_TOKEN_ADDRESS="0x3C5A18302FEa96d4E70E2fF6eb77f14CC3230C9c";
let DEX_MAIN_ADDRESS="0x11fd4aF84AA57891D4477984450c2F7471fCe892";

let precision = 1*(10 ** 18);

// only number
// const pattern = /^[0-9]$/;
const pattern = /^[0-9]*[.]?[0-9]{0,6}$/;


// export const RE = /^[0-9]*[.]?[0-9]{0,6}$/;


// export {REACT_APP_PORT,BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS,precision,pattern};

module.exports={BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS,precision,DEX_MAIN_ADDRESS}