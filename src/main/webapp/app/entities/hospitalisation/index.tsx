import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Hospitalisation from './hospitalisation';
import HospitalisationDetail from './hospitalisation-detail';
import HospitalisationUpdate from './hospitalisation-update';
import HospitalisationDeleteDialog from './hospitalisation-delete-dialog';

const HospitalisationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Hospitalisation />} />
    <Route path=":idPatient" element={<Hospitalisation />} />
    <Route path="new" element={<HospitalisationUpdate />} />
    <Route path="new/:idPatient" element={<HospitalisationUpdate />} />
    <Route path=":id">
      {/* <Route index element={<HospitalisationDetail />} /> */}
      <Route path=":idPatient" element={<HospitalisationUpdate />} />
      <Route path="edit" element={<HospitalisationUpdate />} />
      <Route path="delete" element={<HospitalisationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default HospitalisationRoutes;
