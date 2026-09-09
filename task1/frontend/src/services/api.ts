import axios from "axios";
import type { Officer, TrainingProgram, NominationResponse } from "../types/types";

const BASE_URL = "http://localhost:8080/api";

export const getOfficers = async (): Promise<Officer[]> => {
  const response = await axios.get<Officer[]>(`${BASE_URL}/officers`);
  return response.data;
};

export const getPrograms = async (): Promise<TrainingProgram[]> => {
  const response = await axios.get<TrainingProgram[]>(`${BASE_URL}/programs`);
  return response.data;
};

export const getNominations = async (): Promise<NominationResponse[]> => {
  const response = await axios.get<NominationResponse[]>(`${BASE_URL}/nominations`);
  return response.data;
};

export const createNomination = async (
  programId: number,
  officerId: number,
  departmentId: number
): Promise<NominationResponse> => {
  const response = await axios.post<NominationResponse>(
    `${BASE_URL}/nominations`,
    { programId, officerId, departmentId }
  );
  return response.data;
};