"use client"

import {
    fetchMemberDetailRequest,
    resetStatus,
    updateMemberRequest
} from "@/features/member/slice";

import { AppDispatch, RootState } from "@/store/store";

import { useParams, useRouter } from "next/navigation";

import {
    useEffect,
    useState,
    useMemo
} from "react";

import {
    shallowEqual,
    useDispatch,
    useSelector
} from "react-redux";

import Link from "next/link";

import styles from './Member.module.css';

/* =========================
   아이콘 컬러
========================= */

const ICON_COLORS = [
    '#f59e0b',
    '#ed4b9e',
    '#3b82f6',
    '#10b981',
    '#a855f7'
];

/* =========================
   회원 아이콘
========================= */

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

/* =========================
   수정 페이지
========================= */

const UpdateForm = () => {

    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    /* =========================
       form 상태
    ========================= */

    const [form, setForm] = useState({
        id: "",
        pw: "",
        addr: "",
        tel: ""
    });

    /* =========================
       Redux 상태
    ========================= */

    const {
        detail,
        updateStatus,
        fetchLoading
    } = useSelector((state: RootState) => ({

        detail: state.member.detail,

        updateStatus: state.member.updateStatus,

        fetchLoading: state.member.detailStatus.loading

    }), shallowEqual);

    /* =========================
       상세 조회
    ========================= */

    useEffect(() => {

        if (!id) return;

        dispatch(fetchMemberDetailRequest(id));

    }, [id, dispatch]);

    /* =========================
       form 데이터 반영
    ========================= */

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

    /* =========================
       수정 성공 처리
    ========================= */

    useEffect(() => {

        if (updateStatus.success) {

            dispatch(resetStatus("updateStatus"));

            router.push(`/member/${id}`);

        }

    }, [
        updateStatus.success,
        dispatch,
        router,
        id
    ]);

    /* =========================
       input 변경
    ========================= */

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    /* =========================
       수정 요청
    ========================= */

    const onSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (!id) return;

        dispatch(updateMemberRequest({
            id,
            data: form
        }));

    };

    /* =========================
       아이콘 색상 고정
    ========================= */

    const iconColor = useMemo(() => {

        if (!id) return '#3b82f6';

        const hash = id
            .split('')
            .reduce((acc, char) => {
                return acc + char.charCodeAt(0);
            }, 0);

        return ICON_COLORS[
            hash % ICON_COLORS.length
        ];

    }, [id]);

    /* =========================
       로딩 상태
    ========================= */

    if (fetchLoading) {

        return (

            <div className={styles.detailContainer}>

                <p>회원 정보를 불러오는 중...</p>

            </div>

        );

    }

    /* =========================
       화면
    ========================= */

    return (

        <div className={styles.detailContainer}>

            <div className={styles.detailCard}>

                {/* 상단 프로필 */}

                <div className={styles.detailProfile}>

                    <div className={styles.detailAvatar}>

                        <CuteUserIcon color={iconColor} />

                    </div>

                    <div>

                        <h2 className={styles.detailName}>

                            {form.id || "회원"} 수정하기

                        </h2>

                        <p className={styles.detailSubText}>

                            회원 정보를 수정해주세요

                        </p>

                    </div>

                </div>

                {/* 입력 폼 */}

                <form onSubmit={onSubmit}>

                    <div className={styles.detailInfoGroup}>

                        {/* 아이디 */}

                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>
                                아이디
                            </p>

                            <input
                                className={styles.detailInputDisabled}
                                name="id"
                                value={form.id}
                                disabled
                            />

                        </div>

                        {/* 비밀번호 */}

                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>
                                비밀번호
                            </p>

                            <input
                                className={styles.detailInput}
                                name="pw"
                                type="password"
                                placeholder="비밀번호 입력"
                                onChange={onChange}
                                value={form.pw}
                            />

                        </div>

                        {/* 주소 */}

                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>
                                주소
                            </p>

                            <input
                                className={styles.detailInput}
                                name="addr"
                                placeholder="주소 입력"
                                onChange={onChange}
                                value={form.addr}
                            />

                        </div>

                        {/* 전화번호 */}

                        <div className={styles.detailItem}>

                            <p className={styles.detailLabel}>
                                전화번호
                            </p>

                            <input
                                className={styles.detailInput}
                                name="tel"
                                placeholder="전화번호 입력"
                                onChange={onChange}
                                value={form.tel}
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
                            {
                                updateStatus.loading
                                    ? "저장 중..."
                                    : "저장하기"
                            }
                        </button>

                        <Link href={`/member/${id}`}>

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

                        <p className={styles.detailError}>

                            {updateStatus.error}

                        </p>

                    )}

                </form>

            </div>

        </div>

    );

};

export default UpdateForm;