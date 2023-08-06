import { API, Method } from "@util/query";
import axios, { CancelTokenSource } from "axios";
import fetch from "cross-fetch";
import { useMutation, useQuery } from "react-query";

const getSignedUrl = async (file: File) => {
  const result = await API._request(Method.GET, `file/upload`, {
    fileName: file.name,
    fileType: file.type,
  }).then((response) => response.json());

  return result;
};

const uploadFile = async (file: File, signedRequest: string) => {
  const options = {
    method: "PUT",
    body: file,
  };
  return fetch(signedRequest, options);
};

export const uploadToS3 = async ({
  file,
  setProgress,
  cancel,
}: {
  file: File;
  setProgress?: any;
  cancel?: CancelTokenSource;
}) => {
  const { signedRequest, url } = await getSignedUrl(file);
  let returnUrl = url;
  await axios
    .put(signedRequest, file, {
      headers: {
        "Content-Type": file.type,
      },
      cancelToken: cancel?.token,
      onUploadProgress: (progressEvent) => {
        let percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        setProgress && setProgress(percentCompleted);
      },
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        returnUrl = "";
      } else {
        console.log("error:", error.message);
      }
    });

  return returnUrl;
};
export type QuestionFileType = {
  specialistQuestionId: string;
  fileLink: string;
  fileMIMEType: string;
  fileSource: string;
  fileSourceDate: string;
  fileCategory: string;
  fileGroup?: string;
  createdBy: string;
};
export type PatientNoteFileType = {
  patientNoteId: string;
  fileLink: string;
  fileMIMEType: string;
  fileSource: string;
  fileSourceDate: string;
  fileCategory: string;
  fileGroup?: string;
  createdBy: string;
};
export type PatientNoteFileTypeSelect = {
  patientNoteId: string;
  questionId: string;
  fileLink: string;
  fileMIMEType: string;
  fileSource: string;
  fileSourceDate: string;
  fileCategory: string;
  fileGroup?: string;
  createdBy: string;
  id: string;
};
export const useCreateQuestionFile = () =>
  useMutation(API._mutate(Method.POST, `file/doctorquestion`));

export const useCreatePatientNoteFile = () =>
  useMutation(API._mutate(Method.POST, `file/patientnote`));

export const useDeletePatientNoteFile = () =>
  useMutation(API._mutate(Method.DELETE, `file/patientnote`));

export const usePatientNoteFiles = (patientNoteId: string) =>
  useQuery<PatientNoteFileTypeSelect[]>(
    ["patientNoteId", patientNoteId],
    API._query(Method.GET, `file/patientnote`, { patientNoteId })
  );

export const usePatientFiles = (patientId: string) =>
  useQuery<PatientNoteFileTypeSelect[]>(
    ["patientNoteId", patientId],
    API._query(Method.GET, `file/document/patient/${patientId}`)
  );
