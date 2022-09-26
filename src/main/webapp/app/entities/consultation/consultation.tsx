import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount, ValidatedField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities } from './consultation.reducer';
import { FiLogOut } from 'react-icons/fi';
import { RiUserAddLine } from 'react-icons/ri';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

export const Consultation = () => {
  const dispatch = useAppDispatch();

  const patientList = useAppSelector(state => state.patient.entities);

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const consultationList = useAppSelector(state => state.consultation.entities);
  const loading = useAppSelector(state => state.consultation.loading);
  const totalItems = useAppSelector(state => state.consultation.totalItems);

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
          flexDirection:"column"
        }}    
    >
          <div style={{display:"flex", flexDirection:"row",gap:"50vw", fontFamily:"Jost", fontSize:"20px",position:"fixed" , zIndex:"1"}}>
            <span>Gestion Consultations</span>  
            <div style={{display:"flex", flexDirection:"row", alignItems:"flex-start", gap:"2vw"}}> 
          <div style={{display:"flex", flexDirection:"column"}}>
          
          <span style={{position:"fixed", top:"2%",marginLeft:"1%"}}>{React.createElement(AiOutlineSearch, {size : '13'} )}</span> 
           <ValidatedField name='search'  placeholder="   Rechercher..." onChange={event =>setQuery(event.target.value)} style={{backgroundColor:"#F9F9FB", fontFamily:"Mulish", fontWeight:"900",borderRadius:"15px",height:"5vh",borderColor:"#F9F9FB",fontSize:"10px",paddingLeft:"30px"}} />
              {  
              patientList.filter(post => {
              if (query === "") {
              
                post = "Recherche de patients..."
                return post;
              } else if (post.lastName.toLowerCase().includes(query.toLowerCase())) {
               
                return post;
              }else if (post.firstName.toLowerCase().includes(query.toLowerCase())) {
               
                return post;
              }else{
                post = null;
                return post;
              }
            }).map((patient, i)=> 
                <Link hidden={query===""?true:false} key={patient.id} to={`/patient/${patient.id}`} style={{backgroundColor:"white",margin:"0px",position:"sticky",top:"0",borderColor:"#F9F9FB",color:"#11485C", borderRadius:"3px",textDecoration:"none",height:"5vh",fontSize:"13px"}}>{patient.firstName+' '+patient.lastName}</Link>                   
            )
              }
            
          </div>
   
              <Link to="/logout" style={{color:"silver", fontWeight:"900"}}>
                <div>{React.createElement(FiLogOut)} </div>
              </Link>
            </div>
          </div>

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

              <div
                style={{
                  justifyContent:"center",
                  alignItems:"center",
                  width:"15vw",
                  height:"25vh",
                  borderRadius:"50%",
                  backgroundColor:"#CBDCF7",
                  paddingTop:"9vh",
                  paddingLeft:"6%",
                  color:"#56B5C5"
                }}
              >
                  <Link style={{textDecoration:"none"}} to="/patient/new">
                    <span 
                      style={{
                        color:"#56B5C5",
                        fontSize:"15px",
                        fontFamily:"Ubuntu"
                        }}
                    >
                    {React.createElement( RiUserAddLine  ,{size: "15"})}  Enregistrer nouveau patient
                    </span>                
                  </Link>
                
              </div>

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
              <span style={{marginTop:"1.5%"}}>Liste des consultations enregistrées</span>
              </Card>

              <div
                style={{
                  justifyContent:"center",
                  alignItems:"center",
                  width:"15vw",
                  height:"25vh",
                  borderRadius:"50%",
                  backgroundColor:"#CBDCF7",
                  paddingTop:"10vh",
                  paddingLeft:"3%"
                }}
              >
                  <Link to="/consultation/new/" style={{textDecoration:"none",color:"#56B5C5"}}>
                    <span 
                      style={{
                        fontFamily:"Ubuntu",
                        color:"#56B5C5",
                        fontSize:"15px",
                        }}
                    >
                     {React.createElement( RiUserAddLine  ,{size: "15"})} Enregistrer consultation
                    </span>                
                  </Link>
                
              </div>
          

            
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
              <span style={{marginTop:"1%", color:"#141414",fontSize:"15px", marginLeft:"3%", marginBottom:"1%"}}>Consultations enregistrées</span>
                   {consultationList && consultationList.length > 0 ? (

                <Table responsive>
                <thead>
                <tr>
                  <th
                    style={{
                      fontSize:"9px",
                      position:"sticky",
                      top:"0",
                      backgroundColor:"white",
                    }}                
                  ></th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                    className="hand" onClick={sort('id')}>
                    ID 
                  </th>
                  <th
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('firstName')}>
                    Date et Heure 
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('lastName')}>
                    Temperature  
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('birthday')}>
                    Poids
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('birthplace')}>
                    Tension 
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('gender')}>
                    Glycémie 
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('adress')}>
                    Commentaire
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('phone')}>
                    Hypotèse diagnostique 
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('cni')}>
                     Examens
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('job')}>
                    Traitement 
                  </th>
                  <th 
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
                    backgroundColor:"white",
                  }}
                  className="hand" onClick={sort('bloodType')}>
                    Patients
                  </th>

                      
                  <th
                  style={{
                    fontSize:"9px",
                    position:"sticky",
                    top:"0",
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
                  fontSize:"9px",
                  borderBottom:"50px solid white",
                }}
              >
             {consultationList.map((consultation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">               
                    <td>
                      <Button
                        tag={Link}
                        to={`/consultation/${consultation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}                        data-cy="entityDeleteButton"
                        style={{color:"red",backgroundColor:"#F6FAFF",borderColor:"#F6FAFF"}}
                      >
                        {React.createElement( BiTrash, {size: "15"})}
                      </Button>
                    </td>
                   

                    <td>
                     <Button tag={Link} to={`/consultation/${consultation.id}`} color="link" size="sm">
                       {consultation.id}
                     </Button>
                   </td>
                   <td>
                     {consultation.dateTime ? <TextFormat type="date" value={consultation.dateTime} format={APP_DATE_FORMAT} /> : null}
                   </td>
                   <td>{consultation.temperature}</td>
                   <td>{consultation.weight}</td>
                   <td>{consultation.tension}</td>
                   <td>{consultation.glycemie}</td>
                   <td>{consultation.comment}</td>
                   <td>{consultation.hypothesis}</td>
                   <td>{consultation.exams}</td>
                   <td>{consultation.treatment}</td>
                   <td>
                     {consultation.patient ? <Link to={`/patient/${consultation.patient.id}`}>{consultation.patient.lastName}</Link> : ''}
                   </td>

                   <td className="text-end">
                      <div 
                        style={{
                          display:"flex",
                          flexDirection:"column",
                          gap:"1px",
                          fontSize:"9px"
                        }}
                      >
                        <Button tag={Link} to={`/consultation/${consultation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                            <span className="d-none d-md-inline">Voir détails</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/consultation/${consultation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                            <span className="d-none d-md-inline">Mettre à jour</span>
                        </Button>

                      </div>
                    </td>
                 </tr>
               ))}
     


              </tbody>
                </Table>) : (
           !loading && <div className="alert alert-warning">Aucun Consultation trouvé</div>
         )}
         </Card>
       </div>
       

            
          </div>
    </>

  );
};

export default Consultation;
