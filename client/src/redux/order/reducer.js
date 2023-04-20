import {
  GET_COMPLETED_FAIL,
  GET_COMPLETED_REQ,
  GET_COMPLETED_SUCC,
  GET_PENDING_FAIL,
  GET_PENDING_REQ,
  GET_PENDING_SUCC,
  POST_PENDING_FAIL,
  POST_PENDING_REQ,
  POST_PENDING_SUCC,
} from "./actionType";

export const OrderReducer = (state = { items: [], msg: "" }, action) => {
  switch (action.type) {
    case GET_PENDING_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_PENDING_SUCC:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case GET_PENDING_FAIL:
      return {
        ...state,
        msg: action.payload,
      };

    case POST_PENDING_REQ:
      return {
        ...state,
        postloading: true,
      };
    case POST_PENDING_SUCC:
      return {
        ...state,
        postloading: false,
        msg: action.payload,
      };
    case POST_PENDING_FAIL:
      return {
        ...state,
        msg: action.payload,
      };

    case GET_COMPLETED_REQ:
      return {
        ...state,
        isloading: true,
      };
    case GET_COMPLETED_SUCC:
      return {
        ...state,
        isloading: false,
        items: action.payload,
      };
    case GET_COMPLETED_FAIL:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};
