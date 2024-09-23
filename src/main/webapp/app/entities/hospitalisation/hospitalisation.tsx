import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount, ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IHospitalisation } from 'app/shared/model/hospitalisation.model';
import { getEntities } from './hospitalisation.reducer';
import { getEntity as getPatient } from '../patient/patient.reducer';
import Header from 'app/shared/layout/header/header';
import { RiUserAddLine } from 'react-icons/ri';

export const Hospitalisation = () => {
  const dispatch = useAppDispatch();
  const { idPatient } = useParams<'idPatient'>();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  // filter
  const [search, setSearch] = useState('');
  const [criteria, setCriteria] = useState(' ');

  const patientEntity = useAppSelector(state => state.patient?.entity);
  const hospitalisationList = useAppSelector(state => state.hospitalisation?.entities);
  const loading = useAppSelector(state => state.hospitalisation?.loading);
  const totalItems = useAppSelector(state => state.hospitalisation?.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
    dispatch(getPatient(idPatient));
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

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  let filter = null;
  if (search !== '') {
    switch (criteria) {
      case 'date':
        filter = hospitalisationList.filter(hospitalisation => {
          return hospitalisation.entryDate.includes(search);
        });
        break;
      case 'statut':
        filter = hospitalisationList.filter(hospitalisation => {
          return hospitalisation.status.toLowerCase().includes(search.toLowerCase());
        });
        break;
      default:
        filter = null;
    }
  }

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  function getDuration(dateString: string): string {
    // Check if the date string is in the expected format
    const dateParts = dateString.split('T');
    console.log(dateParts);
    if (dateParts.length !== 2) {
      throw new Error('Invalid date format. Expected format: DD/MM/YY HH:mm');
    }

    const [year, month, day] = dateParts[0].split('-');
    const [hour, minute] = dateParts[1].split(':');

    if (!day || !month || !year || !hour || !minute) {
      throw new Error('Invalid date format. Please check your input.');
    }

    // Create a Date object
    const eventDate = new Date(Number(`${year}`), Number(month) - 1, Number(day), Number(hour), Number(minute));

    console.log(eventDate);
    // Get today's date
    const today = new Date();

    // Calculate the difference in milliseconds
    const durationMs = today.getTime() - eventDate.getTime();

    // Convert milliseconds to a more readable format (e.g., days, hours, minutes)
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const durationHours = Math.floor(durationMinutes / 60);
    const durationDays = Math.floor(durationHours / 24);

    return `${durationDays} jours, ${durationHours % 24} heures, ${durationMinutes % 60} minutes`;
  }

  return (
    <div
      style={{
        paddingLeft: '16vw',
        paddingTop: '1%',
        fontFamily: 'Mulish',
        fontWeight: '900',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header pageName="Gestion hospitalisation" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: '15.5vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 3fr)',
            alignItems: 'center',
            columnGap: '5%',
            width: '75vw',
            marginLeft: '5%',
          }}
        >
          <div
            style={{
              display: 'flex',
              textDecoration: 'none',
              textAlign: 'center',
              color: '#56B5C5',
              minWidth: '15vw',
              minHeight: '15vw',
              borderRadius: '50%',
              backgroundColor: '#CBDCF7',
              fontSize: '18px',
              paddingTop: '25%',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span onClick={() => handleSyncList()} style={{ display: 'block', width: '90%', wordBreak: 'break-word' }}>
              <FontAwesomeIcon icon="sync" spin={loading} /> Actualiser la liste
            </span>
          </div>
          <Card
            style={{
              height: '6.28vh',
              width: '33.38vw',
              borderRadius: '20px',
              backgroundColor: '#11485C',
              textAlign: 'center',
              color: 'white',
              marginBottom: '4vw',
              boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
            }}
          >
            <span style={{ marginTop: '1.5%' }}>Liste des hospitalisations enregistrées</span>
          </Card>
          <Link
            to={`/hospitalisation/new/${idPatient}`}
            style={{
              display: 'flex',
              textDecoration: 'none',
              textAlign: 'center',
              color: '#56B5C5',
              minWidth: '15vw',
              minHeight: '15vw',
              borderRadius: '50%',
              backgroundColor: '#CBDCF7',
              fontSize: '18px',
              paddingTop: '20%',
              justifyContent: 'center',
            }}
          >
            <span style={{ display: 'block', width: '90%', wordBreak: 'break-word' }}>
              {React.createElement(RiUserAddLine, { size: '24' })} Enregistrer nouvelle hospitalisation
            </span>
          </Link>
        </div>

        <Card
          style={{
            width: '83vw',
            height: '70vh',
            backgroundColor: 'white',
            position: 'fixed',
            top: '32vh',
            marginRight: '1%',
            borderRadius: '15px 15px 0px 0px',
            boxShadow: '0px 2px 12px 4px rgba(138, 161, 203, 0.23)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
            <span style={{ color: '#141414', fontSize: '20px', marginLeft: '3%', marginBottom: '1%', width: '45vw' }}>
              Hospitalisations enregistrées
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: '3vh',
                marginRight: '2vw',
                gap: '1vw',
              }}
            >
              <ValidatedField
                style={{ borderRadius: '12px', width: '17vw' }}
                id="criteria"
                name="criteria"
                type="select"
                onChange={e => setCriteria(e.target.value)}
              >
                {/* <select name="criteria" > */}
                <option value=" ">Critère de recherche</option>
                <option value="date">Date</option>
                <option value="status">Statut</option>
                {/* </select> */}
              </ValidatedField>
              <ValidatedField
                style={{ borderRadius: '12px', width: '17vw' }}
                placeholder="Barre de recherche"
                id="search"
                name="search"
                type={criteria === 'date' ? 'date' : 'text'}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div style={{ marginLeft: '3%', fontSize: '15px' }}>
            <span>Patient:</span>
            <span style={{ textTransform: 'uppercase' }}>{' ' + patientEntity.lastName + ' '}</span>
            <span style={{ textTransform: 'capitalize' }}>{patientEntity.firstName}</span>{' '}
            <div>
              <span>Pièce d&apos;identité n°</span>
              <span style={{ textTransform: 'uppercase' }}>{' ' + patientEntity.cni}</span>
            </div>
          </div>

          {hospitalisationList && hospitalisationList.length > 0 ? (
            <Table responsive style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
              <thead
                style={{
                  position: 'sticky',
                  top: '0',
                }}
              >
                <tr>
                  <th
                    style={{
                      position: 'sticky',
                      top: '0',
                      width: '4%',
                      backgroundColor: 'white',
                    }}
                  ></th>
                  {/* <th
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '16%',
                    backgroundColor: 'white',
                  }}
                  className="hand"
                >
                  ID <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                </th> */}
                  <th
                    style={{
                      textAlign: 'center',
                      fontSize: '14px',
                      position: 'sticky',
                      top: '0',
                      width: '16%',
                      backgroundColor: 'white',
                    }}
                    className="hand"
                  >
                    Date entrée <FontAwesomeIcon style={{ marginLeft: '0px' }} icon="sort" />
                  </th>
                  <th
                    style={{
                      textAlign: 'center',
                      fontSize: '14px',
                      position: 'sticky',
                      top: '0',
                      width: '16%',
                      backgroundColor: 'white',
                    }}
                    className="hand"
                  >
                    Durée <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                  </th>
                  <th
                    style={{
                      textAlign: 'center',
                      fontSize: '14px',
                      position: 'sticky',
                      top: '0',
                      width: '16%',
                      backgroundColor: 'white',
                    }}
                    className="hand"
                  >
                    Statut <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                  </th>
                  <th
                    style={{
                      textAlign: 'center',
                      fontSize: '14px',
                      position: 'sticky',
                      top: '0',
                      width: '16%',
                      backgroundColor: 'white',
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  backgroundColor: '#F6FAFF',
                  border: '1px solid #F6FAFF',
                  borderRadius: '15px 15px 0px 15px',
                  fontSize: '15px',
                  textAlign: 'center',
                  borderBottom: '50px solid white',
                  backgroundImage: 'url(content/images/NgirwiLogo.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundAttachment: 'absolute',
                  backgroundPosition: '60% 165%',
                }}
              >
                {filter === null
                  ? hospitalisationList.map((hospitalisation, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td></td>
                        <td>
                          {hospitalisation.entryDate ? (
                            <TextFormat type="date" value={hospitalisation.entryDate} format={APP_DATE_FORMAT} />
                          ) : null}
                        </td>
                        {/* <td>
                      {hospitalisation.releaseDate ? (
                        <TextFormat type="date" value={hospitalisation.releaseDate} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td> */}
                        <td>{getDuration(hospitalisation.entryDate)}</td>
                        {/* <td>{hospitalisation.doctorName}</td> */}
                        <td>{hospitalisation.status}</td>
                        {/* <td>
                      {hospitalisation.patient ? <Link to={`/patient/${hospitalisation.patient.id}`}>{hospitalisation.patient.id}</Link> : ''}
                    </td> */}
                        <td className="text-end">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`/hospitalisation/${hospitalisation.id}/${patientEntity.id}`}
                              color="info"
                              size="sm"
                              data-cy="entityDetailsButton"
                            >
                              <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`/hospitalisation/${hospitalisation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                              color="primary"
                              size="sm"
                              data-cy="entityEditButton"
                            >
                              <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                            </Button>
                            {/* <Button
                          tag={Link}
                          to={`/hospitalisation/${hospitalisation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Supprimer</span>
                        </Button> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  : filter.map((hospitalisation, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td></td>
                        <td>
                          {hospitalisation.entryDate ? (
                            <TextFormat type="date" value={hospitalisation.entryDate} format={APP_DATE_FORMAT} />
                          ) : null}
                        </td>
                        {/* <td>
                      {hospitalisation.releaseDate ? (
                        <TextFormat type="date" value={hospitalisation.releaseDate} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td> */}
                        <td>{getDuration(hospitalisation.entryDate)}</td>
                        {/* <td>{hospitalisation.doctorName}</td> */}
                        <td>{hospitalisation.status}</td>
                        {/* <td>
                      {hospitalisation.patient ? <Link to={`/patient/${hospitalisation.patient.id}`}>{hospitalisation.patient.id}</Link> : ''}
                    </td> */}
                        <td className="text-end">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`/hospitalisation/${hospitalisation.id}/${patientEntity.id}`}
                              color="info"
                              size="sm"
                              data-cy="entityDetailsButton"
                            >
                              <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`/hospitalisation/${hospitalisation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                              color="primary"
                              size="sm"
                              data-cy="entityEditButton"
                            >
                              <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                            </Button>
                            {/* <Button
                          tag={Link}
                          to={`/hospitalisation/${hospitalisation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Supprimer</span>
                        </Button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">Aucune Hospitalisation trouvée</div>

              // <Table responsive style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
              //   <thead
              //     style={{
              //       position: 'sticky',
              //       top: '0',
              //     }}
              //   >
              //     <tr>
              //       <th
              //         style={{
              //           position: 'sticky',
              //           top: '0',
              //           width: '4%',
              //           backgroundColor: 'white',
              //         }}
              //       ></th>
              //       <th
              //         style={{
              //           textAlign: 'center',
              //           fontSize: '14px',
              //           position: 'sticky',
              //           top: '0',
              //           width: '16%',
              //           backgroundColor: 'white',
              //         }}
              //         className="hand"
              //       >
              //         Date entrée <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
              //       </th>
              //       <th
              //         style={{
              //           textAlign: 'center',
              //           fontSize: '14px',
              //           position: 'sticky',
              //           top: '0',
              //           width: '16%',
              //           backgroundColor: 'white',
              //         }}
              //         className="hand"
              //       >
              //         Durée <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
              //       </th>
              //       <th
              //         style={{
              //           textAlign: 'center',
              //           fontSize: '14px',
              //           position: 'sticky',
              //           top: '0',
              //           width: '16%',
              //           backgroundColor: 'white',
              //         }}
              //         className="hand"
              //       >
              //         Statut <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
              //       </th>
              //       <th
              //         style={{
              //           textAlign: 'center',
              //           fontSize: '14px',
              //           position: 'sticky',
              //           top: '0',
              //           width: '16%',
              //           backgroundColor: 'white',
              //         }}
              //       >
              //         Actions
              //       </th>
              //     </tr>
              //   </thead>
              //   <tbody
              //     style={{
              //       backgroundColor: '#F6FAFF',
              //       border: '1px solid #F6FAFF',
              //       borderRadius: '15px 15px 0px 15px',
              //       fontSize: '15px',
              //       textAlign: 'center',
              //       borderBottom: '50px solid white',
              //       backgroundImage: 'url(content/images/NgirwiLogo.png)',
              //       backgroundRepeat: 'no-repeat',
              //       backgroundAttachment: 'absolute',
              //       backgroundPosition: '60% 165%',
              //     }}
              //   >
              //     <tr>
              //       <td></td>
              //       <td>31/12/2022T12:02:00</td>
              //       <td>1 jour</td>
              //       <td>EN COURS</td>
              //       <td className="text-center">
              //         <div className="btn-group flex-btn-group-container">
              //           <Button
              //             tag={Link}
              //             to={`/hospitalisation/1051/${patientEntity.id}`}
              //             color="info"
              //             size="sm"
              //             data-cy="entityDetailsButton"
              //           >
              //             <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
              //           </Button>
              //         </div>
              //       </td>
              //     </tr>
              //   </tbody>
              // </Table>
            )
          )}
        </Card>
      </div>
    </div>
  );
};

export default Hospitalisation;
