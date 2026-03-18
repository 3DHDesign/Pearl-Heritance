import axiosInstance from "./axios";

export type Highlight = { text: string };

export type ServiceItem = {
  id: string;
  number: string;
  title: string;
  short_description: string;
  description: string;
  highlights: Highlight[];
  image: string;
  primary_text: string;
  primary_link: string | null;
  secondary_text: string;
  secondary_link: string | null;
};

export type OurServicesSection = {
  id: number;
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  services: ServiceItem[];
};

export type OurServicesResponse = {
  data: OurServicesSection[];
};

export const getOurServices = async () => {
  const response = await axiosInstance.get<OurServicesResponse>("/our-services");
  return response.data;
};