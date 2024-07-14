import { IHospitalisation } from 'app/shared/model/hospitalisation.model';

export interface ISurveillanceSheet {
  id?: number;
  ta?: string | null;
  temperature?: string | null;
  pulseRate?: string | null;
  respiratoryFrequency?: string | null;
  recolorationTime?: string | null;
  glasgow?: string | null;
  gravityClass?: string | null;
  horaryDiuresis?: string | null;
  spo2?: string | null;
  treatment?: string | null;
  healthEvolution?: string | null;
  sheetDate?: string | null;
  hospitalisation?: IHospitalisation | null;
}

export const defaultValue: Readonly<ISurveillanceSheet> = {};
