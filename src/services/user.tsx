/* eslint-disable import/no-anonymous-default-export */
import http from '@/lib/http';

const loginWithGoogle = (body: any) => {
  return http.post('/sso/login-with-google', {
    body,
  });
};

const loginWithTiktok = (body: any) => {
  return http.post('/sso/login-with-tiktok', {
    body,
  });
};

const loginWithFacebook = (body: any) => {
  return http.post('/sso/login-with-facebook', {
    body,
  });
};

const getMe = () => {
  return http.get('/account/me');
};

const updateMe = (body: any) => {
  return http.put('/account', {
    body,
  });
};

export default {
  loginWithGoogle,
  loginWithTiktok,
  loginWithFacebook,
  getMe,
  updateMe,
};
