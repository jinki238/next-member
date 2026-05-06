import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "@/store/rootSaga";
import memberReducer from "../features/member/slice";

const sagaMiddleware=createSagaMiddleware();
export const store=configureStore({
    reducer:{member:memberReducer},
    middleware:
        getDefault=>getDefault({thunk:false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;