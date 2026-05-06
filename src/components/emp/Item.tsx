"use client"

import { deleteEmpRequest, resetStatus } from "@/features/emp/slice";
import { Emp } from "@/features/emp/types";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Item = ({emp}:{emp:Emp}) => {
    const dispatch=useDispatch<AppDispatch>();
    const {deleteStatus}=useSelector((state:RootState)=>({
        deleteStatus:state.emp.deleteStatus
    }),shallowEqual);
    const router=useRouter();
    const onDelete = () => {
        if (confirm("정말 삭제할까요?")) {
            dispatch(deleteEmpRequest(emp.empno));
        }
    };

    // 🔥 삭제 성공하면 이동
    useEffect(() => {
        if (deleteStatus.success) {
            dispatch(resetStatus("deleteStatus"));
            router.push("/emp");
        }
    }, [deleteStatus.success]);

    return (
        <div>
        {emp.empno} &nbsp;&nbsp;&nbsp; {emp.ename}
        <Link href={`/emp/${emp.empno}`}>
        <button>상세보기</button>
        </Link>
        <Link href={`/emp/${emp.empno}/edit`}>
        <button>수정</button>
        </Link>
        <button onClick={onDelete}>삭제</button>
        </div>
    );
};

export default Item;