import axiosInstance from "./axios";
export type VideoTourApiItem = {
  id: number;
  thumbnail_image: string;
  video_url: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
};
type VideoTourApiResponse = { data: VideoTourApiItem[] };
export const getActiveVideoTours = async (): Promise<VideoTourApiItem[]> => {
  const response = await axiosInstance.get<VideoTourApiResponse>(
    "/video-tours/active"
  );
  return response.data.data ?? [];
};
