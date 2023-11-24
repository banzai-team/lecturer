import axios from "axios";
import { request, gql } from "graphql-request";

import { config } from '../config/config';

// TODO: fix
export type UploadFilePayload = {
  name: any;
  file: any;
};

export async function uploadFile(payload: UploadFilePayload) {
  const form = new FormData();
  form.append("file", payload.file);
  form.append("name", payload.name);

  const response = await axios.post(`${config.apiUrl}/inventory/lecture`, form, {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  });

  console.log(response);

  await axios.post(`${config.apiUrl}/analyse/lecture/${response.data.id}`, {}, {
    headers: {
      'Content-Type': `application/json`,
    },
  });

  return response;
}

export function getLectures() {
  return axios.get(`${config.apiUrl}/inventory/lecture?offset=0&size=1000`);
}

const LectureQuery = gql`
    query getLectures($id: String!) {
        lecture(id: $id) {
            id
            lectureName
            glossary {
                id
                createdAt
                items {
                    id
                    term
                    meaning
                }
            }
            textChunks{
                id
#                from
#                to
                content
            }
        }
    }
`;
export async function getLecture(id: string) {
  const response = await request<{lecture: any}>(`${config.apiUrl}/graphql`, LectureQuery, {
    "id": id
  });

  return response.lecture;
}