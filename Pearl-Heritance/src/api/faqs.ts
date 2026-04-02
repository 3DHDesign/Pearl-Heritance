import axiosInstance from "./axios";

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};

export type FAQResponse = {
  data: FAQItem[];
};

export const getActiveFaqs = async (): Promise<FAQItem[]> => {
  const response = await axiosInstance.get<FAQResponse>("/faqs/active");
  return response.data.data;
};