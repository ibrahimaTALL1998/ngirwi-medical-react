import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDossierMedical } from 'app/shared/model/dossier-medical.model';
import { getEntities } from './dossier-medical.reducer';

export const DossierMedical = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const dossierMedicalList = useAppSelector(state => state.dossierMedical.entities);
  const loading = useAppSelector(state => state.dossierMedical.loading);
  const totalItems = useAppSelector(state => state.dossierMedical.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div style={{marginLeft:"16vw"}}>
      <h2 id="dossier-medical-heading" data-cy="DossierMedicalHeading">
        Dossiers Médicaux
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Actualiser la liste
          </Button>
          <Link to="/dossier-medical/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Créer un nouveau Dossier Medical
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {dossierMedicalList && dossierMedicalList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('motifConsultation')}>
                  Motif Consultation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('histoireMaladie')}>
                  Histoire Maladie <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terrain')}>
                  Terrain <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('antecedantsPersonnels')}>
                  Antecedants Personnels <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('antecedantsChirurgicaux')}>
                  Antecedants Chirurgicaux <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('antecedantsFamiliaux')}>
                  Antecedants Familiaux <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gynecoObstretrique')}>
                  Gyneco Obstretrique <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('syndromique')}>
                  Résumé Syndromique <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dad')}>
                  Père <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mom')}>
                  Mère <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('siblings')}>
                  Frères <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('descendants')}>
                  Descendants <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateCreated')}>
                  Date de création <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateUpdated')}>
                  Date de mise à jour <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('author')}>
                  Autheur <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Patient <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dossierMedicalList.map((dossierMedical, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/dossier-medical/${dossierMedical.id}`} color="link" size="sm">
                      {dossierMedical.id}
                    </Button>
                  </td>
                  <td>{dossierMedical.motifConsultation}</td>
                  <td>{dossierMedical.histoireMaladie}</td>
                  <td>{dossierMedical.terrain}</td>
                  <td>{dossierMedical.antecedantsPersonnels}</td>
                  <td>{dossierMedical.antecedantsChirurgicaux}</td>
                  <td>{dossierMedical.antecedantsFamiliaux}</td>
                  <td>{dossierMedical.gynecoObstretrique}</td>
                  <td>{dossierMedical.syndromique}</td>
                  <td>{dossierMedical.dad}</td>
                  <td>{dossierMedical.mom}</td>
                  <td>{dossierMedical.siblings}</td>
                  <td>{dossierMedical.descendants}</td>
                  <td>
                    {dossierMedical.dateCreated ? (
                      <TextFormat type="date" value={dossierMedical.dateCreated} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {dossierMedical.dateUpdated ? (
                      <TextFormat type="date" value={dossierMedical.dateUpdated} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{dossierMedical.author}</td>
                  <td>
                    {dossierMedical.patient ? <Link to={`/patient/${dossierMedical.patient.id}`}>{dossierMedical.patient.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/dossier-medical/${dossierMedical.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/dossier-medical/${dossierMedical.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/dossier-medical/${dossierMedical.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Supprimer</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">Aucun Dossier Medical trouvé</div>
        )}
      </div>
      {totalItems ? (
        <div className={dossierMedicalList && dossierMedicalList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DossierMedical;
