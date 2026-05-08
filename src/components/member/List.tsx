"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { fetchMemberRequest } from '@/features/member/slice';
import styles from './Member.module.css';
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
        <div className={styles.card}>
            <h2 className={styles.title}>회원관리</h2>

            {/* 검색창 영역 */}
            <div className={styles.searchWrapper}>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="아이디 검색" className={styles.searchInput} />
                </div>
                <button className={styles.searchButton}>검색</button>
            </div>

            {/* 표 헤더 */}
            <div className={styles.listHeader}>
                <div>아이디</div>
                <div>관리</div>
            </div>

            <div className={styles.listBody}>
                { loading && <p className="text-center py-4">로딩중...</p> }
                { !loading && list?.map(m => (<Item key={m.id} member={m} />)) }
            </div>
            
            {/* 페이지네이션 디자인 (선택) */}
            <div className="flex justify-center gap-2 mt-6">
                <button className="p-2 border rounded">{"<"}</button>
                <button className="p-2 border rounded bg-gray-100">1</button>
                <button className="p-2 border rounded">{">"}</button>
            </div>
        </div>
    );
};

export default List;