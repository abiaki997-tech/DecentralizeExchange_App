let REACT_APP_PORT=9099;
let precision = 1*(10 ** 18);
// only number
// const pattern = /^[0-9]$/;
const pattern = /^[0-9]*[.]?[0-9]{0,6}$/;


// export const RE = /^[0-9]*[.]?[0-9]{0,6}$/;


export {precision,pattern};