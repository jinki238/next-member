"use client"

import { registerEmpRequest, resetStatus } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './RegisterForm.module.css'; // ⭐ Member와 동일한 CSS Module 사용

const RegisterForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, success } = useSelector((state: RootState) => ({
        loading: state.emp.createStatus.loading,
        error: state.emp.createStatus.error,
        success: state.emp.createStatus.success,
    }), shallowEqual);
    // 사원 정보 폼 상태
    const [form, setForm] = useState({ 
        empno: "", ename: "", job: "", mgr: "",
        sal: "", hiredate: "", comm: "", deptno: ""
    });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(registerEmpRequest(form));
    };
    useEffect(() => {
        if (success) {
            dispatch(resetStatus("createStatus"));
            router.push("/emp");
        }
    }, [success, dispatch, router]);
    return (
        <div className={styles.formCard}>
            <h2 className={styles.formTitle}>사원 등록</h2>
            <form onSubmit={onSubmit} className={styles.formBody}>  
                {/* 사원번호 & 이름 (2단 구성 예시) */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>사원번호 <span className={styles.required}>*</span></label>
                    <div className={styles.inputWithButton}>
                        <input name="empno" placeholder="사원번호를 입력해주세요" onChange={onChange} value={form.empno} className={styles.mainInput} />
                        <button type="button" className={styles.subButton}>중복확인</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>사원이름 <span className={styles.required}>*</span></label>
                    <input name="ename" placeholder="이름을 입력해주세요" onChange={onChange} value={form.ename} className={styles.mainInput} />
                </div>
                {/* 직책 & 상사 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>직책 <span className={styles.required}>*</span></label>
                    <input name="job" placeholder="예: MANAGER, ANALYST" onChange={onChange} value={form.job} className={styles.mainInput} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>상사번호</label>
                    <input name="mgr" placeholder="상사의 사원번호" onChange={onChange} value={form.mgr} className={styles.mainInput} />
                </div>
                {/* 급여 & 상여금 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>급여 <span className={styles.required}>*</span></label>
                    <input name="sal" type="number" placeholder="숫자만 입력" onChange={onChange} value={form.sal} className={styles.mainInput} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>상여금</label>
                    <input name="comm" type="number" placeholder="상여금 입력" onChange={onChange} value={form.comm} className={styles.mainInput} />
                </div>
                {/* 입사일 & 부서번호 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>입사일 <span className={styles.required}>*</span></label>
                    <input name="hiredate" type="date" onChange={onChange} value={form.hiredate} className={styles.mainInput} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>부서번호 <span className={styles.required}>*</span></label>
                    <input name="deptno" placeholder="예: 10, 20, 30" onChange={onChange} value={form.deptno} className={styles.mainInput} />
                </div>
                {/* 하단 버튼 및 상태 메시지 */}
                <div className={styles.submitArea}>
                    { loading && <span className={styles.loadingText}>등록 중...</span>}
                    { error && <span className={styles.errorText}>{error}</span>}
                    <button type="submit" className={styles.mainButton} disabled={loading}>
                        사원 등록하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;