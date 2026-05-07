import api from "@/lib/axios";
import { ApiResponse, Emp } from "./types";


export const fetchEmpAPI = () => {
  return api.get<ApiResponse<Emp[]>>("/emp");
};

export const fetchEmpDetailAPI = (empno: string) => {
  return api.get<ApiResponse<Emp>>(`/emp/${empno}`);
};

export const registerEmpAPI = (result: Emp) => {
  return api.post<ApiResponse<Emp>>("/emp", result);
};

export const updateEmpAPI = (empno: string, result: Emp) => {
  return api.put<ApiResponse<Emp>>(`/emp/${empno}`, result);
};

export const deleteEmpAPI = (empno: string) => {
  return api.delete<ApiResponse<void>>(`/emp/${empno}`);
};