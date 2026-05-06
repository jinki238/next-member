export interface Member{
    id:string;
    pw:string;
    addr:string;
    tel:string
};
export interface Status{
    loading:boolean;
    error:string|null;
    success:boolean;
};
export interface MemberState{
    list:Member[];
    detail:Member|null;

    listStatus:Status;
    detailStatus:Status;
    createStatus:Status;
    updateStatus:Status;
    deleteStatus:Status;
};