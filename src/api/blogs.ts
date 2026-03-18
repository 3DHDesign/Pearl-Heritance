import axiosInstance from "./axios";

export type BlogItem = {
  id: number;
  title: string;
  slug: string | null;
  excerpt: string | null;
  description: string | null;
  image_url: string | null;
  category: string | null;
  published_date: string | null;
  created_at: string;
  updated_at: string;
};

type BlogsResponse = {
  data: BlogItem[];
};

export const getBlogs = async (): Promise<BlogItem[]> => {
  const response = await axiosInstance.get<BlogsResponse>("/blogs");
  return response.data.data;
};