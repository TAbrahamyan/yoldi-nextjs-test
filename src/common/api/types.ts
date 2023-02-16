export interface ApiKeyDto {
  value: string;
}

export interface ProfileDto {
  name: string;
  email: string;
  slug: string;
  description: string | null;
  image: ImageDto | null;
  cover: ImageDto | null;
}

export interface UpdateProfileDto {
  name: string;
  slug: string;
  description: string | null;
  password: string | null;
  imageId: string | null;
  coverId: string | null;
}

export interface ImageDto {
  id: string;
  url: string;
  width: string;
  height: string;
}
