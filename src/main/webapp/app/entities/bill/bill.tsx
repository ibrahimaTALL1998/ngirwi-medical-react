import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount, ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBill } from 'app/shared/model/bill.model';
import { getEntities } from './bill.reducer';
import { BiTrash } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import Header from 'app/shared/layout/header/header';

export const Bill = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  // filter
  const [search, setSearch] = useState('');
  const [criteria, setCriteria] = useState(' ');

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const billList = useAppSelector(state => state.bill.entities);
  const loading = useAppSelector(state => state.bill.loading);
  const totalItems = useAppSelector(state => state.bill.totalItems);

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

  // filtering table
  const handleSearch = event => {
    setSearch(event.target.value);
  };

  let filter = null;
  if (search !== '') {
    switch (criteria) {
      case 'date':
        filter = billList.filter(bill => {
          return bill.date.includes(search);
        });
        break;
      case 'author':
        filter = billList.filter(bill => {
          return bill.author.toLowerCase().includes(search.toLowerCase());
        });
        break;
      case 'patient':
        filter = billList.filter(bill => {
          const all = bill.patient.lastName + ' ' + bill.patient.firstName;
          return all.toLowerCase().includes(search.toLowerCase());
        });
        break;
      default:
        filter = null;
    }
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
      <Header pageName="Factures" />

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
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '15vw',
              minHeight: '15vw',
              borderRadius: '50%',
              backgroundColor: '#CBDCF7',
              paddingTop: '25%',
              paddingLeft: '4%',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            <span
              onClick={() => handleSyncList()}
              style={{
                display: 'block',
                fontFamily: 'Ubuntu',
                color: '#56B5C5',
                fontSize: '18px',
                textAlign: 'center',
              }}
            >
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
              marginBottom: '5vh',
              boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
            }}
          >
            <span style={{ marginTop: '1.5%' }}>Liste des factures enregistrées</span>
          </Card>

          <Link
            to="/bill/new/"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              textAlign: 'center',
              color: '#56B5C5',
              minWidth: '15vw',
              minHeight: '15vw',
              borderRadius: '50%',
              backgroundColor: '#CBDCF7',
              fontSize: '18px',
            }}
          >
            <span style={{ display: 'block', marginTop: '20%' }}>
              {React.createElement(RiUserAddLine, { size: '24' })} Enregistrer nouvelle facture
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
              Factures enregistrées
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
                <option value="author">Auteur</option>
                <option value="patient">Patient</option>
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
              {/* <input type="text" id="search" name="search" placeholder="Barre de recherche" onChange={handleSearch} />  */}
            </div>
          </div>

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
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '10%',
                    backgroundColor: 'white',
                  }}
                  className="hand"
                  onClick={sort('id')}
                >
                  ID <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '10%',
                    backgroundColor: 'white',
                  }}
                  className="hand"
                  onClick={sort('date')}
                >
                  Date <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '25%',
                    backgroundColor: 'white',
                  }}
                  className="hand"
                  onClick={sort('author')}
                >
                  Auteur <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '25%',
                    backgroundColor: 'white',
                  }}
                  className="hand"
                  onClick={sort('patient')}
                >
                  Patient <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                </th>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    position: 'sticky',
                    top: '0',
                    width: '30%',
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
                backgroundAttachment: 'fixed',
                backgroundPosition: '65% 110%',
                backgroundSize: '50% 50%',
              }}
            >
              {filter === null
                ? billList.map((bill, i) => (
                    <tr style={{ border: '1px solid #E9F1FF', borderRadius: '15px' }} key={`entity-${i}`} data-cy="entityTable">
                      <td>
                        <Button tag={Link} to={`/bill/${bill.id}`} color="link" style={{ color: '#91A8CD', textDecoration: 'none' }}>
                          {bill.id}
                        </Button>
                      </td>
                      <td>{bill.date ? <TextFormat type="date" value={bill.date} format={APP_DATE_FORMAT} /> : null}</td>
                      <td style={{ wordBreak: 'break-all' }}>{bill.author}</td>
                      <td style={{ wordBreak: 'break-all' }}>
                        {bill.patient ? <span>{bill.patient.lastName.toUpperCase() + ' ' + bill.patient.firstName}</span> : ''}
                      </td>
                      <td className="text-end">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1px',
                            fontSize: '9px',
                          }}
                        >
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="primary"
                            size="sm"
                            data-cy="entityEditButton"
                          >
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/edit/voir?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="dark"
                            size="sm"
                            data-cy="entityDetailsButton"
                          >
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir Facture</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Supprimer</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                : filter.map((bill, i) => (
                    <tr style={{ border: '1px solid #E9F1FF', borderRadius: '15px' }} key={`entity-${i}`} data-cy="entityTable">
                      <td>
                        <Button tag={Link} to={`/bill/${bill.id}`} color="link" style={{ color: '#91A8CD', textDecoration: 'none' }}>
                          {bill.id}
                        </Button>
                      </td>
                      <td>{bill.date ? <TextFormat type="date" value={bill.date} format={APP_DATE_FORMAT} /> : null}</td>
                      <td style={{ wordBreak: 'break-all' }}>{bill.author}</td>
                      <td style={{ wordBreak: 'break-all' }}>
                        {bill.patient ? <span>{bill.patient.lastName.toUpperCase() + ' ' + bill.patient.firstName}</span> : ''}
                      </td>
                      <td className="text-end">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1px',
                            fontSize: '9px',
                          }}
                        >
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="primary"
                            size="sm"
                            data-cy="entityEditButton"
                          >
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/edit/voir?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="dark"
                            size="sm"
                            data-cy="entityDetailsButton"
                          >
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir Facture</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/bill/${bill.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
        </Card>
      </div>

      {/* <div style={{marginLeft:"16vw"}}>
        <h2 id="bill-heading" data-cy="BillHeading">
          Factures
          <div className="d-flex justify-content-end">
            <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} /> Actualiser la liste
            </Button>
            <Link to="/bill/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus" />
              &nbsp; Créer une nouvelle facture
            </Link>
          </div>
        </h2>
        <div className="table-responsive">
          {billList && billList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('date')}>
                    Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('author')}>
                    Author <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Patient <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {billList.map((bill, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/bill/${bill.id}`} color="link" size="sm">
                        {bill.id}
                      </Button>
                    </td>
                    <td>{bill.date ? <TextFormat type="date" value={bill.date} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{bill.author}</td>
                    <td>{bill.bill ? <Link to={`/bill/${bill.bill.id}`}>{bill.bill.id}</Link> : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/bill/${bill.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/bill/${bill.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/bill/${bill.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
            !loading && <div className="alert alert-warning">Aucun Bill trouvé</div>
          )}
        </div>
        {totalItems ? (
          <div className={billList && billList.length > 0 ? '' : 'd-none'}>
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
      </div>  */}
    </div>
  );
};

export default Bill;
