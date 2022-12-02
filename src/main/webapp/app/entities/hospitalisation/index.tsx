import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import { HospitalisationUpdate } from './hospitalisation-update';
import { Hospitalisation } from './hospitalisation';

const HospitalisationRoutes = () => (
    <ErrorBoundaryRoutes>
        
            <Route index element={<Hospitalisation />} />
            <Route path="new/:idPatient" element={<HospitalisationUpdate />} />
            <Route path=":id">
                <Route path="edit" element={<HospitalisationUpdate />} />
                <Route path="edit/:idEdit" element={<HospitalisationUpdate />} />
                {/* <Route path="delete" element={<ConsultationDeleteDialog />} /> */}
            </Route>
       
    </ErrorBoundaryRoutes>
)

export default HospitalisationRoutes;