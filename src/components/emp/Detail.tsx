"use client"

import { fetchEmpDetailRequest } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './Emp.module.css';

// 🎨 아이콘 컬러
const ICON_COLORS = [
    '#f59e0b',
    '#ed4b9e',
    '#3b82f6',
    '#10b981',
    '#a855f7',
];

// 👤 사용자 아이콘
const CuteUserIcon = ({ color }: { color: string }) => (
    <svg
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" />
    </svg>
);

const Detail = () => {

    const { empno } = useParams<{ empno: string }>();

    const dispatch = useDispatch<AppDispatch>();

    const { loading, error, detail } = useSelector((state: RootState) => ({
        loading: state.emp.detailStatus.loading,
        error: state.emp.detailStatus.error,
        detail: state.emp.detail
    }), shallowEqual);

    useEffect(() => {
        if (!empno) return;

        dispatch(fetchEmpDetailRequest(empno));

    }, [empno]);

    // 🎲 사원번호 기반 색상 고정
    const iconColor = useMemo(() => {

        if (!detail?.empno) return '#3b82f6';

        const hash = String(detail.empno)
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        return ICON_COLORS[hash % ICON_COLORS.length];

    }, [detail?.empno]);

    return (
        <div className={styles.detailContainer}>

            {loading && <p>로딩중...</p>}

            {error && <p>{error}</p>}

            {!loading && detail && (

                <div className={styles.detailCard}>

                    {/* 상단 프로필 */}
                    <div className={styles.detailProfile}>

                        <div className={styles.detailAvatar}>
                            <CuteUserIcon color={iconColor} />
                        </div>

                        <div>
                            <h2 className={styles.detailName}>
                                {detail.ename}
                            </h2>

                            <p className={styles.detailSubText}>
                                사원 상세 정보
                            </p>
                        </div>

                    </div>

                    {/* 정보 영역 */}
                    <div className={styles.detailInfoGroup}>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>사원번호</p>

                            <div className={styles.detailValue}>
                                {detail.empno}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>사원명</p>

                            <div className={styles.detailValue}>
                                {detail.ename}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>직무</p>

                            <div className={styles.detailValue}>
                                {detail.job}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>매니저번호</p>

                            <div className={styles.detailValue}>
                                {detail.mgr}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>급여</p>

                            <div className={styles.detailValue}>
                                {detail.sal}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>입사일</p>

                            <div className={styles.detailValue}>
                                {detail.hiredate}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>커미션</p>

                            <div className={styles.detailValue}>
                                {detail.comm}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>부서번호</p>

                            <div className={styles.detailValue}>
                                {detail.deptno}
                            </div>
                        </div>

                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.detailBtnArea}>

                        <Link href={`/emp/${detail.empno}/edit`}>
                            <button className={styles.detailPrimaryBtn}>
                                수정하기
                            </button>
                        </Link>

                        <Link href="/emp">
                            <button className={styles.detailSecondaryBtn}>
                                목록가기
                            </button>
                        </Link>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Detail;