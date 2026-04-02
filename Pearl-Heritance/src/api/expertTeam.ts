import axiosInstance from "./axios";

export type ExpertTeamItem = {
  id: number;
  number: string;
  title: string;
  description: string | null;
  icon: string | null;
  members_count: number;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};

export type ExpertTeamResponse = {
  data: ExpertTeamItem[];
};

export const getExpertTeamSections = async (): Promise<ExpertTeamResponse> => {
  const response = await axiosInstance.get<ExpertTeamResponse>("/expert-team-sections");
  return response.data;
};