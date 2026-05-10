"use client"

import { fetchEmpDetailRequest, resetStatus, updateEmpRequest } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from './Emp.module.css'; // Member와 동일한 스타일 구조의 CSS 사용

const ICON_COLORS = ['#f59e0b', '#ed4b9e', '#3b82f6', '#10b981', '#a855f7'];

const CuteEmpIcon = ({ color }: { color: string }) => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const UpdateForm = () => {
    const { empno } = useParams<{ empno: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [form, setForm] = useState({
        empno: "", ename: "", job: "", mgr: "",
        sal: "", hiredate: "", comm: "", deptno: ""
    });

    const { updateStatus, detail, fetchLoading } = useSelector((state: RootState) => ({
        detail: state.emp.detail,
        updateStatus: state.emp.updateStatus,
        fetchLoading: state.emp.detailStatus?.loading // slice 구조에 따라 detailStatus 또는 loading 확인
    }), shallowEqual);

    // 상세 데이터 불러오기
    useEffect(() => {
        if (!empno) return;
        dispatch(fetchEmpDetailRequest(empno));
    }, [empno, dispatch]);

    // 불러온 데이터 폼에 세팅
    useEffect(() => {
        if (detail) {
            setForm({
                empno: String(detail.empno || ""),
                ename: detail.ename || "",
                job: detail.job || "",
                mgr: String(detail.mgr ?? ""),
                sal: String(detail.sal || ""),
                hiredate: detail.hiredate || "",
                comm: String(detail.comm ?? ""),
                deptno: String(detail.deptno || "")
            });
        }
    }, [detail]);

    // 수정 완료 후 이동
    useEffect(() => {
        if (updateStatus.success) {
            dispatch(resetStatus("updateStatus"));
            router.push(`/emp/${empno}`); 
        }
    }, [updateStatus.success, dispatch, router, empno]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateEmpRequest({ empno, data: form }));
    };

    // 사원번호 기반 고유 컬러
    const iconColor = useMemo(() => {
        if (!empno) return '#64748b';
        const hash = empno.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return ICON_COLORS[hash % ICON_COLORS.length];
    }, [empno]);

    if (fetchLoading) return <div className={styles.detailContainer}><p>사원 정보 로딩 중...</p></div>;

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailCard}>
                
                {/* 상단 프로필 헤더 */}
                <div className={styles.detailProfile}>
                    <div className={styles.detailAvatar}>
                        <CuteEmpIcon color={iconColor} />
                    </div>
                    <div>
                        <h2 className={styles.detailName}>{form.ename || '사원'} 수정</h2>
                        <p className={styles.detailSubText}>사원 번호: {empno}</p>
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className={styles.detailInfoGroup}>
                        
                        {/* 1열: 사원명 / 직책 */}
                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>사원이름</p>
                            <input className={styles.editInput} name="ename" onChange={onChange} value={form.ename} />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>직책</p>
                            <input className={styles.editInput} name="job" onChange={onChange} value={form.job} />
                        </div>

                        {/* 2열: 급여 / 상여금 */}
                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>급여</p>
                            <input className={styles.editInput} name="sal" type="number" onChange={onChange} value={form.sal} />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>상여금</p>
                            <input className={styles.editInput} name="comm" type="number" onChange={onChange} value={form.comm} />
                        </div>

                        {/* 3열: 입사일 / 부서번호 */}
                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>입사일</p>
                            <input className={styles.editInput} name="hiredate" type="date" onChange={onChange} value={form.hiredate} />
                        </div>

                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>부서번호</p>
                            <input className={styles.editInput} name="deptno" onChange={onChange} value={form.deptno} />
                        </div>

                        {/* 4열: 상사번호 (전체 너비 사용 가능) */}
                        <div className={styles.detailItem}>
                            <p className={styles.detailLabel}>상사 사번</p>
                            <input className={styles.editInput} name="mgr" onChange={onChange} value={form.mgr} />
                        </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.detailBtnArea}>
                        <button type="submit" className={styles.detailPrimaryBtn} disabled={updateStatus.loading}>
                            {updateStatus.loading ? "저장 중..." : "정보 수정"}
                        </button>
                        
                        <Link href={`/emp/${empno}`}>
                            <button type="button" className={styles.detailSecondaryBtn}>
                                취소
                            </button>
                        </Link>
                    </div>

                    {updateStatus.error && (
                        <p className={styles.errorText}>{updateStatus.error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;