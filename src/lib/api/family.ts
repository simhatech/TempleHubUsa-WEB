import apiClient from './client';
import type { FamilyMember } from '@/types';

export interface AddFamilyMemberRequest {
  name: string;
  relation: string;
}

export const familyApi = {
  getMembers: () => apiClient.get<FamilyMember[]>('/family/members').then((r) => r.data),

  addMember: (data: AddFamilyMemberRequest) =>
    apiClient.post<FamilyMember>('/family/members', data).then((r) => r.data),

  removeMember: (id: number) =>
    apiClient.delete(`/family/members/${id}`).then((r) => r.data),
};
