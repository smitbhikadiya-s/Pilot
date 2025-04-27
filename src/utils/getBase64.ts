import { UploadFile } from 'antd';
import { v4 as uuid } from 'uuid';

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const convertBase64ToFileList = (
  base64Images: string[],
): UploadFile[] => {
  return base64Images.map((base64, index) => ({
    uid: uuid(),
    name: `image-${index + 1}.png`,
    status: 'done',
    url: base64,
  }));
};
