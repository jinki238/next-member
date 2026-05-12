"use client"

import {
    deleteMemberRequest,
    resetStatus
} from "@/features/member/slice";

import { Member } from "@/features/member/types";

import {
    AppDispatch,
    RootState
} from "@/store/store";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
    useEffect,
    useMemo
} from "react";

import {
    shallowEqual,
    useDispatch,
    useSelector
} from "react-redux";

import styles from './Member.module.css';

const ICON_COLORS = [
    '#f59e0b',
    '#ed4b9e',
    '#3b82f6',
    '#10b981',
    '#a855f7'
];

const MemberIcon = ({ color }: { color: string }) => (

    <svg
        width="24"
        height="24"
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

const Item = ({ member }: { member: Member }) => {

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const { deleteStatus } = useSelector((state: RootState) => ({
        deleteStatus: state.member.deleteStatus
    }), shallowEqual);

    // 삭제
    const onDelete = () => {

        if (confirm("정말 삭제할까요?")) {

            dispatch(deleteMemberRequest(member.id));

        }

    };

    // 삭제 성공
    useEffect(() => {

        if (deleteStatus.success) {

            dispatch(resetStatus("deleteStatus"));

            router.push("/member");

        }

    }, [deleteStatus.success, dispatch, router]);

    // 아이콘 컬러
    const iconColor = useMemo(() => {

        const hash = member.id
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);

        return ICON_COLORS[hash % ICON_COLORS.length];

    }, [member.id]);

    return (

        <div className={styles.itemRow}>

            {/* 아이디 영역 */}
            <div className={styles.memberIdSection}>

                <div className={styles.avatar}>
                    <MemberIcon color={iconColor} />
                </div>

                <span className={styles.memberIdText}>
                    {member.id}
                </span>

            </div>

            {/* 버튼 영역 */}
            <div className={styles.actionArea}>

                <div className={styles.btnWrapper}>

                    <Link href={`/member/${member.id}`}>

                        <button className={styles.btnDetail}>
                            상세보기
                        </button>

                    </Link>

                    <button
                        className={styles.btnDelete}
                        onClick={onDelete}
                    >
                        삭제
                    </button>

                </div>

                <span
                    className={styles.moreIcon}
                    onClick={onDelete}
                >
                    ⋮
                </span>

            </div>

        </div>

    );

};

export default Item;