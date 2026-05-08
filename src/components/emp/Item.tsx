"use client"

import { deleteEmpRequest, resetStatus } from "@/features/emp/slice";
import { Emp } from "@/features/emp/types";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './Emp.module.css';

// 🎨 사원 아이콘용 파스텔 톤 색상
const ICON_COLORS = [
    '#f59e0b', // 따뜻한 주황
    '#ed4b9e', // 귀여운 핑크
    '#3b82f6', // 시원한 파랑
    '#10b981', // 차분한 초록
    '#a855f7', // 신비로운 보라
];

// 🐭 사원 아이콘 컴포넌트 (CuteUserIcon과 동일)
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

    // 🎲 사원 번호(empno)를 기반으로 고정된 랜덤 색상 배정
    const iconColor = useMemo(() => {
        // empno는 숫자이므로 문자열로 변환 후 해시 생성
        const hash = String(emp.empno).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = hash % ICON_COLORS.length;
        return ICON_COLORS[colorIndex];
    }, [emp.empno]);

    return (
        <div className={styles.itemRow}>
            {/* 왼쪽 영역: 사원 정보 (아이콘 + 번호/이름) */}
            <div className={styles.empInfo}>
                <div className={styles.avatar}>
                    <EmpIcon color={iconColor} />
                </div>
                {/* 사원번호와 이름을 같이 보여주면 더 명확합니다 */}
                <span className={styles.empId}>
                    {emp.empno} <small style={{ color: '#999', marginLeft: '4px' }}>({emp.ename})</small>
                </span>
            </div>
            
            {/* 오른쪽 영역: 관리 (버튼 + 더보기 아이콘) */}
            <div className={styles.actionArea}>
                <div className={styles.btnWrapper}>
                    <Link href={`/emp/${emp.empno}`}>
                        <button className={styles.btnDetail}>상세보기</button>
                    </Link>
                </div>
                {/* 점 세개 아이콘 (삭제 등을 연결하고 싶을 때 사용) */}
                <span className={styles.moreIcon} onClick={onDelete}>⋮</span>
            </div>
        </div>
    );
};

export default Item;