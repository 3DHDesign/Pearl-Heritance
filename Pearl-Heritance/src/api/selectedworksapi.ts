import axiosInstance from "./axios"; // adjust path as needed

export type SelectedWorkProject = {
  id: string;
  title: string;
  location: string;
  year: string;
  image_url: string;
  project_link: string | null;
};

export type SelectedWorksSection = {
  id: number;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  view_all_text: string;
  view_all_link: string | null;
  category_name: string;
  projects: SelectedWorkProject[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SelectedWorksResponse = {
  data: SelectedWorksSection;
};

export const getSelectedWorks = async () => {
  const response = await axiosInstance.get<SelectedWorksResponse>(
    "/selected-works/active"
  );
  return response.data;
};