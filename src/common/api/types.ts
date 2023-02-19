export interface ApiKeyDto {
  value: string;
}

export interface ProfileDto {
  name: string;
  email: string;
  slug: string;
  description?: string;
  image?: ImageDto;
  cover?: ImageDto;
}

export interface UpdateProfileDto {
  name: string;
  slug: string;
  description?: string;
  password?: string;
  imageId?: string;
  coverId?: string;
}

export interface ImageDto {
  id: string;
  url: string;
  width: string;
  height: string;
}
