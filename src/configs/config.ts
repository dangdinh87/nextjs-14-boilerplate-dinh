import * as yup from 'yup';

const configSchema = yup.object({
  NEXT_PUBLIC_API_ENDPOINT: yup.string(),
  NEXT_PUBLIC_URL: yup.string(),
  NEXT_PUBLIC_LOGO_URL: yup.string(),
  NEXT_PUBLIC_APP_NAME: yup.string(),
  NEXT_PUBLIC_API_UPLOAD: yup.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: yup.string(),
  NEXT_PUBLIC_TIKTOK_CLIENT_ID: yup.string(),
});

const envConfig = configSchema.validateSync({
  // API CONFIG URL
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_API_UPLOAD: process.env.NEXT_PUBLIC_API_UPLOAD,

  // APP CONFIG COMMON
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,

  // GOOGLE CONFIG
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

  // TIKTOK CONFIG
  NEXT_PUBLIC_TIKTOK_CLIENT_ID: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID,
});

export default envConfig;
