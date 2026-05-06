import api from "@/lib/axios";
import { Emp } from "./types";


export type ApiResponse<T> = {
  code: number,
  message: string,
  data: T
};

export const fetchEmpAPI = () => {
  return api.get<ApiResponse<Emp[]>>("/emp");
};

export const fetchEmpDetailAPI = (empno: number) => {
  return api.get<ApiResponse<Emp>>(`/emp/${empno}`);
};

export const registerEmpAPI = (result: Emp) => {
  return api.post<ApiResponse<Emp>>("/emp", result);
};

export const updateEmpAPI = (empno: number, result: Emp) => {
  return api.put<ApiResponse<Emp>>(`/emp/${empno}`, result);
};

export const deleteEmpAPI = (empno: number) => {
  return api.delete<ApiResponse<void>>(`/emp/${empno}`);
};