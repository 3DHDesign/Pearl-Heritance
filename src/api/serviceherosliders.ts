import axiosInstance from "./axios";

export type ServiceSlide = {
  id: number;
  background_image: string;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string | null;
  secondary_button_text: string;
  secondary_button_link: string | null;
  key_title: string;
  is_active: boolean;
};

export type ServiceHeroSliderResponse = {
  data: ServiceSlide[];
};

export const getServiceHeroSliders = async () => {
  const response = await axiosInstance.get<ServiceHeroSliderResponse>(
    "/service-hero-sliders/active"
  );
  return response.data;
};