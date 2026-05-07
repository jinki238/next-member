export interface Emp{
    empno:string;
    ename:string;
    job:string;
    mgr:string;
    sal:string;
    hiredate:string;
    comm:string;
    deptno:string;
};
export interface Status{
    loading:boolean;
    error:string|null;
    success:boolean;
};
export interface EmpState{
    list:Emp[];
    detail:Emp|null;

    listStatus:Status;
    detailStatus:Status;
    createStatus:Status;
    updateStatus:Status;
    deleteStatus:Status;
};
export type ApiResponse<T> = {
  code: number,
  message: string,
  data: T
};