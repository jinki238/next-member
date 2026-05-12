"use client"

import { fetchMemberDetailRequest, resetStatus, updateMemberRequest } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from './Member.module.css'; // Detail과 동일한 CSS 사용

// 🎨 Detail과 동일한 컬러 및 아이콘 구성
const ICON_COLORS = ['#f59e0b', '#ed4b9e', '#3b82f6', '#10b981', '#a855f7'];

const CuteUserIcon = ({ color }: { color: string }) => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" />
    </svg>
);

const UpdateForm = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [form, setForm] = useState({ id: "", pw: "", addr: "", tel: "" });

    // Redux 상태 가져오기
    const { updateStatus, detail, fetchLoading } = useSelector((state: RootState) => ({
        detail: state.member.detail,
        updateStatus: state.member.updateStatus,
        fetchLoading: state.member.detailStatus.loading
    }), shallowEqual);

    // 초기 데이터 로딩
    useEffect(() => {
        if (!id) return;
        dispatch(fetchMemberDetailRequest(id));
    }, [id, dispatch]);

    // 로드된 데이터를 폼에 반영
    useEffect(() => {
        if (detail) {
            setForm({
                id: detail.id || "",
                pw: detail.pw || "",
                addr: detail.addr || "",
                tel: detail.tel || ""
            });
        }
    }, [detail]);

    // 수정 성공 시 처리
    useEffect(() => {
        if (updateStatus.success) {
            dispatch(resetStatus("updateStatus"));
            router.push(`/member/${id}`); // 수정 후 상세보기로 이동
        }
    }, [updateStatus.success, dispatch, router, id]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (id) {
            dispatch(updateMemberRequest({ id, data: form }));
        }
    };

    // 아이디별 고정 컬러 (Detail과 동일 로직)
    const iconColor = useMemo(() => {
        if (!id) return '#3b82f6';
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return ICON_COLORS[hash % ICON_COLORS.length];
    }, [id]);

    if (fetchLoading) return <div className={styles.detailContainer}><p>데이터 로딩 중...</p></div>;

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailCard}>
                
                {/* 상단 프로필 - Detail 디자인 유지 */}
                <div className={styles.detailProfile}>
                    <div className={styles.detailAvatar}>
                        <CuteUserIcon color={iconColor} />
                    </div>
                    <div>
                        <h2 className={styles.detailName}>{id} 수정하기</h2>
                        <p className={styles.detailSubText}>회원 정보를 수정해주세요</p>
                    </div>
                </div>

                {/* 입력 폼 영역 */}
                <form onSubmit={onSubmit}>
                    <div className={styles.detailInfoGroup}>
                        
                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>아이디</p>
                            <input 
                                className={styles.detailValue} 
                                name="id" 
                                value={form.id} 
                                disabled 
                                style={{ border: 'none', backgroundColor: '#f9fafb', width: '100%', outline: 'none' }}
                            />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>비밀번호</p>
                            <input 
                                className={styles.detailValue} 
                                name="pw" 
                                type="password"
                                placeholder="새 비밀번호 입력"
                                onChange={onChange} 
                                value={form.pw}
                                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px' }}
                            />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>주소</p>
                            <input 
                                className={styles.detailValue} 
                                name="addr" 
                                placeholder="주소 입력"
                                onChange={onChange} 
                                value={form.addr} 
                                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px' }}
                            />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>전화번호</p>
                            <input 
                                className={styles.detailValue} 
                                name="tel" 
                                placeholder="전화번호 입력"
                                onChange={onChange} 
                                value={form.tel} 
                                style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px' }}
                            />
                        </div>

                    </div>

                    {/* 하단 버튼 영역 */}
                    <div className={styles.detailBtnArea}>
                        <button type="submit" className={styles.detailPrimaryBtn} disabled={updateStatus.loading}>
                            {updateStatus.loading ? "저장 중..." : "저장하기"}
                        </button>
                        
                        <Link href={`/member/${id}`}>
                            <button type="button" className={styles.detailSecondaryBtn}>
                                취소
                            </button>
                        </Link>
                    </div>

                    {updateStatus.error && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
                            {updateStatus.error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;