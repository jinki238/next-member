import api from "@/lib/axios";
import { ApiResponse, Member } from "./types";


export const fetchMemberAPI = () => {
  return api.get<ApiResponse<Member[]>>("/member");
};

export const fetchMemberDetailAPI = (id: string) => {
  return api.get<ApiResponse<Member>>(`/member/${id}`);
};

export const registerMemberAPI = (result: Member) => {
  return api.post<ApiResponse<Member>>("/member", result);
};

export const updateMemberAPI = (id: string, result: Member) => {
  return api.put<ApiResponse<Member>>(`/member/${id}`, result);
};

export const deleteMemberAPI = (id: string) => {
  return api.delete<ApiResponse<void>>(`/member/${id}`);
};