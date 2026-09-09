export interface Department {
  id: number;
  name: string;
}

export interface Officer {
  id: number;
  serviceNumber: string;
  name: string;
  email: string;
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
  registrationNumber: string;
  officerName: string;
  serviceNumber: string;
  programTitle: string;
  departmentName: string;
  status: string;
}