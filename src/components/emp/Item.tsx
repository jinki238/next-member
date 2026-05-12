"use client"

import { deleteEmpRequest, resetStatus } from "@/features/emp/slice";
import { Emp } from "@/features/emp/types";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './Emp.module.css';

const ICON_COLORS = ['#f59e0b', '#ed4b9e', '#3b82f6', '#10b981', '#a855f7'];
const EmpIcon = ({ color }: { color: string }) => (
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
const Item = ({ emp }: { emp: Emp }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { deleteStatus } = useSelector((state: RootState) => ({
        deleteStatus: state.emp.deleteStatus
    }), shallowEqual);
    const router = useRouter();
    const onDelete = () => {
        if (confirm("정말 삭제할까요?")) {
            dispatch(deleteEmpRequest(emp.empno));
        }
    };
    useEffect(() => {
        if (deleteStatus.success) {
            dispatch(resetStatus("deleteStatus"));
            router.push("/emp");
        }
    }, [deleteStatus.success, dispatch, router]);
    // 아이콘 컬러 고정
    const iconColor = useMemo(() => {
        const hash = String(emp.empno)
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return ICON_COLORS[hash % ICON_COLORS.length];
    }, [emp.empno]);
    return (
        <div className={styles.itemRow}>
            {/* 사원번호 영역 */}
            <div className={styles.empIdSection}>
                <div className={styles.avatar}>
                    <EmpIcon color={iconColor} />
                </div>
                <span className={styles.empNoText}>
                    {emp.empno}
                </span>
            </div>
            {/* 사원명 영역 */}
            <div className={styles.empNameSection}>
                <span className={styles.empNameText}>
                    {emp.ename}
                </span>
            </div>
            {/* 관리 버튼 영역 */}
            <div className={styles.actionArea}>
                <div className={styles.btnWrapper}>
                    <Link href={`/emp/${emp.empno}`}>
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