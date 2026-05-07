export interface Emp{
    empno:number;
    ename:string;
    job:string;
    mgr:string;
    sal:number;
    hiredate:string;
    comm:number;
    deptno:number;
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