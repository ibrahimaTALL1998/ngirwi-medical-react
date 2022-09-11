import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './consultation.reducer';

export const ConsultationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const consultationEntity = useAppSelector(state => state.consultation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="consultationDetailsHeading">Consultation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{consultationEntity.id}</dd>
          <dt>
            <span id="dateTime">Date et heure</span>
          </dt>
          <dd>
            {consultationEntity.dateTime ? <TextFormat value={consultationEntity.dateTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="temperature">Temperature</span>
          </dt>
          <dd>{consultationEntity.temperature}</dd>
          <dt>
            <span id="weight">Poids</span>
          </dt>
          <dd>{consultationEntity.weight}</dd>
          <dt>
            <span id="tension">Tension</span>
          </dt>
          <dd>{consultationEntity.tension}</dd>
          <dt>
            <span id="glycemie">Glycemie</span>
          </dt>
          <dd>{consultationEntity.glycemie}</dd>
          <dt>
            <span id="comment">Commentaire</span>
          </dt>
          <dd>{consultationEntity.comment}</dd>
          <dt>
            <span id="hypothesis">Hypothèse diagnostique</span>
          </dt>
          <dd>{consultationEntity.hypothesis}</dd>
          <dt>
            <span id="exams">Examens</span>
          </dt>
          <dd>{consultationEntity.exams}</dd>
          <dt>
            <span id="treatment">Traitement</span>
          </dt>
          <dd>{consultationEntity.treatment}</dd>
          <dt>
            <span id="author">Autheur</span>
          </dt>
          <dd>{consultationEntity.author}</dd>
          <dt>Patient</dt>
          <dd>{consultationEntity.patient ? <Link to={`/patient/${consultationEntity.patient.id}`}>{consultationEntity.patient.lastName}</Link> : ''}</dd>
        </dl>
        <Button tag={Link} to="/consultation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/consultation/${consultationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prescription/new/${consultationEntity.id}`} replace color="success">
          <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">Ordonnance</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ConsultationDetail;
