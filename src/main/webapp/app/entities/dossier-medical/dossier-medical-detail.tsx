import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity, getPatient } from './dossier-medical.reducer';

export const DossierMedicalDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    // console.log(dispatch(getPatient(id)).unwrap())
    if (dispatch(getPatient(id)).arg > 1){
      navigate(`/dossier-medical/new/${id}`)
    }
  }, []);

  const dossierMedicalEntity = useAppSelector(state => state.dossierMedical.entity);

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dossierMedicalDetailsHeading">Dossier Medical</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{dossierMedicalEntity.id}</dd>
          <dt>
            <span id="motifConsultation">Motif Consultation</span>
          </dt>
          <dd>{dossierMedicalEntity.motifConsultation}</dd>
          <dt>
            <span id="histoireMaladie">Histoire Maladie</span>
          </dt>
          <dd>{dossierMedicalEntity.histoireMaladie}</dd>
          <dt>
            <span id="terrain">Terrain</span>
          </dt>
          <dd>{dossierMedicalEntity.terrain}</dd>
          <dt>
            <span id="antecedantsPersonnels">Antecedants Personnels</span>
          </dt>
          <dd>{dossierMedicalEntity.antecedantsPersonnels}</dd>
          <dt>
            <span id="antecedantsChirurgicaux">Antecedants Chirurgicaux</span>
          </dt>
          <dd>{dossierMedicalEntity.antecedantsChirurgicaux}</dd>
          <dt>
            <span id="antecedantsFamiliaux">Antecedants Familiaux</span>
          </dt>
          <dd>{dossierMedicalEntity.antecedantsFamiliaux}</dd>
          <dt>
            <span id="gynecoObstretrique">Gyneco Obstretrique</span>
          </dt>
          <dd>{dossierMedicalEntity.gynecoObstretrique}</dd>
          <dt>
            <span id="syndromique">Résumé Syndromique</span>
          </dt>
          <dd>{dossierMedicalEntity.syndromique}</dd>
          <dt>
            <span id="dad">Père</span>
          </dt>
          <dd>{dossierMedicalEntity.dad}</dd>
          <dt>
            <span id="mom">Mère</span>
          </dt>
          <dd>{dossierMedicalEntity.mom}</dd>
          <dt>
            <span id="siblings">Frères</span>
          </dt>
          <dd>{dossierMedicalEntity.siblings}</dd>
          <dt>
            <span id="descendants">Descendants</span>
          </dt>
          <dd>{dossierMedicalEntity.descendants}</dd>
          <dt>
            <span id="dateCreated">Date de création</span>
          </dt>
          <dd>
            {dossierMedicalEntity.dateCreated ? (
              <TextFormat value={dossierMedicalEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateUpdated">Date de mise à jour</span>
          </dt>
          <dd>
            {dossierMedicalEntity.dateUpdated ? (
              <TextFormat value={dossierMedicalEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="author">Autheur</span>
          </dt>
          <dd>{dossierMedicalEntity.author}</dd>
          <dt>Patient</dt>
          <dd>{dossierMedicalEntity.patient ? dossierMedicalEntity.patient.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/dossier-medical" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dossier-medical/${dossierMedicalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DossierMedicalDetail;
