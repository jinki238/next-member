"use client"

import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Item from './Item'; // 사원용 EmpItem 컴포넌트
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
        console.log("사원 목록 dispatch 실행됨");
        dispatch(fetchEmpRequest());
    }, [dispatch]);

    return (
        <div className={styles.fullContainer}>
            <h2 className={styles.title}>사원관리</h2>

            {/* 검색창 영역 */}
            <div className={styles.searchWrapper}>
                <div className={styles.inputGroup}>
                    <input 
                        type="text" 
                        placeholder="사원 번호 또는 이름 검색" 
                        className={styles.searchInput} 
                    />
                </div>
                <button className={styles.searchButton}>검색</button>
            </div>

            {/* 표 헤더 */}
            <div className={styles.listHeader}>
                <div>사원정보</div>
                <div>관리</div>
            </div>

            {/* 리스트 본문 */}
            <div className={styles.listBody}>
                { loading && <p className="text-center py-10" style={{ textAlign: 'center', padding: '40px 0' }}>데이터를 불러오는 중입니다...</p> }
                { error && <p className="text-center py-10" style={{ color: 'red', textAlign: 'center' }}>{error}</p> }
                
                { !loading && list?.map(em => (
                    <Item key={em.empno} emp={em} />
                ))}
            </div>
            
            {/* 페이지네이션 디자인 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                <button style={paginationBtnStyle}>{"<"}</button>
                <button style={{ ...paginationBtnStyle, backgroundColor: '#f3f4f6' }}>1</button>
                <button style={paginationBtnStyle}>{">"}</button>
            </div>
        </div>
    );
};

// 인라인 스타일 (필요시 CSS 파일로 이동 가능)
const paginationBtnStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer'
};

export default List;