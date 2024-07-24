import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { config } from '../config/app.config';

cloudinary.config({
  cloud_name: config.get('cloudinaryName'),
  api_key: config.get('cloudinaryKey'),
  api_secret: config.get('cloudinarySecret'),
});

export const uploadImage = async (file: File): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string;

      cloudinary.uploader
        .upload(base64data, {
          upload_preset: 'your_upload_preset',
          format: 'webp',
          public_id: 'journey',
        })
        .then(resolve)
        .catch(reject);
    };
    reader.onerror = reject;
  });
};
