"use client"

import { fetchMemberDetailRequest } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './Member.module.css';

// 🎨 목록과 동일한 컬러
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

    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>();

    const { loading, error, detail } = useSelector((state: RootState) => ({
        loading: state.member.detailStatus.loading,
        error: state.member.detailStatus.error,
        detail: state.member.detail
    }), shallowEqual);

    useEffect(() => {
        if (!id) return;
        dispatch(fetchMemberDetailRequest(id));
    }, [id]);

    // 🎲 아이디별 고정 컬러
    const iconColor = useMemo(() => {

        if (!detail?.id) return '#3b82f6';

        const hash = detail.id
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        return ICON_COLORS[hash % ICON_COLORS.length];

    }, [detail?.id]);

    return (
        <div className={styles.detailContainer}>

            {loading && (
                <p>로딩중...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && detail && (

                <div className={styles.detailCard}>

                    {/* 상단 프로필 */}
                    <div className={styles.detailProfile}>

                        <div className={styles.detailAvatar}>
                            <CuteUserIcon color={iconColor} />
                        </div>

                        <div>
                            <h2 className={styles.detailName}>
                                {detail.id}
                            </h2>

                            <p className={styles.detailSubText}>
                                회원 상세 정보
                            </p>
                        </div>

                    </div>

                    {/* 정보 영역 */}
                    <div className={styles.detailInfoGroup}>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>아이디</p>
                            <div className={styles.detailValue}>
                                {detail.id}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>비밀번호</p>
                            <div className={styles.detailValue}>
                                {detail.pw}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>주소</p>
                            <div className={styles.detailValue}>
                                {detail.addr}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>전화번호</p>
                            <div className={styles.detailValue}>
                                {detail.tel}
                            </div>
                        </div>

                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.detailBtnArea}>

                        <Link href={`/member/${detail.id}/edit`}>
                            <button className={styles.detailPrimaryBtn}>
                                수정하기
                            </button>
                        </Link>

                        <Link href="/member">
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