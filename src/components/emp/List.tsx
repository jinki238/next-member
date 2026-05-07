"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { fetchEmpRequest } from '@/features/emp/slice';

const List = () => {
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,list}=useSelector((state:RootState)=>({
        loading:state.emp.listStatus.loading,
        error:state.emp.listStatus.error,
        list:state.emp.list
    }),shallowEqual);
    useEffect(()=>{
        console.log("dispatch 실행됨");
        dispatch(fetchEmpRequest())
    },[dispatch]);
    return (
        <div>
            { loading && <p>로딩중...</p> }
            { error && <p>{error}</p> }
            { !loading && 
                <div>
                {list?.map(em => (<Item key={em.empno} emp={em} />) )}
                </div>
            }
        </div>
    );
};

export default List;