import axiosInstance from "./axios";

export type AboutHeroBreadcrumbItem = {
  label: string;
  link: string | null;
};

export type AboutHeroData = {
  id: number;
  background_image: string;
  title: string;
  breadcrumb: AboutHeroBreadcrumbItem[];
  updated_at: string;
  created_at: string;
};

export type AboutHeroResponse = {
  data: AboutHeroData;
};

export const getActiveAboutHero = async (): Promise<AboutHeroData> => {
  const response = await axiosInstance.get<AboutHeroResponse>("/about-heroes/active");
  return response.data.data;
};