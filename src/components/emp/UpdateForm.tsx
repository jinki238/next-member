"use client"

import { fetchEmpDetailRequest, resetStatus, updateEmpRequest } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from './Emp.module.css';

const ICON_COLORS = ['#f59e0b', '#ed4b9e', '#3b82f6', '#10b981', '#a855f7'];

const CuteEmpIcon = ({ color }: { color: string }) => (
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
        empno: "",
        ename: "",
        job: "",
        mgr: "",
        sal: "",
        hiredate: "",
        comm: "",
        deptno: ""
    });

    // Redux 상태 가져오기
    const { updateStatus, detail, fetchLoading } = useSelector((state: RootState) => ({
        detail: state.emp.detail,
        updateStatus: state.emp.updateStatus,
        fetchLoading: state.emp.detailStatus.loading
    }), shallowEqual);

    // 상세 데이터 조회
    useEffect(() => {

        if (!empno) return;

        dispatch(fetchEmpDetailRequest(empno));

    }, [empno, dispatch]);

    // 조회된 데이터를 form에 반영
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

    // 수정 성공 시 상세페이지 이동
    useEffect(() => {

        if (updateStatus.success) {

            dispatch(resetStatus("updateStatus"));

            router.push(`/emp/${empno}`);

        }

    }, [updateStatus.success, dispatch, router, empno]);

    // 입력값 변경
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // 수정 요청
    const onSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        if (empno) {

            dispatch(updateEmpRequest({
                empno,
                data: form
            }));

        }

    };

    // 사원번호 기반 아이콘 컬러
    const iconColor = useMemo(() => {

        if (!empno) return '#3b82f6';

        const hash = empno
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        return ICON_COLORS[hash % ICON_COLORS.length];

    }, [empno]);

    if (fetchLoading) {

        return (
            <div className={styles.detailContainer}>
                <p>사원 정보 로딩 중...</p>
            </div>
        );

    }

    return (

        <div className={styles.detailContainer}>

            <div className={styles.detailCard}>

                {/* 상단 프로필 영역 */}
                <div className={styles.detailProfile}>

                    <div className={styles.detailAvatar}>
                        <CuteEmpIcon color={iconColor} />
                    </div>

                    <div>
                        <h2 className={styles.detailName}>
                            {form.ename || "사원"} 수정하기
                        </h2>

                        <p className={styles.detailSubText}>
                            사원 정보를 수정해주세요
                        </p>
                    </div>

                </div>

                {/* 입력 폼 */}
                <form onSubmit={onSubmit}>

                    <div className={styles.detailInfoGroup}>

                        {/* 사원번호 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>사원번호</p>

                            <input
                                className={styles.detailValue}
                                name="empno"
                                value={form.empno}
                                disabled
                                style={{
                                    border: 'none',
                                    backgroundColor: '#f9fafb',
                                    width: '100%',
                                    outline: 'none'
                                }}
                            />

                        </div>

                        {/* 사원이름 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>사원이름</p>

                            <input
                                className={styles.detailValue}
                                name="ename"
                                placeholder="사원 이름 입력"
                                onChange={onChange}
                                value={form.ename}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 직책 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>직책</p>

                            <input
                                className={styles.detailValue}
                                name="job"
                                placeholder="직책 입력"
                                onChange={onChange}
                                value={form.job}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 급여 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>급여</p>

                            <input
                                className={styles.detailValue}
                                name="sal"
                                type="number"
                                placeholder="급여 입력"
                                onChange={onChange}
                                value={form.sal}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 상여금 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>상여금</p>

                            <input
                                className={styles.detailValue}
                                name="comm"
                                type="number"
                                placeholder="상여금 입력"
                                onChange={onChange}
                                value={form.comm}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 입사일 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>입사일</p>

                            <input
                                className={styles.detailValue}
                                name="hiredate"
                                type="date"
                                onChange={onChange}
                                value={form.hiredate}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 부서번호 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>부서번호</p>

                            <input
                                className={styles.detailValue}
                                name="deptno"
                                placeholder="부서번호 입력"
                                onChange={onChange}
                                value={form.deptno}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                        {/* 상사번호 */}
                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>상사 사번</p>

                            <input
                                className={styles.detailValue}
                                name="mgr"
                                placeholder="상사 사번 입력"
                                onChange={onChange}
                                value={form.mgr}
                                style={{
                                    width: '100%',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '4px 8px'
                                }}
                            />

                        </div>

                    </div>

                    {/* 버튼 영역 */}
                    <div className={styles.detailBtnArea}>

                        <button
                            type="submit"
                            className={styles.detailPrimaryBtn}
                            disabled={updateStatus.loading}
                        >
                            {updateStatus.loading ? "저장 중..." : "저장하기"}
                        </button>

                        <Link href={`/emp/${empno}`}>

                            <button
                                type="button"
                                className={styles.detailSecondaryBtn}
                            >
                                취소
                            </button>

                        </Link>

                    </div>

                    {/* 에러 메시지 */}
                    {updateStatus.error && (

                        <p
                            style={{
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                marginTop: '1rem',
                                textAlign: 'center'
                            }}
                        >
                            {updateStatus.error}
                        </p>

                    )}

                </form>

            </div>

        </div>

    );

};

export default UpdateForm;