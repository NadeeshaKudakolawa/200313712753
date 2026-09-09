import axios from "axios";

import type {
  Officer,
  TrainingProgram,
  NominationResponse,
} from "../types/types";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getOfficers = async (): Promise<Officer[]> => {
  const response = await API.get("/officers");

  return response.data;
};

export const getPrograms = async (): Promise<TrainingProgram[]> => {
  const response = await API.get("/programs");

  return response.data;
};

export const getNominations = async (): Promise<
  NominationResponse[]
> => {

  const response = await API.get("/nominations");

  return response.data;
};

export const createNomination = async (
  programId: number,
  officerId: number,
  departmentId: number
): Promise<NominationResponse> => {

  const response = await API.post(
    "/nominations",
    {
      programId,
      officerId,
      departmentId,
    }
  );

  return response.data;
};

export const cancelNomination = async (
  id: number
): Promise<NominationResponse> => {

  const response = await API.put(
    `/nominations/${id}/cancel`
  );

  return response.data;
};