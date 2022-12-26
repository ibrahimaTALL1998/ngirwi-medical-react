import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './hospitalisation.reducer';

export const HospitalisationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const hospitalisationEntity = useAppSelector(state => state.hospitalisation?.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="hospitalisationDetailsHeading">Hospitalisation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{hospitalisationEntity?.id}</dd>
          <dt>
            <span id="entryDate">Entry Date</span>
          </dt>
          <dd>
            {hospitalisationEntity?.entryDate ? (
              <TextFormat value={hospitalisationEntity?.entryDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="releaseDate">Release Date</span>
          </dt>
          <dd>
            {hospitalisationEntity?.releaseDate ? (
              <TextFormat value={hospitalisationEntity?.releaseDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="doctorName">Doctor Name</span>
          </dt>
          <dd>{hospitalisationEntity?.doctorName}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{hospitalisationEntity?.status}</dd>
          <dt>Patient</dt>
          <dd>{hospitalisationEntity?.patient ? hospitalisationEntity?.patient.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/hospitalisation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hospitalisation/${hospitalisationEntity?.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
      </Col>
    </Row>
  );
};

export default HospitalisationDetail;
