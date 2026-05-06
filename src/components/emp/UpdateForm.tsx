"use client"

import { fetchMemberDetailRequest, resetStatus, updateMemberRequest } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const UpdateForm = () => {
    const { id } = useParams<{id:string}>();
    const dispatch=useDispatch<AppDispatch>();
    const router = useRouter();

    const [form, setForm] = useState({ id: "", pw: "", addr: "", tel: "" });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(updateMemberRequest({ id, data: form }));
    };

    const {updateStatus,detail}=useSelector((state:RootState)=>({
        detail:state.member.detail,
        updateStatus:state.member.updateStatus,
    }),shallowEqual);

    useEffect(()=>{
        if(updateStatus.success){
            dispatch(resetStatus("updateStatus"));
            router.push("/member"); 
        }
    },[updateStatus.success]);

    useEffect(()=>{
        if (!id) return; 
        dispatch(fetchMemberDetailRequest(id));
    },[id]);

    useEffect(() => {
        if (detail) setForm(detail);
    }, [detail]);

    return (
        <div>
    <form onSubmit={onSubmit}>
      ID : <input name="id" placeholder="아이디" onChange={onChange} value={form.id} disabled />
      <br />
      PW : <input name="pw" placeholder="비밀번호" onChange={onChange} value={form.pw} />
      <br />
      ADDR : <input name="addr" placeholder="주소" onChange={onChange} value={form.addr} />
      <br />
      TEL : <input name="tel" placeholder="전화번호" onChange={onChange} value={form.tel} />
      <br />
      <button type="submit">수정하기</button>
        { updateStatus.loading && <p>수정 중...</p>}
        { updateStatus.error && <p>{updateStatus.error}</p>}
    </form>
        </div>
    );
};

export default UpdateForm;