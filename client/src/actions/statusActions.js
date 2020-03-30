import { GET_STATUS, CLEAR_STATUS } from './types';

//return status
export const returnState = (msg, status, id=null) => {
  return {
    type: GET_STATUS,
    payload: { msg, status, id}
  };
};

//cleart status 
export const clearStatus = () => {
  return {
    type: CLEAR_STATUS
  };
};
