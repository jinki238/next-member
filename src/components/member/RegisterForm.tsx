"use client"

import { registerMemberRequest, resetStatus } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './RegisterForm.module.css'; // ⭐ CSS Module 연결

const RegisterForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, success } = useSelector((state: RootState) => ({
        loading: state.member.createStatus.loading,
        error: state.member.createStatus.error,
        success: state.member.createStatus.success,
    }), shallowEqual);

    // 폼 상태 (비밀번호 확인 필드 추가됨)
    const [form, setForm] = useState({ id: "", pw: "", addr: "", tel: "" });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(registerMemberRequest(form));
    };

    useEffect(() => {
        if (success) {
            dispatch(resetStatus("createStatus"));
            router.push("/member");
        }
    }, [success, dispatch, router]);

    return (
        <div className={styles.formCard}>
            <h2 className={styles.formTitle}>회원가입</h2>

            <form onSubmit={onSubmit} className={styles.formBody}>
                {/* 아이디 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>아이디 <span className={styles.required}>*</span></label>
                    <div className={styles.inputWithButton}>
                        <input name="id" placeholder="아이디를 입력해주세요" onChange={onChange} value={form.id} className={styles.mainInput} />
                        <button type="button" className={styles.subButton}>중복확인</button>
                    </div>
                </div>

                {/* 비밀번호 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>비밀번호</label>
                    <input name="pw" type="password" placeholder="비밀번호를 입력해주세요" onChange={onChange} value={form.pw} className={styles.mainInput} />
                </div>

                {/* 비밀번호 확인 (디자인용 추가) */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>비밀번호 확인</label>
                    <input type="password" placeholder="비밀번호를 한 번 더 입력해주세요" className={styles.mainInput} />
                </div>

                {/* 전화번호 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>전화번호</label>
                    <input name="tel" placeholder="-없이 입력해주세요" onChange={onChange} value={form.tel} className={styles.mainInput} />
                </div>

                {/* 주소 */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>주소</label>
                    <div className={styles.inputWithButton}>
                        <input name="addr" placeholder="주소를 입력해주세요" onChange={onChange} value={form.addr} className={styles.mainInput} />
                        <button type="button" className={styles.subButton}>주소검색</button>
                    </div>
                    <input placeholder="상세주소를 입력해주세요" className={`${styles.mainInput} ${styles.addressDetail}`} />
                </div>

                {/* 하단 버튼 및 상태 메시지 */}
                <div className={styles.submitArea}>
                    { loading && <span className={styles.loadingText}>등록 중...</span>}
                    { error && <span className={styles.errorText}>{error}</span>}
                    <button type="submit" className={styles.mainButton} disabled={loading}>
                        가입하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;