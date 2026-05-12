"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Item from './Item';

import {
    fetchMemberRequest
} from '@/features/member/slice';

import styles from './Member.module.css';

const List = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {
        loading,
        error,
        list
    } = useSelector((state: RootState) => ({
        loading: state.member.listStatus.loading,
        error: state.member.listStatus.error,
        list: state.member.list
    }), shallowEqual);

    useEffect(() => {

        dispatch(fetchMemberRequest());

    }, [dispatch]);

    return (

        <div className={styles.fullContainer}>

            {/* 제목 */}
            <h2 className={styles.title}>
                회원관리
            </h2>

            {/* 검색 영역 */}
            <div className={styles.searchWrapper}>

                <div className={styles.inputGroup}>

                    <input
                        type="text"
                        placeholder="아이디 검색"
                        className={styles.searchInput}
                    />

                </div>

                <button className={styles.searchButton}>
                    검색
                </button>

            </div>

            {/* 헤더 */}
            <div className={styles.listHeader}>

                <div className={styles.headerMemberInfo}>
                    아이디
                </div>

                <div className={styles.headerAction}>
                    관리
                </div>

            </div>

            {/* 리스트 */}
            <div className={styles.listBody}>

                {loading && (

                    <p className={styles.messageText}>
                        데이터를 불러오는 중입니다...
                    </p>

                )}

                {error && (

                    <p
                        className={styles.messageText}
                        style={{ color: '#ef4444' }}
                    >
                        {error}
                    </p>

                )}

                {!loading && list?.map(member => (

                    <Item
                        key={member.id}
                        member={member}
                    />

                ))}

            </div>

            {/* 페이지네이션 */}
            <div className={styles.paginationArea}>

                <button className={styles.paginationBtn}>
                    {"<"}
                </button>

                <button
                    className={`${styles.paginationBtn} ${styles.activePageBtn}`}
                >
                    1
                </button>

                <button className={styles.paginationBtn}>
                    {">"}
                </button>

            </div>

        </div>

    );

};

export default List;