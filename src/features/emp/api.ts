import api from "@/lib/axios";
import { Emp } from "../member/types";

export type ApiResponse<T> = {
  code: number,
  message: string,
  data: T
};

export const fetchEmpAPI = () => {
  return api.get<ApiResponse<Emp[]>>("/emp");
};

export const fetchEmpDetailAPI = (id: string) => {
  return api.get<ApiResponse<Emp>>(`/emp/${id}`);
};

export const registerEmpAPI = (result: Emp) => {
  return api.post<ApiResponse<Emp>>("/emp", result);
};

export const updateEmpAPI = (id: string, result: Emp) => {
  return api.put<ApiResponse<Emp>>(`/emp/${id}`, result);
};

export const deleteEmpAPI = (id: string) => {
  return api.delete<ApiResponse<void>>(`/emp/${id}`);
};