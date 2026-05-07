import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Emp, EmpState, Status } from "./types";

const initialStatus:Status={ loading:false,error:null,success:false };

const initialState:EmpState={
    list:[],detail:null,

    listStatus:{...initialStatus},
    detailStatus:{...initialStatus},
    createStatus:{...initialStatus},
    updateStatus:{...initialStatus},
    deleteStatus:{...initialStatus},
};
const empSlice=createSlice({
    name:"emp",
    initialState,
    reducers:{
        // 전체조회
        fetchEmpRequest:(state)=>{
            state.listStatus={...initialStatus,loading:true};
        },
        fetchEmpSuccess:(state,action:PayloadAction<Emp[]>)=>{
            state.listStatus={...initialStatus,loading:false};
            state.list=action.payload;
        },
        fetchEmpFailure:(state,action:PayloadAction<string>)=>{
            state.listStatus={...initialStatus,loading:false,error:action.payload};
        },

        // 상세조회
        fetchEmpDetailRequest:(state,action:PayloadAction<string>)=>{
            state.detailStatus={...initialStatus,loading:true};
            state.detail = null;
        },
        fetchEmpDetailSuccess:(state,action:PayloadAction<Emp>)=>{
            state.detailStatus={...initialStatus,loading:false};
            state.detail=action.payload;
        },
        fetchEmpDetailFailure:(state,action:PayloadAction<string>)=>{
            state.detailStatus={...initialStatus,loading:false,error:action.payload};
        },

        // 등록
        registerEmpRequest:(state,action:PayloadAction<Emp>)=>{
            state.createStatus={...initialStatus,loading:true};
        },
        registerEmpSuccess:(state)=>{
            state.createStatus={...initialStatus,loading:false,success:true};
        },
        registerEmpFailure:(state,action:PayloadAction<string>)=>{
            state.createStatus={...initialStatus,loading:false,error:action.payload};
        },   
        
        // 수정
        updateEmpRequest:(state, action: PayloadAction<{ id: string; data: Emp }>)=>{
            state.updateStatus={...initialStatus,loading:true};
        },
        updateEmpSuccess:(state)=>{
            state.updateStatus={...initialStatus,loading:false,success: true};
        },
        updateEmpFailure:(state,action:PayloadAction<string>)=>{
            state.updateStatus={...initialStatus,loading:false,error:action.payload};
        }, 
        
        // 삭제
        deleteEmpRequest:(state,action:PayloadAction<string>)=>{
            state.deleteStatus={...initialStatus,loading:true};
        },
        deleteEmpSuccess:(state)=>{
            state.deleteStatus={...initialStatus,loading:false,success: true};
        },
        deleteEmpFailure:(state,action:PayloadAction<string>)=>{
            state.deleteStatus={...initialStatus,loading:false,error:action.payload};
        }, 

        resetStatus: (state, action: PayloadAction<keyof EmpState>) => {
            const key = action.payload;

            if (key.endsWith("Status")) {
                (state[key] as Status) = { loading: false, error: null, success: false };
            }
        }
    }
});

export const {
    fetchEmpRequest,fetchEmpSuccess,fetchEmpFailure,
    fetchEmpDetailRequest,fetchEmpDetailSuccess,fetchEmpDetailFailure,
    registerEmpRequest,registerEmpSuccess,registerEmpFailure,
    updateEmpRequest,updateEmpSuccess,updateEmpFailure,
    deleteEmpRequest,deleteEmpSuccess,deleteEmpFailure,
    resetStatus
}=empSlice.actions;
export default empSlice.reducer;