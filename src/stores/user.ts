import { toast } from '@/hooks/use-toast';
import { userService } from '@/services';
import { create } from 'zustand';
export interface User {
  _id: string;
  name: string;
  phone: null;
  info: {
    email: string;
    cityCode: number;
    cityName: string;
    gender: string;
  };
  avatar: string;
  avatarURL: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  loadingUpdateInfo: boolean;
  loginWithGoogle: (data: any, callback: () => void) => Promise<void>;
  loginWithTiktok: (data: any) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
  updateMe: (data: any, callback: () => void) => Promise<void>;
}

interface Payload {
  data?: {
    token?: string;
    data?: User;
  };
}

const useStore = create<UserState>()((set, get) => ({
  user: null,
  loadingUpdateInfo: false,
  loginWithGoogle: async (data: any, callback: () => void): Promise<void> => {
    const payload: Payload = await userService.loginWithGoogle(data);
    if (payload?.data?.token) {
      localStorage.setItem('token', payload.data.token);
      await get().getMe();
    }
    callback?.();
  },
  loginWithTiktok: async (data: any): Promise<void> => {
    const payload: Payload = await userService.loginWithTiktok(data);
    if (payload?.data?.token) {
      localStorage.setItem('token', payload.data.token);
      await get().getMe();
    }
  },

  getMe: async (): Promise<void> => {
    const payload: Payload = await userService.getMe();
    const user = payload?.data?.data;
    if (user) {
      set({ user });
    }
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  updateMe: async (data: any, callback: () => void): Promise<void> => {
    set({ loadingUpdateInfo: true });
    const payload: Payload = await userService.updateMe(data);
    if (payload?.data?.data) {
      set({ user: payload.data.data });
    }
    set({ loadingUpdateInfo: false });

    // if (payload?.da) {
    //   toast({
    //     title: 'Cập nhật thông tin thành công',
    //   });
    // }

    callback?.();
  },
}));

export default useStore;
