import axiosInstance from "./axios";

export type ProjectGalleryItem = {
  image_url: string;
  is_active: boolean;
};

export type ProjectItem = {
  id: number;
  category_id: string;
  number: string;
  title: string;
  location: string;
  year: string | null;
  image_url: string;
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

type ProjectsResponse = {
  data: ProjectItem[];
};

export const getProjectsByCategory = async (
  category: string
): Promise<ProjectItem[]> => {
  const response = await axiosInstance.get<ProjectsResponse>(
    `/projects/${encodeURIComponent(category)}`
  );

  return response.data.data;
};