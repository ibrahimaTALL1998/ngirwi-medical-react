import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './patient.reducer';

export const PatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const patientEntity = useAppSelector(state => state.patient.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="patientDetailsHeading">Patient</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{patientEntity.id}</dd>
          <dt>
            <span id="firstName">Prénom</span>
          </dt>
          <dd>{patientEntity.firstName}</dd>
          <dt>
            <span id="lastName">Nom</span>
          </dt>
          <dd>{patientEntity.lastName}</dd>
          <dt>
            <span id="birthday">Date de naissance</span>
          </dt>
          <dd>
            {patientEntity.birthday ? <TextFormat value={patientEntity.birthday} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="birthplace">Lieu de naissance</span>
          </dt>
          <dd>{patientEntity.birthplace}</dd>
          <dt>
            <span id="gender">Genre</span>
          </dt>
          <dd>{patientEntity.gender}</dd>
          <dt>
            <span id="adress">Adresse</span>
          </dt>
          <dd>{patientEntity.adress}</dd>
          <dt>
            <span id="phone">Téléphone</span>
          </dt>
          <dd>{patientEntity.phone}</dd>
          <dt>
            <span id="cni">Cni</span>
          </dt>
          <dd>{patientEntity.cni}</dd>
          <dt>
            <span id="job">Profession</span>
          </dt>
          <dd>{patientEntity.job}</dd>
          <dt>
            <span id="bloodType">Groupe Sanguin</span>
          </dt>
          <dd>{patientEntity.bloodType}</dd>
          <dt>
            <span id="maritialStatus">Status Matrimonial</span>
          </dt>
          <dd>{patientEntity.maritialStatus}</dd>
          <dt>
            <span id="dateCreated">Date de création</span>
          </dt>
          <dd>
            {patientEntity.dateCreated ? <TextFormat value={patientEntity.dateCreated} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dateUpdated">Date de mise à jour</span>
          </dt>
          <dd>
            {patientEntity.dateUpdated ? <TextFormat value={patientEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="author">Autheur</span>
          </dt>
          <dd>{patientEntity.author}</dd>
        </dl>
        <Button tag={Link} to="/patient" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/patient/${patientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dossier-medical/${patientEntity.id}/`} replace color="success">
          <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">Dossier Médical</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/consultation/new/${patientEntity.id}/`} replace color="warning">
          <FontAwesomeIcon icon="person" /> <span className="d-none d-md-inline">Consulter</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bill/new/${patientEntity.id}/`} replace color="info">
          <FontAwesomeIcon icon="money-bill" /> <span className="d-none d-md-inline">facture</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PatientDetail;
