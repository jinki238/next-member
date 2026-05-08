"use client"

import { fetchMemberDetailRequest } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Detail = () => {
    const { id } = useParams<{id:string}>();
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,detail}=useSelector((state:RootState)=>({
        loading:state.member.detailStatus.loading,
        error:state.member.detailStatus.error,
        detail:state.member.detail
    }),shallowEqual);

    useEffect(()=>{
        if (!id) return; 
        dispatch(fetchMemberDetailRequest(id));
    },[id]);
    return (
        <div>
            { loading && <p>로딩중...</p> }
            { error && <p>{error}</p> }
            { !loading && 
                <div>
                ID : {detail?.id}<br/>
                PW : {detail?.pw}<br/>
                ADDR : {detail?.addr}<br/>
                TEL : {detail?.tel}<br/>
                <Link href={`/member/${detail?.id}/edit`}>
                <button>수정</button>
                </Link>
                </div>
            }           
        </div>
    );
};

export default Detail;