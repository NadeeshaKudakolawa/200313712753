export interface Department {
  id: number;
  name: string;
}

export interface Officer {
  id: number;
  serviceNumber: string;
  name: string;
  email: string;
  grade: string;
  dateOfJoining: string;
  department: Department;
}

export interface TrainingProgram {
  id: number;
  title: string;
  trainingDate: string;
  venue: string;
  maximumParticipants: number;
}

export interface NominationResponse {
  id: number;
  registrationNumber: string;
  officerName: string;
  serviceNumber: string;
  programTitle: string;
  departmentName: string;
  status: string;
  nominatedAt: string;
}

export interface EligibilityRule {
  id: number;
  program: TrainingProgram;
  ruleType: string;
  ruleValue: string;
}

export interface EligibilityRuleRequest {
  programId: number;
  ruleType: string;
  ruleValue: string;
}