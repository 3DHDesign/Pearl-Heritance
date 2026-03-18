import axiosInstance from "./axios";

export type BlogSidebarPostInfo = {
  category: string | null;
  published_date: string | null;
  read_time: string | null;
};

export type RelatedBlogPost = {
  id: number;
  title: string;
  featured_image?: string | null;
  category?: string | null;
};

export type BlogDetailData = {
  id: number;
  title: string;
  subtitle: string | null;
  featured_image: string | null;
  category: string | null;
  published_date: string | null;
  read_time: string | null;
  content: string;
  sidebar_post_info: BlogSidebarPostInfo | null;
  related_posts: RelatedBlogPost[];
};

type BlogDetailResponse = {
  data: BlogDetailData;
};

export const getBlogById = async (
  id: string | number
): Promise<BlogDetailData> => {
  const response = await axiosInstance.get<BlogDetailResponse>(`/blogs/${id}`);
  return response.data.data;
};