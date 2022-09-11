import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntities as getPrescriptions } from 'app/entities/prescription/prescription.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntity, updateEntity, createEntity, reset } from './consultation.reducer';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { examsList } from 'app/shared/util/exams-list';

export const ConsultationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const prescriptions = useAppSelector(state => state.prescription.entities);
  const consultationEntity = useAppSelector(state => state.consultation.entity);
  const loading = useAppSelector(state => state.consultation.loading);
  const updating = useAppSelector(state => state.consultation.updating);
  const updateSuccess = useAppSelector(state => state.consultation.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);
  // const [exams, setExams] = useState([{"label" : '', "value" : ''}])
  const [exams, setExams] = useState(Object)


  const handleClose = () => {
    navigate('/consultation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPatients({}));
    dispatch(getPrescriptions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateTime = convertDateTimeToServer(values.dateTime);

    const entity = {
      ...consultationEntity,
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

        dateTime: displayDefaultDateTime(),
        author: account.login,
        exams: JSON.stringify(exams),
        patient: idPatient, 
      }
      : {
        ...consultationEntity,
        dateTime: convertDateTimeFromServer(consultationEntity.dateTime),
        patient: consultationEntity?.patient?.id,
        author: account.login,
      };

  const animatedComponents = makeAnimated();

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ngirwiFrontEndApp.consultation.home.createOrEditLabel" data-cy="ConsultationCreateUpdateHeading">
            Créer ou éditer un Consultation
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" disabled required readOnly id="consultation-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                disabled
                label="Date et heure"
                id="consultation-dateTime"
                name="dateTime"
                data-cy="dateTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Temperature"
                id="consultation-temperature"
                name="temperature"
                data-cy="temperature"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                  validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                }}
              />
              <ValidatedField
                label="Poids"
                id="consultation-weight"
                name="weight"
                data-cy="weight"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                  validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                }}
              />
              <ValidatedField
                label="Tension"
                id="consultation-tension"
                name="tension"
                data-cy="tension"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField label="Glycemie" id="consultation-glycemie" name="glycemie" data-cy="glycemie" type="text" />
              <ValidatedField label="Commentaire" id="consultation-comment" name="comment" data-cy="comment" type="text" />
              <ValidatedField
                label="Hypothèse diagnostique"
                id="consultation-hypothesis"
                name="hypothesis"
                data-cy="hypothesis"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <Label>Examens paracliniques</Label>
              <Select options={examsList} components={animatedComponents} isMulti onChange={(e) => setExams(e)} />
              {/* <ValidatedField
                label="Exams"
                id="consultation-exams"
                name="exams"
                data-cy="exams"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              /> */}
              <ValidatedField
                label="Traitement"
                id="consultation-treatment"
                name="treatment"
                data-cy="treatment"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
              />
              <ValidatedField hidden label="Author" id="consultation-author" name="author" data-cy="author" type="text" />
              <ValidatedField disabled id="consultation-patient" name="patient" data-cy="patient" label="Patient" type="select">
                <option value="" key="0" />
                {patients
                  ? patients.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.lastName + ' ' + otherEntity.firstName + ' (' +otherEntity.birthday +')'}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/consultation" replace color="info">
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

export default ConsultationUpdate;
