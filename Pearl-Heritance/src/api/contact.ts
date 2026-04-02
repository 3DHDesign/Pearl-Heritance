import axiosInstance from "./axios";

export type ContactPageResponse = {
  data: {
    id: number;
    hero_image: string;
    map_embed_url: string | null;

    contact_details: {
      address: string;
      phone: string;
      email: string;
    };

    header_contact_strip: {
      phone: string;
      whatsapp: {
        number: string;
        message: string | null;
      };
      is_active: boolean;
    };

    social_links: {
      facebook: string | null;
      instagram: string | null;
      linkedin: string | null;
      tiktok: string | null;
      is_active: boolean;
    };

    is_active: boolean;
    updated_at: string;
    created_at: string;
  };
};

export const getContactPage = async () => {
  const response = await axiosInstance.get<ContactPageResponse>(
    "/contact-pages/active"
  );

  return response.data;
};