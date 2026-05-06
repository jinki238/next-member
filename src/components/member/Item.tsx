"use client"

import { deleteMemberRequest, resetStatus } from "@/features/member/slice";
import { Member } from "@/features/member/types";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

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

    // 🔥 삭제 성공하면 이동
    useEffect(() => {
        if (deleteStatus.success) {
            dispatch(resetStatus("deleteStatus"));
            router.push("/member");
        }
    }, [deleteStatus.success]);

    return (
        <div>
        {member.id} &nbsp;&nbsp;&nbsp;
        <Link href={`/member/${member.id}`}>
        <button>상세보기</button>
        </Link>
        <Link href={`/member/${member.id}/edit`}>
        <button>수정</button>
        </Link>
        <button onClick={onDelete}>삭제</button>
        </div>
    );
};

export default Item;