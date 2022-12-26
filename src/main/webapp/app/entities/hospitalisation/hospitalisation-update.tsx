import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IHospitalisation } from 'app/shared/model/hospitalisation.model';
import { HospitalisationStatus } from 'app/shared/model/enumerations/hospitalisation-status.model';
import { getEntity, updateEntity, createEntity, reset } from './hospitalisation.reducer';

export const HospitalisationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const hospitalisationEntity = useAppSelector(state => state.hospitalisation?.entity);
  const loading = useAppSelector(state => state.hospitalisation.loading);
  const updating = useAppSelector(state => state.hospitalisation.updating);
  const updateSuccess = useAppSelector(state => state.hospitalisation.updateSuccess);
  const hospitalisationStatusValues = Object.keys(HospitalisationStatus);

  const handleClose = () => {
    navigate('/hospitalisation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPatients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.entryDate = convertDateTimeToServer(values.entryDate);
    values.releaseDate = convertDateTimeToServer(values.releaseDate);

    const entity = {
      ...hospitalisationEntity,
      ...values,
      patient: patients.find(it => it.id.toString() === values.patient.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          entryDate: displayDefaultDateTime(),
          releaseDate: displayDefaultDateTime(),
        }
      : {
          status: 'STARTED',
          ...hospitalisationEntity,
          entryDate: convertDateTimeFromServer(hospitalisationEntity.entryDate),
          releaseDate: convertDateTimeFromServer(hospitalisationEntity.releaseDate),
          patient: hospitalisationEntity?.patient?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ngirwiFrontEndApp.hospitalisation.home.createOrEditLabel" data-cy="HospitalisationCreateUpdateHeading">
            Créer ou éditer un Hospitalisation
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="hospitalisation-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Entry Date"
                id="hospitalisation-entryDate"
                name="entryDate"
                data-cy="entryDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Release Date"
                id="hospitalisation-releaseDate"
                name="releaseDate"
                data-cy="releaseDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Doctor Name" id="hospitalisation-doctorName" name="doctorName" data-cy="doctorName" type="text" />
              <ValidatedField label="Status" id="hospitalisation-status" name="status" data-cy="status" type="select">
                {hospitalisationStatusValues.map(hospitalisationStatus => (
                  <option value={hospitalisationStatus} key={hospitalisationStatus}>
                    {hospitalisationStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="hospitalisation-patient" name="patient" data-cy="patient" label="Patient" type="select">
                <option value="" key="0" />
                {patients
                  ? patients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/hospitalisation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Retour</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Sauvegarder
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HospitalisationUpdate;
