/* eslint-disable import/no-anonymous-default-export */
import { envConfig } from '@/configs';
import http from '@/lib/http';

const uploadPhoto = (file: File) => {
  return http.post('/photo', {
    file,
    baseUrl: envConfig.NEXT_PUBLIC_API_UPLOAD,
  });
};

export default {
  uploadPhoto,
};
