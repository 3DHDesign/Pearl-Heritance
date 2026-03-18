import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type HeroSection = {
  id: number;
  background_image: string;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};

type HeroSectionResponse = {
  data: HeroSection;
};

export const getActiveHeroSection = async (): Promise<HeroSection> => {
  const response = await axios.get<HeroSectionResponse>(
    `${API_BASE_URL}/hero-sections/active`
  );

  return response.data.data;
};