import { watchMemberSaga } from "@/features/member/saga";
import { all, fork } from "redux-saga/effects";

export function* rootSaga(){
    yield all([
        fork(watchMemberSaga)]);
}