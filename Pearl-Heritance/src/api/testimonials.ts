import axiosInstance from "./axios";

export type TestimonialApiItem = {
  id: number;
  description: string;
  name: string;
  designation: string;
  image_url: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};

type TestimonialsApiResponse = {
  data: TestimonialApiItem[];
};

export const getActiveTestimonials = async (): Promise<TestimonialApiItem[]> => {
  const response = await axiosInstance.get<TestimonialsApiResponse>("/testimonials/active");
  return response.data.data ?? [];
};