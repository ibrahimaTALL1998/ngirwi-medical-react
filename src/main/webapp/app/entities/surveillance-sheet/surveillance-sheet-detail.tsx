import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './surveillance-sheet.reducer';

export const SurveillanceSheetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const surveillanceSheetEntity = useAppSelector(state => state.surveillanceSheet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="surveillanceSheetDetailsHeading">Surveillance Sheet</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{surveillanceSheetEntity.id}</dd>
          <dt>
            <span id="ta">Ta</span>
          </dt>
          <dd>{surveillanceSheetEntity.ta}</dd>
          <dt>
            <span id="temperature">Temperature</span>
          </dt>
          <dd>{surveillanceSheetEntity.temperature}</dd>
          <dt>
            <span id="pulseRate">Pulse Rate</span>
          </dt>
          <dd>{surveillanceSheetEntity.pulseRate}</dd>
          <dt>
            <span id="respiratoryFrequency">Respiratory Frequency</span>
          </dt>
          <dd>{surveillanceSheetEntity.respiratoryFrequency}</dd>
          <dt>
            <span id="recolorationTime">Recoloration Time</span>
          </dt>
          <dd>{surveillanceSheetEntity.recolorationTime}</dd>
          <dt>
            <span id="glasgow">Glasgow</span>
          </dt>
          <dd>{surveillanceSheetEntity.glasgow}</dd>
          <dt>
            <span id="gravityClass">Gravity Class</span>
          </dt>
          <dd>{surveillanceSheetEntity.gravityClass}</dd>
          <dt>
            <span id="horaryDiuresis">Horary Diuresis</span>
          </dt>
          <dd>{surveillanceSheetEntity.horaryDiuresis}</dd>
          <dt>
            <span id="spo2">Spo 2</span>
          </dt>
          <dd>{surveillanceSheetEntity.spo2}</dd>
          <dt>
            <span id="treatment">Treatment</span>
          </dt>
          <dd>{surveillanceSheetEntity.treatment}</dd>
          <dt>
            <span id="healthEvolution">Health Evolution</span>
          </dt>
          <dd>{surveillanceSheetEntity.healthEvolution}</dd>
          <dt>
            <span id="sheetDate">Sheet Date</span>
          </dt>
          <dd>{surveillanceSheetEntity.sheetDate}</dd>
          <dt>Hospitalisation</dt>
          <dd>{surveillanceSheetEntity.hospitalisation ? surveillanceSheetEntity.hospitalisation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/surveillance-sheet" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/surveillance-sheet/${surveillanceSheetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SurveillanceSheetDetail;
