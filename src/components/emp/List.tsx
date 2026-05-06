"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { fetchMemberRequest } from '@/features/member/slice';

const List = () => {
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,list}=useSelector((state:RootState)=>({
        loading:state.member.listStatus.loading,
        error:state.member.listStatus.error,
        list:state.member.list
    }),shallowEqual);
    useEffect(()=>{
        console.log("dispatch 실행됨");
        dispatch(fetchMemberRequest())
    },[dispatch]);
    return (
        <div>
            { loading && <p>로딩중...</p> }
            { error && <p>{error}</p> }
            { !loading && 
                <div>
                {list?.map(m => (<Item key={m.id} member={m} />) )}
                </div>
            }
        </div>
    );
};

export default List;