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
import { IDossierMedical } from 'app/shared/model/dossier-medical.model';
import { getEntity, updateEntity, createEntity, reset } from './dossier-medical.reducer';

export const DossierMedicalUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const dossierMedicalEntity = useAppSelector(state => state.dossierMedical.entity);
  const loading = useAppSelector(state => state.dossierMedical.loading);
  const updating = useAppSelector(state => state.dossierMedical.updating);
  const updateSuccess = useAppSelector(state => state.dossierMedical.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    navigate('/dossier-medical' + location.search);
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
    values.dateCreated = convertDateTimeToServer(values.dateCreated);
    values.dateUpdated = convertDateTimeToServer(values.dateUpdated);

    const entity = {
      ...dossierMedicalEntity,
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
        dateCreated: displayDefaultDateTime(),
        dateUpdated: displayDefaultDateTime(),
        author: account.login,
        patient: idPatient
      }
      : {
        ...dossierMedicalEntity,
        // dateCreated: convertDateTimeFromServer(dossierMedicalEntity.dateCreated),
        dateUpdated: displayDefaultDateTime(),
        patient: dossierMedicalEntity?.patient?.id,
        author: account.login,
      };

  return (
    <div style={{marginLeft:"16vw"}}>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ngirwiFrontEndApp.dossierMedical.home.createOrEditLabel" data-cy="DossierMedicalCreateUpdateHeading">
            Créer ou éditer un Dossier Medical
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
                <ValidatedField name="id" required readOnly id="dossier-medical-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Motif Consultation"
                id="dossier-medical-motifConsultation"
                name="motifConsultation"
                data-cy="motifConsultation"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Histoire Maladie"
                id="dossier-medical-histoireMaladie"
                name="histoireMaladie"
                data-cy="histoireMaladie"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Terrain"
                id="dossier-medical-terrain"
                name="terrain"
                data-cy="terrain"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Antecedants Personnels"
                id="dossier-medical-antecedantsPersonnels"
                name="antecedantsPersonnels"
                data-cy="antecedantsPersonnels"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Antecedants Chirurgicaux"
                id="dossier-medical-antecedantsChirurgicaux"
                name="antecedantsChirurgicaux"
                data-cy="antecedantsChirurgicaux"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Antecedants Familiaux"
                id="dossier-medical-antecedantsFamiliaux"
                name="antecedantsFamiliaux"
                data-cy="antecedantsFamiliaux"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField
                label="Gyneco Obstretrique"
                id="dossier-medical-gynecoObstretrique"
                name="gynecoObstretrique"
                data-cy="gynecoObstretrique"
                type="text"
              />
              <ValidatedField
                label="Résumé Syndromique"
                id="dossier-medical-syndromique"
                name="syndromique"
                data-cy="syndromique"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField label="Père" id="dossier-medical-dad" name="dad" data-cy="dad" type="text" />
              <ValidatedField label="Mère" id="dossier-medical-mom" name="mom" data-cy="mom" type="text" />
              <ValidatedField label="Frères" id="dossier-medical-siblings" name="siblings" data-cy="siblings" type="text" />
              <ValidatedField label="Descendants" id="dossier-medical-descendants" name="descendants" data-cy="descendants" type="text" />
              <ValidatedField
                hidden
                label="Date Created"
                id="dossier-medical-dateCreated"
                name="dateCreated"
                data-cy="dateCreated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                hidden
                label="Date Updated"
                id="dossier-medical-dateUpdated"
                name="dateUpdated"
                data-cy="dateUpdated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField hidden label="Author" id="dossier-medical-author" name="author" data-cy="author" type="text" />
              <ValidatedField hidden id="dossier-medical-patient" name="patient" data-cy="patient" label="Patient" type="select">
                <option value="" key="0" />
                {patients
                  ? patients.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.id}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dossier-medical" replace color="info">
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

export default DossierMedicalUpdate;
