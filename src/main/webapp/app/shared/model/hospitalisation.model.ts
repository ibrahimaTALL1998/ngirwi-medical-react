import dayjs from 'dayjs';
import { IPatient } from 'app/shared/model/patient.model';
import { ISurveillanceSheet } from 'app/shared/model/surveillance-sheet.model';
import { HospitalisationStatus } from 'app/shared/model/enumerations/hospitalisation-status.model';

export interface IHospitalisation {
  id?: number;
  entryDate?: string | null;
  releaseDate?: string | null;
  doctorName?: string | null;
  status?: HospitalisationStatus | null;
  patient?: IPatient | null;
  surveillanceSheets?: ISurveillanceSheet[] | null;
}

export const defaultValue: Readonly<IHospitalisation> = {};
