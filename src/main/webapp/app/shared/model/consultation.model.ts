import dayjs from 'dayjs';
import { IPatient } from 'app/shared/model/patient.model';
import { IPrescription } from 'app/shared/model/prescription.model';

export interface IConsultation {
  id?: number;
  dateTime?: string | null;
  temperature?: number;
  weight?: number;
  tension?: string;
  glycemie?: string | null;
  comment?: string | null;
  hypothesis?: string;
  exams?: string;
  treatment?: string;
  author?: string | null;
  patient?: IPatient | null;
  ordonance?: IPrescription | null;
}

export const defaultValue: Readonly<IConsultation> = {};
