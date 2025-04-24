import { GetProp, UploadProps } from "antd";

export interface LoginFormData {
  email?: string;
  password?: string;
}

export interface LoginFormContainerProps{
  updateFormData: (data: LoginFormData) => void
}

export interface ItemFormValues{
  itemName: string;
  category: string;
  description?: string;
  pricing: number;
  ingredients: string[];
  images?: string[];
};

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export type Ingredient = string;
export type Category = string;