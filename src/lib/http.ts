import { appConfig, envConfig } from '@/configs';
import { toast } from 'sonner';

export type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string;
  method?: keyof typeof appConfig.methods;
  body?: unknown;
  file?: File; // Added file option
};

export const isClient = () => typeof window !== 'undefined';

const getToken = () => {
  if (isClient()) {
    return localStorage.getItem('token');
  }
  return undefined;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
): Promise<Response> => {
  {
    const baseUrl =
      options?.baseUrl === undefined
        ? envConfig.NEXT_PUBLIC_API_ENDPOINT
        : options.baseUrl;

    const fullUrl = url.startsWith('/')
      ? `${baseUrl}${url}`
      : `${baseUrl}/${url}`;

    if (options?.file) {
      const formData = new FormData();
      formData.append('file', options.file);
      if (options?.body) {
        for (const [key, value] of Object.entries(options.body)) {
          formData.append(key, value);
        }
      }
      options.body = formData;
    }

    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
      body = options.body;
    } else if (options?.body) {
      body = JSON.stringify(options.body);
    }

    const baseHeaders: {
      [key: string]: string;
    } =
      body instanceof FormData
        ? {}
        : {
            'Content-Type': 'application/json',
          };

    const token = getToken();
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      } as any,
      body,
      method,
    };

    const res = await fetch(fullUrl, fetchOptions);

    const payload: Response = await res.json();
    const data = {
      status: res.status,
      payload,
    };

    if (!res.ok) {
      if (data.payload && data.payload.message) {
        toast.error(data.payload.message);
      } else {
        toast.error('An error occurred');
      }
    }
    if (isClient()) {
    }
    return data.payload;
  }
};

const http = {
  get: <Response>(url: string, options?: CustomOptions): Promise<Response> =>
    request<Response>('GET', url, options),

  post: <Response>(url: string, options?: CustomOptions): Promise<Response> =>
    request<Response>('POST', url, options),

  put: <Response>(url: string, options?: CustomOptions): Promise<Response> =>
    request<Response>('PUT', url, options),

  delete: <Response>(url: string, options?: CustomOptions): Promise<Response> =>
    request<Response>('DELETE', url, options),
};

export default http;
