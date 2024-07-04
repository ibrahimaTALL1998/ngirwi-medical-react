import patient from 'app/entities/patient/patient.reducer';
import dossierMedical from 'app/entities/dossier-medical/dossier-medical.reducer';
import consultation from 'app/entities/consultation/consultation.reducer';
import prescription from 'app/entities/prescription/prescription.reducer';
import medecine from 'app/entities/medecine/medecine.reducer';
import bill from 'app/entities/bill/bill.reducer';
import billElement from 'app/entities/bill-element/bill-element.reducer';
import hospital from 'app/entities/hospital/hospital.reducer';
import hospitalisation from 'app/entities/hospitalisation/hospitalisation.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  patient,
  dossierMedical,
  consultation,
  prescription,
  medecine,
  bill,
  billElement,
  hospital,
  hospitalisation,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
