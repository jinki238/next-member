"use client"

import { fetchEmpDetailRequest, resetStatus, updateEmpRequest } from "@/features/emp/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const UpdateForm = () => {
    const { empno } = useParams<{empno:string}>();
    const dispatch=useDispatch<AppDispatch>();
    const router = useRouter();

    const [form, setForm] = useState({ empno: 0, ename: "", job: "", mgr: "",
        sal:"", hiredate:"", comm:"", deptno:""});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        dispatch(updateEmpRequest({ empno, data: form }));
    };

    const {updateStatus,detail}=useSelector((state:RootState)=>({
        detail:state.emp.detail,
        updateStatus:state.emp.updateStatus,
    }),shallowEqual);

    useEffect(()=>{
        if(updateStatus.success){
            dispatch(resetStatus("updateStatus"));
            router.push("/emp"); 
        }
    },[updateStatus.success]);

    useEffect(()=>{
        if (!empno) return; 
        dispatch(fetchEmpDetailRequest(empno));
    },[empno]);

    useEffect(() => {
        if (detail) setForm(detail);
    }, [detail]);

    return (
        <div>
    <form onSubmit={onSubmit}>
      <input name="empno" placeholder="사원번호" onChange={onChange} value={form.empno} disabled/>
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
      <button type="submit">수정하기</button>
        { updateStatus.loading && <p>수정 중...</p>}
        { updateStatus.error && <p>{updateStatus.error}</p>}
    </form>
        </div>
    );
};

export default UpdateForm;