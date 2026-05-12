"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { fetchEmpRequest } from '@/features/emp/slice';
import styles from './Emp.module.css';

const List = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, list } = useSelector((state: RootState) => ({
        loading: state.emp.listStatus.loading,
        error: state.emp.listStatus.error,
        list: state.emp.list
    }), shallowEqual);
    useEffect(() => {
        dispatch(fetchEmpRequest());
    }, [dispatch]);
    return (
        <div className={styles.fullContainer}>
            <h2 className={styles.title}>사원관리</h2>
            {/* 검색 영역 */}
            <div className={styles.searchWrapper}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="사원 번호 또는 이름 검색"
                        className={styles.searchInput}
                    />
                </div>
                <button className={styles.searchButton}>
                    검색
                </button>
            </div>
            {/* 헤더 */}
            <div className={styles.listHeader}>
                <div className={styles.headerEmpInfo}>
                    사원번호
                </div>
                <div className={styles.headerEmpName}>
                    사원명
                </div>
                <div className={styles.headerAction}>
                    관리
                </div>
            </div>
            {/* 리스트 */}
            <div className={styles.listBody}>
                {loading && (
                    <p style={{ textAlign: 'center', padding: '40px 0' }}>
                        사원 목록을 불러오는 중입니다...
                    </p>
                )}
                {error && (
                    <p style={{
                        color: 'red',
                        textAlign: 'center',
                        padding: '40px 0'
                    }}>
                        {error}
                    </p>
                )}
                {!loading && list?.map(em => (
                    <Item key={em.empno} emp={em} />
                ))}
            </div>
            {/* 페이지네이션 */}
            <div className={styles.paginationArea}>
                <button style={paginationBtnStyle}>
                    {"<"}
                </button>
                <button
                    style={{
                        ...paginationBtnStyle,
                        backgroundColor: '#f3f4f6'
                    }}
                >
                    1
                </button>
                <button style={paginationBtnStyle}>
                    {">"}
                </button>
            </div>
        </div>
    );
};
const paginationBtnStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer'
};

export default List;