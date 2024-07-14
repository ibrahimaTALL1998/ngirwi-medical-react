import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHospitalisation } from 'app/shared/model/hospitalisation.model';
import { getEntities as getHospitalisations } from 'app/entities/hospitalisation/hospitalisation.reducer';
import { ISurveillanceSheet } from 'app/shared/model/surveillance-sheet.model';
import { getEntity, updateEntity, createEntity, reset } from './surveillance-sheet.reducer';

export const SurveillanceSheetUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const hospitalisations = useAppSelector(state => state.hospitalisation.entities);
  const surveillanceSheetEntity = useAppSelector(state => state.surveillanceSheet.entity);
  const loading = useAppSelector(state => state.surveillanceSheet.loading);
  const updating = useAppSelector(state => state.surveillanceSheet.updating);
  const updateSuccess = useAppSelector(state => state.surveillanceSheet.updateSuccess);

  const handleClose = () => {
    navigate('/surveillance-sheet' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getHospitalisations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...surveillanceSheetEntity,
      ...values,
      hospitalisation: hospitalisations.find(it => it.id.toString() === values.hospitalisation.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...surveillanceSheetEntity,
          hospitalisation: surveillanceSheetEntity?.hospitalisation?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ngirwiFrontEndApp.surveillanceSheet.home.createOrEditLabel" data-cy="SurveillanceSheetCreateUpdateHeading">
            Créer ou éditer un Surveillance Sheet
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
                <ValidatedField name="id" required readOnly id="surveillance-sheet-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Ta" id="surveillance-sheet-ta" name="ta" data-cy="ta" type="text" />
              <ValidatedField
                label="Temperature"
                id="surveillance-sheet-temperature"
                name="temperature"
                data-cy="temperature"
                type="text"
              />
              <ValidatedField label="Pulse Rate" id="surveillance-sheet-pulseRate" name="pulseRate" data-cy="pulseRate" type="text" />
              <ValidatedField
                label="Respiratory Frequency"
                id="surveillance-sheet-respiratoryFrequency"
                name="respiratoryFrequency"
                data-cy="respiratoryFrequency"
                type="text"
              />
              <ValidatedField
                label="Recoloration Time"
                id="surveillance-sheet-recolorationTime"
                name="recolorationTime"
                data-cy="recolorationTime"
                type="text"
              />
              <ValidatedField label="Glasgow" id="surveillance-sheet-glasgow" name="glasgow" data-cy="glasgow" type="text" />
              <ValidatedField
                label="Gravity Class"
                id="surveillance-sheet-gravityClass"
                name="gravityClass"
                data-cy="gravityClass"
                type="text"
              />
              <ValidatedField
                label="Horary Diuresis"
                id="surveillance-sheet-horaryDiuresis"
                name="horaryDiuresis"
                data-cy="horaryDiuresis"
                type="text"
              />
              <ValidatedField label="Spo 2" id="surveillance-sheet-spo2" name="spo2" data-cy="spo2" type="text" />
              <ValidatedField label="Treatment" id="surveillance-sheet-treatment" name="treatment" data-cy="treatment" type="text" />
              <ValidatedField
                label="Health Evolution"
                id="surveillance-sheet-healthEvolution"
                name="healthEvolution"
                data-cy="healthEvolution"
                type="text"
              />
              <ValidatedField label="Sheet Date" id="surveillance-sheet-sheetDate" name="sheetDate" data-cy="sheetDate" type="text" />
              <ValidatedField
                id="surveillance-sheet-hospitalisation"
                name="hospitalisation"
                data-cy="hospitalisation"
                label="Hospitalisation"
                type="select"
              >
                <option value="" key="0" />
                {hospitalisations
                  ? hospitalisations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/surveillance-sheet" replace color="info">
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

export default SurveillanceSheetUpdate;
