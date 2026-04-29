import axiosInstance from "./axios";

export type ProjectGalleryItem = {
  image_url: string;
  is_active: boolean;
};

export type SingleProjectData = {
  id: number;
  catgory_id: string;
  number: string;
  title: string;
  location: string;
  year: string | null;
  image_url: string;
  logo_url: string | null;
  project_link: string | null;
  category: string;
  category_card: string;
  status: string;
  overview: string;
  key_features: string[];
  gallery: ProjectGalleryItem[];
  cta_text: string | null;
  cta_link: string | null;
  updated_at: string;
  created_at: string;
};

type SingleProjectResponse = {
  data: SingleProjectData;
};

export const getSingleProject = async (
  id: string | number
): Promise<SingleProjectData> => {
  const response = await axiosInstance.get<SingleProjectResponse>(
    `/single-project/${id}`
  );
  return response.data.data;
};