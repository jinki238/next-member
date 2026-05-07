import { watchEmpSaga } from "@/features/emp/saga";
import { watchMemberSaga } from "@/features/member/saga";
import { all, fork } from "redux-saga/effects";


export function* rootSaga(){
    yield all([
        fork(watchMemberSaga),
    fork(watchEmpSaga)]);
}