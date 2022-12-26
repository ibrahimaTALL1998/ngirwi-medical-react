export interface IMedecineForm {
  medecine?: string | null;
  duration?: string | null;
  frequency?: string | null;
}

export const defaultValue: Readonly<IMedecineForm> = {};
