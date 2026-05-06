"use client"

import { fetchEmpDetailRequest } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Detail = () => {
    const { id } = useParams<{id:string}>();
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,detail}=useSelector((state:RootState)=>({
        loading:state.emp.detailStatus.loading,
        error:state.emp.detailStatus.error,
        detail:state.emp.detail
    }),shallowEqual);

    useEffect(()=>{
        if (!id) return; 
        dispatch(fetchEmpDetailRequest(id));
    },[id]);
    return (
        <div>
            { loading && <p>로딩중...</p> }
            { error && <p>{error}</p> }
            { !loading && 
                <div>
                EMPNO : {detail?.empno}<br/>
                ENAME : {detail?.ename}<br/>
                JOB : {detail?.job}<br/>
                MGR : {detail?.mgr}<br/>
                SAL : {detail?.sal}<br/>
                HIREDATE : {detail?.hiredate}<br/>
                COMM : {detail?.comm}<br/>
                DEPTNO : {detail?.deptno}<br/>
                <Link href={`/emp/${detail?.empno}/edit`}>
                <button>수정</button>
                </Link>
                <button>삭제</button>
                </div>
            }           
        </div>
    );
};

export default Detail;