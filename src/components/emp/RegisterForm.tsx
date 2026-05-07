"use client"

import { registerEmpRequest, resetStatus } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
    const router = useRouter();
    const dispatch=useDispatch<AppDispatch>();
    const {loading,error,success}=useSelector((state:RootState)=>({
        loading:state.emp.createStatus.loading,
        error:state.emp.createStatus.error,
        success:state.emp.createStatus.success,
    }),shallowEqual);

    const [form, setForm] = useState({ empno: "", ename: "", job: "", mgr: "",
        sal:"", hiredate:"", comm:"", deptno:""
     });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(registerEmpRequest(form));
    };

    useEffect(()=>{
        if(success){
            dispatch(resetStatus("createStatus"));
             router.push("/emp");
        }
    },[success]);

    return (
        <div>
    <form onSubmit={onSubmit}>
      <input name="empno" placeholder="사원번호" onChange={onChange} value={form.empno} />
      <br />
      <input name="ename" placeholder="사원이름" onChange={onChange} value={form.ename} />
      <br />
      <input name="job" placeholder="직책" onChange={onChange} value={form.job} />
      <br />
      <input name="mgr" placeholder="상사" onChange={onChange} value={form.mgr} />
      <br />
      <input name="sal" placeholder="급여" onChange={onChange} value={form.sal} />
      <br />
      <input name="hiredate" placeholder="입사일" onChange={onChange} value={form.hiredate} />
      <br />
      <input name="comm" placeholder="상여금" onChange={onChange} value={form.comm} />
      <br />
      <input name="deptno" placeholder="부서번호" onChange={onChange} value={form.deptno} />
      <br />
      <button type="submit">가입하기</button>

        { loading && <p>등록 중...</p>}
        { error && <p>{error}</p>}
    </form>
        </div>
    );
};

export default RegisterForm;