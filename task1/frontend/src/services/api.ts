import axios from "axios";

import type {
  Department,
  Officer,
  TrainingProgram,
  NominationResponse,
  EligibilityRule,
} from "../types/types";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ==========================================
// DEPARTMENTS
// ==========================================

export const getDepartments = async (): Promise<Department[]> => {

  const response =
    await API.get("/departments");

  return response.data;
};

// ==========================================
// OFFICERS
// ==========================================

export const getOfficers = async (): Promise<Officer[]> => {

  const response =
    await API.get("/officers");

  return response.data;
};

export const createOfficer = async (
  serviceNumber: string,
  name: string,
  email: string,
  grade: string,
  dateOfJoining: string,
  departmentId: number
): Promise<Officer> => {

  const response =
    await API.post(
      "/officers",
      {
        serviceNumber,
        name,
        email,
        grade,
        dateOfJoining,
        departmentId,
      }
    );

  return response.data;
};

// ==========================================
// PROGRAMS
// ==========================================

export const getPrograms =
  async (): Promise<TrainingProgram[]> => {

    const response =
      await API.get("/programs");

    return response.data;
  };

export const createProgram = async (
  title: string,
  trainingDate: string,
  venue: string,
  maximumParticipants: number
): Promise<TrainingProgram> => {

  const response =
    await API.post(
      "/programs",
      {
        title,
        trainingDate,
        venue,
        maximumParticipants,
      }
    );

  return response.data;
};

// ==========================================
// NOMINATIONS
// ==========================================

export const getNominations =
  async (): Promise<NominationResponse[]> => {

    const response =
      await API.get("/nominations");

    return response.data;
  };

export const createNomination = async (
  programId: number,
  officerId: number,
  departmentId: number
): Promise<NominationResponse> => {

  const response =
    await API.post(
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

  const response =
    await API.put(
      `/nominations/${id}/cancel`
    );

  return response.data;
};

// ==========================================
// ELIGIBILITY RULES
// ==========================================

export const getEligibilityRules = async (
  programId: number
): Promise<EligibilityRule[]> => {

  const response =
    await API.get(
      `/eligibility-rules/program/${programId}`
    );

  return response.data;
};

export const createEligibilityRule = async (
  programId: number,
  ruleType: string,
  ruleValue: string
): Promise<EligibilityRule> => {

  const response =
    await API.post(
      "/eligibility-rules",
      {
        programId,
        ruleType,
        ruleValue,
      }
    );

  return response.data;
};

export const deleteEligibilityRule = async (
  id: number
): Promise<void> => {

  await API.delete(
    `/eligibility-rules/${id}`
  );
};