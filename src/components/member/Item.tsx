"use client"

import { deleteMemberRequest, resetStatus } from "@/features/member/slice";
import { Member } from "@/features/member/types";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from './Member.module.css';

// 🎨 귀여운 파스텔 톤의 아이콘 색상 배열
const ICON_COLORS = [
    '#f59e0b', // 따뜻한 주황
    '#ed4b9e', // 귀여운 핑크
    '#3b82f6', // 시원한 파랑
    '#10b981', // 차분한 초록
    '#a855f7', // 신비로운 보라
];

// 🐭 귀여운 느낌을 주는 SVG 사용자 아이콘 컴포넌트
const CuteUserIcon = ({ color }: { color: string }) => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color}  // ⭐ 이 부분에 랜덤 색상이 입혀집니다.
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        {/* 귀여운 동그란 머리 */}
        <circle cx="12" cy="7" r="4" />
        {/* 부드러운 곡선 어깨 */}
        <path d="M5.5 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" />
    </svg>
);

const Item = ({member}:{member:Member}) => {
    const dispatch=useDispatch<AppDispatch>();
    const {deleteStatus}=useSelector((state:RootState)=>({
        deleteStatus:state.member.deleteStatus
    }),shallowEqual);
    const router=useRouter();
    
    const onDelete = () => {
        if (confirm("정말 삭제할까요?")) {
            dispatch(deleteMemberRequest(member.id));
        }
    };

    useEffect(() => {
        if (deleteStatus.success) {
            dispatch(resetStatus("deleteStatus"));
            router.push("/member");
        }
    }, [deleteStatus.success]);

    // 🎲 아이디마다 고정된 랜덤 색상을 배정하는 로직
    const iconColor = useMemo(() => {
        // 아이디 문자열의 길이 값을 활용해 인덱스 생성
        // (같은 아이디는 항상 같은 색을 유지)
        const hash = member.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = hash % ICON_COLORS.length;
        return ICON_COLORS[colorIndex];
    }, [member.id]);

    return (
        <div className={styles.itemRow}>
            {/* 왼쪽 영역: 아이디 */}
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <CuteUserIcon color={iconColor} />
                </div>
                <span className={styles.userId}>{member.id}</span>
            </div>
            
            {/* 오른쪽 영역: 관리 (버튼 + 점 세개) */}
            <div className={styles.actionArea}>
                {/* 버튼만 중앙에 오도록 감싸줌 */}
                <div className={styles.btnWrapper}>
                    <Link href={`/member/${member.id}`}>
                        <button className={styles.btnDetail}>상세보기</button>
                    </Link>
                    <button className={styles.btnDetail} onClick={onDelete}>삭제</button>
                </div>
                {/* 점 세개는 absolute로 맨 오른쪽에 배치될 예정 */}
                <span className={styles.moreIcon} >⋮</span>
            </div>
        </div>
    );
};

export default Item;