import axios from "axios";
import { config } from '../config/config';

// TODO: fix
export type UploadFilePayload = {
  name: any;
  file: any;
};

export function uploadFile(payload: UploadFilePayload) {
  const form = new FormData();
  form.append("file", payload.file);
  form.append("name", payload.name);

  return axios.post(`${config.apiUrl}/inventory/lecture`, form, {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  });
}

export function getLectures() {
  return axios.get(`${config.apiUrl}/inventory/lecture?offset=0&size=1000`);
}

export function getLecture(id: string) {
  return axios.get(`${config.apiUrl}/inventory/lecture/${id}`);
}