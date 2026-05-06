"use client"

import { registerMemberRequest, resetStatus } from "@/features/member/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
    const router = useRouter();
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,success}=useSelector((state:RootState)=>({
        loading:state.member.createStatus.loading,
        error:state.member.createStatus.error,
        success:state.member.createStatus.success,
    }),shallowEqual);

    const [form, setForm] = useState({ id: "", pw: "", addr: "", tel: "" });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(registerMemberRequest(form));
    };

    useEffect(()=>{
        if(success){
            dispatch(resetStatus("createStatus"));
             router.push("/member");
        }
    },[success]);

    return (
        <div>
    <form onSubmit={onSubmit}>
      <input name="id" placeholder="아이디" onChange={onChange} value={form.id} />
      <br />
      <input name="pw" placeholder="비밀번호" onChange={onChange} value={form.pw} />
      <br />
      <input name="addr" placeholder="주소" onChange={onChange} value={form.addr} />
      <br />
      <input name="tel" placeholder="전화번호" onChange={onChange} value={form.tel} />
      <br />
      <button type="submit">가입하기</button>

        { loading && <p>등록 중...</p>}
        { error && <p>{error}</p>}
    </form>
        </div>
    );
};

export default RegisterForm;