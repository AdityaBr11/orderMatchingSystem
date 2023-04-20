import { GET_COMPLETED_REQ, GET_PENDING_FAIL, GET_PENDING_REQ, GET_PENDING_SUCC, POST_PENDING_FAIL, POST_PENDING_REQ, POST_PENDING_SUCC } from "./actionType"
import axios from "axios";

export const getPending=()=>async (dispatch)=>{
    try {
        dispatch({type:GET_PENDING_REQ});

        const {data}=await axios.get("https://localhost:8080/pending");
        console.log(data,"pending dataaa")
        dispatch({type:GET_PENDING_SUCC,payload:data.Item})
    } catch (error) {
        dispatch({type:GET_PENDING_FAIL,payload:error.response.data.msg})
    }
}

export const getCompleted=()=>async (dispatch)=>{
    try {
        dispatch({type:GET_COMPLETED_REQ});

        const {data}=await axios.get("https://localhost:8080/complete");
        console.log(data,"completed dataaa")
        dispatch({type:GET_PENDING_SUCC,payload:data.Item})
    } catch (error) {
        dispatch({type:GET_PENDING_FAIL,payload:error.response.data.msg})
    }
}
  
export const postPending=(data)=>async (dispatch)=>{
    try {
        dispatch({type:POST_PENDING_REQ});

        const {data}=await axios.post("https://localhost:8080/pending/add",data);
        dispatch({type:POST_PENDING_SUCC,payload:data.msg})
    } catch (error) {
        dispatch({type:POST_PENDING_FAIL,payload:error.response.data.msg})
    }
}