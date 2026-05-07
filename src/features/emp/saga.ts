import { all, call, put, takeLatest } from "redux-saga/effects";


import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../member/types";
import { Emp } from "./types";
import { deleteEmpAPI, fetchEmpAPI, fetchEmpDetailAPI, registerEmpAPI, updateEmpAPI } from "./api";
import { deleteEmpFailure, deleteEmpRequest, deleteEmpSuccess, fetchEmpDetailFailure, fetchEmpDetailRequest, fetchEmpDetailSuccess, fetchEmpDetailSuccess, fetchEmpFailure, fetchEmpRequest, fetchEmpSuccess, registerEmpFailure, registerEmpFailure, registerEmpRequest, registerEmpSuccess, registerEmpSuccess, updateEmpFailure, updateEmpFailure, updateEmpRequest, updateEmpSuccess, updateEmpSuccess } from "./slice";


// 공통 에러 처리
function getErrorMessage(e: unknown, defaultMsg: string) {
  if (axios.isAxiosError(e))
    return e.response?.data?.message || defaultMsg;

  return (e as any)?.message || defaultMsg;
}
function* fetchEmpSaga(){
    console.log("🔥 saga 진입");
    try{
        console.log("📡 API 호출 직전");
    const response:AxiosResponse<ApiResponse<Emp[]>>=yield call(fetchEmpAPI);
    console.log("✅ API 응답:", response);
    yield put(fetchEmpSuccess(response.data.data));
    console.log("📦 store에 넣기:", response.data.data);
    }catch(e){
    yield put(fetchEmpFailure(getErrorMessage(e, "사원 목록 로딩 실패")));
    }
}
function* fetchEmpDetailSaga(action: PayloadAction<string>){
    try{
    const response:AxiosResponse<ApiResponse<Emp>>=yield call(fetchEmpDetailAPI,action.payload);
    yield put(fetchEmpDetailSuccess(response.data.data));
    }catch(e){
    yield put(fetchEmpDetailFailure(getErrorMessage(e, "사원 상세 로딩 실패")));
    }
}
function* registerEmpSaga(action: PayloadAction<Emp>){
    try{
    yield call(registerEmpAPI,action.payload);
    yield put(registerEmpSuccess());
    }catch(e){
    yield put(registerEmpFailure(getErrorMessage(e, "사원 등록 실패")));
    }
}
function* updateEmpSaga(action: PayloadAction<{ id: string; data: Emp }>){
    try{
    const { id, data } = action.payload;
    yield call(updateEmpAPI,id,data);
    yield put(updateEmpSuccess());
    }catch(e){
    yield put(updateEmpFailure(getErrorMessage(e, "사원 수정 실패")));
    }
}
function* deleteEmpSaga(action: PayloadAction<string>){
    try{
    yield call(deleteEmpAPI,action.payload);
    yield put(deleteEmpSuccess());

    // ⭐ 삭제 후 바로 목록 다시 조회
    yield put(fetchEmpRequest());

    }catch(e){
    yield put(deleteEmpFailure(getErrorMessage(e, "사원 삭제 실패")));
    }
}
export function* watchEmpSaga(){
    yield all( [
      takeLatest( fetchEmpRequest.type, fetchEmpSaga),
      takeLatest( fetchEmpDetailRequest.type, fetchEmpDetailSaga),
      takeLatest( registerEmpRequest.type, registerEmpSaga),
      takeLatest( updateEmpRequest.type, updateEmpSaga),
      takeLatest( deleteEmpRequest.type, deleteEmpSaga),
    ]);
}