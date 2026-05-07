import { all, call, put, takeLatest } from "redux-saga/effects";
import { deleteMemberFailure, deleteMemberRequest, deleteMemberSuccess, 
    fetchMemberDetailFailure, fetchMemberDetailRequest, fetchMemberDetailSuccess,
     fetchMemberFailure, fetchMemberRequest, fetchMemberSuccess, 
     registerMemberFailure, registerMemberRequest, registerMemberSuccess, 
     updateMemberFailure, updateMemberRequest, updateMemberSuccess } from "./slice";
import { ApiResponse, deleteMemberAPI, fetchMemberAPI, fetchMemberDetailAPI, registerMemberAPI, updateMemberAPI } from "./api";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { Member } from "./types";

// 공통 에러 처리
function getErrorMessage(e: unknown, defaultMsg: string) {
  if (axios.isAxiosError(e))
    return e.response?.data?.message || defaultMsg;

  return (e as any)?.message || defaultMsg;
}
function* fetchMemberSaga(){
    console.log("🔥 saga 진입");
    try{
        console.log("📡 API 호출 직전");
    const response:AxiosResponse<ApiResponse<Member[]>>=yield call(fetchMemberAPI);
    console.log("✅ API 응답:", response);
    yield put(fetchMemberSuccess(response.data.data));
    console.log("📦 store에 넣기:", response.data.data);
    }catch(e){
    yield put(fetchMemberFailure(getErrorMessage(e, "회원 목록 로딩 실패")));
    }
}
function* fetchMemberDetailSaga(action: PayloadAction<string>){
    try{
    const response:AxiosResponse<ApiResponse<Member>>=yield call(fetchMemberDetailAPI,action.payload);
    yield put(fetchMemberDetailSuccess(response.data.data));
    }catch(e){
    yield put(fetchMemberDetailFailure(getErrorMessage(e, "회원 상세 로딩 실패")));
    }
}
function* registerMemberSaga(action: PayloadAction<Member>){
    try{
    yield call(registerMemberAPI,action.payload);
    yield put(registerMemberSuccess());
    }catch(e){
    yield put(registerMemberFailure(getErrorMessage(e, "회원 가입 실패")));
    }
}
function* updateMemberSaga(action: PayloadAction<{ id: string; data: Member }>){
    try{
    const { id, data } = action.payload;
    yield call(updateMemberAPI,id,data);
    yield put(updateMemberSuccess());
    }catch(e){
    yield put(updateMemberFailure(getErrorMessage(e, "회원 수정 실패")));
    }
}
function* deleteMemberSaga(action: PayloadAction<string>){
    try{
    yield call(deleteMemberAPI,action.payload);
    yield put(deleteMemberSuccess());

    // ⭐ 삭제 후 바로 목록 다시 조회
    yield put(fetchMemberRequest());

    }catch(e){
    yield put(deleteMemberFailure(getErrorMessage(e, "회원 삭제 실패")));
    }
}
export function* watchMemberSaga(){
    yield all( [
      takeLatest( fetchMemberRequest.type, fetchMemberSaga),
      takeLatest( fetchMemberDetailRequest.type, fetchMemberDetailSaga),
      takeLatest( registerMemberRequest.type, registerMemberSaga),
      takeLatest( updateMemberRequest.type, updateMemberSaga),
      takeLatest( deleteMemberRequest.type, deleteMemberSaga),
    ]);
}