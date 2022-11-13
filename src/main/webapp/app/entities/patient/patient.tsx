import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Label, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount, ValidatedField } from 'react-jhipster';
import { RiUserAddLine } from 'react-icons/ri';
import {BiTrash} from 'react-icons/bi';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { translateBloodType, translateGender, translateMaritalStatus } from 'app/shared/util/translation-utils';

import {FiLogOut} from 'react-icons/fi';

import {Scrollbars} from 'react-custom-scrollbars'

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities } from './patient.reducer';
import { AiOutlineSearch } from 'react-icons/ai';
import Header from 'app/shared/layout/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Patient = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const patientList = useAppSelector(state => state.patient.entities);
  const loading = useAppSelector(state => state.patient.loading);
  const totalItems = useAppSelector(state => state.patient.totalItems);

  // filter
  const [search, setSearch] = useState('');
  const [criteria, setCriteria] = useState(' ');

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
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  let filter = null
  if (search !== '') {
    switch (criteria) {
      case 'lastName':
        filter = patientList.filter(patient => {
          return patient.lastName.toLowerCase().includes(search.toLowerCase());
        })
        break;
      case 'firstName':
        filter = patientList.filter(patient => {
          return patient.firstName.toLowerCase().includes(search.toLowerCase());
        })
        break;
      case 'birthday':
        filter = patientList.filter(patient => {
          return patient.birthday.toLowerCase().includes(search.toLowerCase());
        })
        break;
      case 'cni':
        filter = patientList.filter(patient => {
          return patient.cni.toLowerCase().includes(search.toLowerCase());
        })
        break;
      default: filter=null;
    }
  }

  const [query, setQuery] = useState("");
  return (
<>
<div
        style={{
          paddingLeft:"16vw",
          paddingTop:"1%",
          fontFamily:"Mulish",
          fontWeight:"900",
          display:"flex",
          flexDirection:"column",
        }}    
    >

          <Header pageName="Gestion patients"/>

          <div
            style={{
              display:"flex",
              flexDirection:"column",
              position:"fixed",
              top:"15.5vh",

            }}          
          >
            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(3, 3fr)",
                alignItems:"center",
                columnGap:"5%",
                width:"75vw",
                marginLeft:"5%"
              }}
            >

              
              <Link to="/patient/new/"
                    style={{
                      display:"inline-block",
                      textDecoration:"none",
                      textAlign:"center", 
                      color:"#56B5C5",
                      minWidth:"15vw",
                      minHeight:"15vw",
                      borderRadius:"50%",
                      backgroundColor:"#CBDCF7",
                      fontSize:"18px",
                      }}
                    >
                    <span
                    
                    style={{display:"block",backgroundColor:'transparent',marginTop:"20%"}}>
                      {React.createElement( RiUserAddLine  ,{size: "24"})}   Enregistrer nouveau patient
                    </span>
                   
                                 
                  </Link>
              <Card
                style={{
                  height:"6.28vh",
                  width:"33.38vw",
                  borderRadius:"20px",
                  backgroundColor:"#11485C",
                  textAlign:"center",
                  color:"white",
                  marginBottom:"5vh",
                  boxShadow:"0px 10px 50px rgba(138, 161, 203, 0.23)",
                  }}
              >
              <span style={{marginTop:"1.5%"}}>Liste des patients enregistrés</span>
              </Card>
              <Link to="/consultation/new/"
                    style={{
                      display:"inline-block",
                      textDecoration:"none",
                      textAlign:"center", 
                      color:"#56B5C5",
                      minWidth:"15vw",
                      minHeight:"15vw",
                      borderRadius:"50%",
                      backgroundColor:"#CBDCF7",
                      fontSize:"18px",
                      }}
                    >
                    <span
                    style={{display:"block",backgroundColor:'transparent',marginTop:"20%"}}>
                      {React.createElement( RiUserAddLine  ,{size: "24"})}   Enregistrer nouvelle consultation
                    </span>
                   
                                 
                  </Link>
          
          

            
            </div>



            <Card
              style={{
                width:"83vw",
                height:"70vh",
                backgroundColor:"white",
                position:"fixed",
                top:"32vh",
                marginRight:"1%",
                borderRadius:"15px 15px 0px 0px",
                boxShadow:"0px 2px 12px 4px rgba(138, 161, 203, 0.23)"


              }}
            >
                            <div style={{display:"flex",flexDirection:"row",marginTop:"1%"}}>
                  <span style={{ color:"#141414",fontSize:"20px", marginLeft:"3%", marginBottom:"1%",width:"45vw"}}>Patients enregistrés</span>

                  <div 
                    style={{
                      display:"flex",
                      flexDirection:"row",
                      justifyContent:"flex-end",
                      marginBottom:"3vh",
                      marginRight:"2vw",
                      gap:"1vw"
                    }}
                  >
                    <ValidatedField  style={{borderRadius:"12px",width:"17vw"}}  id="criteria" name="criteria" type="select" onChange={(e) => setCriteria(e.target.value)}>
                     {/* <select name="criteria" > */}
                      <option value=" ">
                        Critère de recherche
                      </option>
                      <option value="lastName">
                        Nom
                      </option>
                      <option value="firstName">
                        Prénom
                      </option>
                      <option value="birthday">
                        Date de naissance
                      </option>
                      <option value="cni">
                        Numéro de carte d&apos;identité
                      </option>
                        {/* </select> */}


                  </ValidatedField>
                    <ValidatedField  style={{borderRadius:"12px",width:"17vw"}} placeholder="Barre de recherche" id="search" name="search" type={criteria==="birthday"?"date":"text"}  onChange={handleSearch} />
                      {/* <input type="text" id="search" name="search" placeholder="Barre de recherche" onChange={handleSearch} />  */}

                  </div>
                </div>

              
    
                <Table responsive
                
                >
                <thead
                
                style={{
                  position:"sticky",
                  top:"0"
                }}
                >
                <tr>
                  <th
                    style={{
                      position:"sticky",
                      top:"0",
                      width:"4%",
                      backgroundColor:"white",
                    }}                               
                  ></th>
                  <th 
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                    className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon style={{marginLeft:"10px"}} icon="sort" />
                  </th>
                  <th
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('firstName')}>
                    Prénom <FontAwesomeIcon style={{marginLeft:"10px"}} icon="sort" />
                  </th>
                  <th 
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('lastName')}>
                    Nom <FontAwesomeIcon style={{marginLeft:"10px"}} icon="sort" />
                  </th>
                  <th 
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('birthday')}>
                    Date de naissance <FontAwesomeIcon style={{marginLeft:"10px"}} icon="sort" />
                  </th>
                  <th 
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('cni')}>
                    Cni <FontAwesomeIcon style={{marginLeft:"10px"}} icon="sort" />
                  </th>
                      
                  <th
                  style={{
                    textAlign:"center",
                    fontSize:"14px",
                    position:"sticky",
                    top:"0",
                    width:"16%",
                    backgroundColor:"white",
                  }}
                  >Actions</th>
                </tr>
              </thead>
              <tbody
                style={{
                  backgroundColor:"#F6FAFF",
                  border:"1px solid #F6FAFF",
                  borderRadius:"15px 15px 0px 15px",
                  fontSize:"15px",
                  textAlign:"center",
                  borderBottom:"50px solid white",
                }}
              >
                {filter === null ? patientList.map((patient, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable" >
                    <td>
                      <Button
                        tag={Link}
                        to={`/patient/${patient.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        data-cy="entityDeleteButton"
                        style={{color:"red",backgroundColor:"#F6FAFF",borderColor:"#F6FAFF"}}
                      >
                        {React.createElement( BiTrash, {size: "15"})}
                      </Button>
                    </td>
                    
                    <td >
                      <Button tag={Link} to={`/patient/${patient.id}`} color="link"  style={{color:"#91A8CD",textDecoration:"none",}} >
                        {patient.id}
                      </Button>
                    </td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.birthday ? <TextFormat type="date" value={patient.birthday} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                    <td>{patient.cni}</td>
                    <td className="text-end">
                      <div 
                        style={{
                          display:"flex",
                          flexDirection:"column",
                          gap:"1px",
                          fontSize:"9px"
                        }}
                      >
                      <Button
                        tag={Link}
                        to={`/patient/${patient.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil" /> <span className="d-none d-md-inline">Mettre à jour</span>
                      </Button>
                        <Button tag={Link} to={`/patient/${patient.id}`} color="dark" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir détails</span>
                        </Button>
                        

                      </div>
                    </td>
                  </tr>
                )) : filter.map((patient, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    
                    <td>
                      <Button
                        tag={Link}
                        to={`/patient/${patient.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        data-cy="entityDeleteButton"
                        style={{color:"red",backgroundColor:"#F6FAFF",borderColor:"#F6FAFF"}}
                      >
                        {React.createElement( BiTrash, {size: "15"})}
                      </Button>
                    </td><td>
                      <Button tag={Link} to={`/patient/${patient.id}`} color="link" size="sm">
                        {patient.id}
                      </Button>
                    </td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.birthday ? <TextFormat type="date" value={patient.birthday} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                    
                    <td>{patient.cni}</td>
                    <td className="text-end">
                      <div 
                        style={{
                          display:"flex",
                          flexDirection:"column",
                          gap:"1px",
                          fontSize:"9px"
                        }}
                      >
                      <Button
                        tag={Link}
                        to={`/patient/${patient.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil" /> <span className="d-none d-md-inline">Mettre à jour</span>
                      </Button>
                        <Button tag={Link} to={`/patient/${patient.id}`} color="dark" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir détails</span>
                        </Button>
                        

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
                </Table>
              


            </Card>
          </div>
</div>










                         {/* <div>
     <div>
       <h2 id="patient-heading" data-cy="PatientHeading">
         Patients
         <div className="d-flex justify-content-end">
           <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
             <FontAwesomeIcon icon="sync" spin={loading} /> Actualiser la liste
           </Button>
           <Link to="/patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
             <FontAwesomeIcon icon="plus" />
             &nbsp; Créer un nouveau Patient
           </Link>
         </div>
       </h2>
       <div className="d-flex justify-content-center">
         <ValidatedField label="Critère de recherche:" id="criteria" name="criteria" type="select" onChange={(e) => setCriteria(e.target.value)}>
           <select name="criteria" >
           <option value="lastName">
             Nom
           </option>
           <option value="firstName">
             Prénom
           </option>
           <option value="birthday">
             Date de naissance
           </option>
           <option value="phone">
             Numéro de téléphone
           </option>
           <option value="cni">
             Numéro de carte d'identité
           </option>
           <option value="maritialStatus">
             Status matrimonial
           </option>
           { </select>
     
    
       </ValidatedField>
         &nbsp;&nbsp;&nbsp;
          <Label>Barre de recherche:</Label> 
         <ValidatedField label="Barre de recherche:" id="search" name="search" type="text" onChange={handleSearch} />
          <input type="text" id="search" name="search" placeholder="Barre de recherche" onChange={handleSearch} /> 

       </div>

       <div className="table-responsive">
         {patientList && patientList.length > 0 ? ( }
           <Table responsive>
             <thead>
               <tr>
                 <th className="hand" onClick={sort('id')}>
                   ID <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('firstName')}>
                   Prénom <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('lastName')}>
                   Nom <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('birthday')}>
                   Date de naissance <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('birthplace')}>
                   Lieu de naissance <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('gender')}>
                   Genre <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('adress')}>
                   Adresse <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('phone')}>
                   Téléphone <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('cni')}>
                   Cni <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('job')}>
                   Profession <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('bloodType')}>
                   Groupe Sanguin <FontAwesomeIcon icon="sort" />
                 </th>
                 <th className="hand" onClick={sort('maritialStatus')}>
                   Status Matrimonial <FontAwesomeIcon icon="sort" />
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
                 <th />
               </tr>
             </thead>
             <tbody>
               {filter === null ? patientList.map((patient, i) => (
                 <tr key={`entity-${i}`} data-cy="entityTable">
                   <td>
                     <Button tag={Link} to={`/patient/${patient.id}`} color="link" size="sm">
                       {patient.id}
                     </Button>
                   </td>
                   <td>{patient.firstName}</td>
                   <td>{patient.lastName}</td>
                   <td>{patient.birthday ? <TextFormat type="date" value={patient.birthday} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                   <td>{patient.birthplace}</td>
                   <td>{patient.gender}</td>
                   <td>{patient.adress}</td>
                   <td>{patient.phone}</td>
                   <td>{patient.cni}</td>
                   <td>{patient.job}</td>
                   <td>{patient.bloodType}</td>
                   <td>{patient.maritialStatus}</td>
                   <td>{patient.dateCreated ? <TextFormat type="date" value={patient.dateCreated} format={APP_DATE_FORMAT} /> : null}</td>
                   <td>{patient.dateUpdated ? <TextFormat type="date" value={patient.dateUpdated} format={APP_DATE_FORMAT} /> : null}</td>
                   <td>{patient.author}</td>
                   <td className="text-end">
                     <div className="btn-group flex-btn-group-container">
                       <Button tag={Link} to={`/patient/${patient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                       </Button>
                       <Button
                         tag={Link}
                         to={`/patient/${patient.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                         color="primary"
                         size="sm"
                         data-cy="entityEditButton"
                       >
                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                       </Button>
                       <Button
                         tag={Link}
                         to={`/patient/${patient.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                         color="danger"
                         size="sm"
                         data-cy="entityDeleteButton"
                       >
                         <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Supprimer</span>
                       </Button>
                     </div>
                   </td>
                 </tr>
               )) : filter.map((patient, i) => (
                 <tr key={`entity-${i}`} data-cy="entityTable">
                   <td>
                     <Button tag={Link} to={`/patient/${patient.id}`} color="link" size="sm">
                       {patient.id}
                     </Button>
                   </td>
                   <td>{patient.firstName}</td>
                   <td>{patient.lastName}</td>
                   <td>{patient.birthday ? <TextFormat type="date" value={patient.birthday} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                   <td>{patient.birthplace}</td>
                   
                   <td>{translateGender(patient.gender)}</td> 
                   <td>{patient.adress}</td>
                   <td>{patient.phone}</td>
                   <td>{patient.cni}</td>
                   <td>{patient.job}</td>
                   <td>{patient.bloodType}</td>
                   <td>{translateMaritalStatus(patient.maritialStatus)}</td>
                   <td>{patient.dateCreated ? <TextFormat type="date" value={patient.dateCreated} format={APP_DATE_FORMAT} /> : null}</td>
                   <td>{patient.dateUpdated ? <TextFormat type="date" value={patient.dateUpdated} format={APP_DATE_FORMAT} /> : null}</td>
                   <td>{patient.author}</td>
                   <td className="text-end">
                     <div className="btn-group flex-btn-group-container">
                       <Button tag={Link} to={`/patient/${patient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Voir</span>
                       </Button>
                       <Button
                         tag={Link}
                         to={`/patient/${patient.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                         color="primary"
                         size="sm"
                         data-cy="entityEditButton"
                       >
                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
                       </Button>
                       <Button
                         tag={Link}
                         to={`/patient/${patient.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
           !loading && <div className="alert alert-warning">Aucun Patient trouvé</div>
         )}
       </div>
       {totalItems ? (
         <div className={patientList && patientList.length > 0 ? '' : 'd-none'}>
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
     </div> */}
</>
  );
};

export default Patient;
