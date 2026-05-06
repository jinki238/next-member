import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member, MemberState, Status } from "./types";

const initialStatus:Status={ loading:false,error:null,success:false };

const initialState:MemberState={
    list:[],detail:null,

    listStatus:{...initialStatus},
    detailStatus:{...initialStatus},
    createStatus:{...initialStatus},
    updateStatus:{...initialStatus},
    deleteStatus:{...initialStatus},
};
const memberSlice=createSlice({
    name:"member",
    initialState,
    reducers:{
        // 전체조회
        fetchMemberRequest:(state)=>{
            state.listStatus={...initialStatus,loading:true};
        },
        fetchMemberSuccess:(state,action:PayloadAction<Member[]>)=>{
            state.listStatus={...initialStatus,loading:false};
            state.list=action.payload;
        },
        fetchMemberFailure:(state,action:PayloadAction<string>)=>{
            state.listStatus={...initialStatus,loading:false,error:action.payload};
        },

        // 상세조회
        fetchMemberDetailRequest:(state,action:PayloadAction<string>)=>{
            state.detailStatus={...initialStatus,loading:true};
            state.detail = null;
        },
        fetchMemberDetailSuccess:(state,action:PayloadAction<Member>)=>{
            state.detailStatus={...initialStatus,loading:false};
            state.detail=action.payload;
        },
        fetchMemberDetailFailure:(state,action:PayloadAction<string>)=>{
            state.detailStatus={...initialStatus,loading:false,error:action.payload};
        },

        // 등록
        registerMemberRequest:(state,action:PayloadAction<Member>)=>{
            state.createStatus={...initialStatus,loading:true};
        },
        registerMemberSuccess:(state)=>{
            state.createStatus={...initialStatus,loading:false,success:true};
        },
        registerMemberFailure:(state,action:PayloadAction<string>)=>{
            state.createStatus={...initialStatus,loading:false,error:action.payload};
        },   
        
        // 수정
        updateMemberRequest:(state, action: PayloadAction<{ id: string; data: Member }>)=>{
            state.updateStatus={...initialStatus,loading:true};
        },
        updateMemberSuccess:(state)=>{
            state.updateStatus={...initialStatus,loading:false,success: true};
        },
        updateMemberFailure:(state,action:PayloadAction<string>)=>{
            state.updateStatus={...initialStatus,loading:false,error:action.payload};
        }, 
        
        // 삭제
        deleteMemberRequest:(state,action:PayloadAction<string>)=>{
            state.deleteStatus={...initialStatus,loading:true};
        },
        deleteMemberSuccess:(state)=>{
            state.deleteStatus={...initialStatus,loading:false,success: true};
        },
        deleteMemberFailure:(state,action:PayloadAction<string>)=>{
            state.deleteStatus={...initialStatus,loading:false,error:action.payload};
        }, 

        resetStatus: (state, action: PayloadAction<keyof MemberState>) => {
            const key = action.payload;

            if (key.endsWith("Status")) {
                (state[key] as Status) = { loading: false, error: null, success: false };
            }
        }
    }
});

export const {
    fetchMemberRequest,fetchMemberSuccess,fetchMemberFailure,
    fetchMemberDetailRequest,fetchMemberDetailSuccess,fetchMemberDetailFailure,
    registerMemberRequest,registerMemberSuccess,registerMemberFailure,
    updateMemberRequest,updateMemberSuccess,updateMemberFailure,
    deleteMemberRequest,deleteMemberSuccess,deleteMemberFailure,
    resetStatus
}=memberSlice.actions;
export default memberSlice.reducer;