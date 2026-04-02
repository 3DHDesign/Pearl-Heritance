import axiosInstance from "./axios";

export type FeaturedProjectItem = {
  id: string;
  number: string;
  title: string;
  location: string;
  tag: string;
  image_url: string;
  description: string | null;
  project_link: string | null;
};

export type FeaturedProjectsSection = {
  id: number;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  view_all_text: string;
  view_all_link: string | null;
  projects: FeaturedProjectItem[];
  is_active: boolean;
  updated_at: string;
  created_at: string;
};

export type FeaturedProjectsResponse = {
  data: FeaturedProjectsSection[];
};

export const getActiveFeaturedProjects = async (): Promise<FeaturedProjectsSection | null> => {
  const response = await axiosInstance.get<FeaturedProjectsResponse>("/featured-projects/active");
  return response.data.data?.[0] ?? null;
};