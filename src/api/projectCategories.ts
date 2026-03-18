import axiosInstance from "./axios";

export type ProjectCategory = {
  id: number;
  number: string;
  title: string;
  tag: string;
  image_url: string;
  updated_at: string;
  created_at: string;
};

type Response = {
  data: ProjectCategory[];
};

export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  const res = await axiosInstance.get<Response>("/project-category-cards");
  return res.data.data;
};