import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Card } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './consultation.reducer';
import { FiLogOut } from 'react-icons/fi';

export const ConsultationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const consultationEntity = useAppSelector(state => state.consultation.entity);
  return (

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
    <div style={{display:"flex", flexDirection:"row",gap:"70vw"}}>
      <span>Gestion Consultation</span>  
      <div>
        <Link to="/logout" style={{color:"silver", fontWeight:"900"}}>
          <div>{React.createElement(FiLogOut)} </div>
        </Link>
      </div>
    </div> 
    <div
      style={{
        display:"flex",
        flexDirection:"column",
        gap:"5vh",
        marginTop:"9.5vh"
      }}        
    >
      <Card
        style={{
          height:"8.28vh",
          width:"33.38vw",
          borderRadius:"20px",
          backgroundColor:"#11485C",
          marginLeft:"25%",
          textAlign:"center",
          color:"white",
          boxShadow:"0px 10px 50px rgba(138, 161, 203, 0.23)",
          }}
      >
        <span style={{marginTop:"2.5%"}}>Details Consultation</span>  
      </Card>


      <Card
        style={{
          marginLeft:"4%",
          height:"55vh",
          width:"70vw",
          marginRight:"5%",
          boxShadow:"0px 10px 50px rgba(138, 161, 203, 0.23)",
          borderRadius:"15px",
          display:"flex",
          flexDirection:"row",
          alignItems:"flex-start",
          justifyContent:"center",
          paddingTop:"5%"
        }}
      >
        <Card
          style={{
            height:"55%",
            width:"22%",
            backgroundColor:"#72C9D8",
            borderRadius:"15px",
            borderColor:"#72C9D8",
            borderTopRightRadius:"0px",
            borderBottomRightRadius:"0px"
          }}
        >
          <div 
            style={{
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              paddingTop:"30%"
            }}
          >
            <span>Faite le:</span>
            <span 
              style={{
                color:"#006CEB",
                fontFamily:"Mulish",
                fontSize:"15px"
              }}
            >
               {consultationEntity.dateTime ? <TextFormat value={consultationEntity.dateTime} type="date" format={APP_DATE_FORMAT} /> : null}
            </span>
          </div>
        </Card>


        <Card
          style={{
            height:"90%",
            width:"40%",
            borderRadius:"15px",
            borderTopLeftRadius:"0px",
            marginRight:"8%",
            backgroundColor:"#F6FAFF",
            borderColor:"#F6FAFF",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"15px",
            fontWeight:"bold",
            fontFamily:"Mulish"
          }}
        >
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Temperature: </span>
              <span>
              {consultationEntity.temperature}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Poids: </span>
              <span>
              {consultationEntity.weight}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Tension: </span>
              <span>
                {consultationEntity.tension}
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Glycemie: </span>
              <span>
              {consultationEntity.glycemie}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Commentaire: </span>
              <span>
              {consultationEntity.comment}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Hypotèse Diagnostique: </span>
              <span>
              {consultationEntity.hypothesis}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Examens: </span>
              <span>
              {consultationEntity.exams} 
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Traitement: </span>
              <span>
              {consultationEntity.treatment}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Auteur: </span>
              <span>
              {consultationEntity.author}  
              </span>
            </div>
            <div>
              <span
                style={{
                  color:"#A9B7CD"
                }}
              >Patient: </span>
              <span>
               {consultationEntity.patient ? <Link to={`/patient/${consultationEntity.patient.id}`}>{consultationEntity.patient.lastName}</Link> : '' } 
              </span>
            </div>
   
        </Card>


        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"5vh",
            marginTop:"3vh"
          }}
        >
          {/* <Button
            href={`/dossier-medical/${patientEntity.id}/`}
            style={{
              borderColor:"#0075FF",
              backgroundColor:"#0075FF",
              color:"#FFFFFF",
              width:"25vh",
              height:"8vh",
              borderRadius:"4px",
              fontFamily:"Ubuntu",
              paddingTop:"10%"
            }}
          >
            Dossier médical
          </Button> */}
          <Button
            href={`/prescription/new/${consultationEntity.id}`}
            style={{
              borderColor:"#0075FF",
              backgroundColor:"#0075FF",
              color:"#FFFFFF",
              width:"25vh",
              height:"8vh",
              borderRadius:"4px",
              fontFamily:"Ubuntu",
            }}
          >
            Ordonnance
          </Button>
          <Button
            to={`/consultation/${consultationEntity.id}/edit`}
            style={{
              borderColor:"#0075FF",
              backgroundColor:"#0075FF",
              color:"#FFFFFF",
              width:"25vh",
              height:"8vh",
              borderRadius:"4px",
              fontFamily:"Ubuntu",
            }}
          >
            Modifier consultation
          </Button>
        </div>
      </Card>


      <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/consultation" replace color="info"
        style={{
          marginLeft:"7%",
          width:"66vw",
          borderRadius:"25px",
          color:"white",
          backgroundColor:"#EC4747",
          borderColor:"#EC4747",
        }}
      >
        <span className="d-none d-md-inline">Retour</span>
      </Button>
    </div>
  </div>



    // <Row>
    //   <Col md="8">
    //     <h2 data-cy="consultationDetailsHeading">Consultation</h2>
    //     <dl className="jh-entity-details">
    //       <dt>
    //         <span id="id">ID</span>
    //       </dt>
    //       <dd>{consultationEntity.id}</dd>
    //       <dt>
    //         <span id="dateTime">Date et heure</span>
    //       </dt>
    //       <dd>
    //         {consultationEntity.dateTime ? <TextFormat value={consultationEntity.dateTime} type="date" format={APP_DATE_FORMAT} /> : null}
    //       </dd>
    //       <dt>
    //         <span id="temperature">Temperature</span>
    //       </dt>
    //       <dd>{consultationEntity.temperature}</dd>
    //       <dt>
    //         <span id="weight">Poids</span>
    //       </dt>
    //       <dd>{consultationEntity.weight}</dd>
    //       <dt>
    //         <span id="tension">Tension</span>
    //       </dt>
    //       <dd>{consultationEntity.tension}</dd>
    //       <dt>
    //         <span id="glycemie">Glycemie</span>
    //       </dt>
    //       <dd>{consultationEntity.glycemie}</dd>
    //       <dt>
    //         <span id="comment">Commentaire</span>
    //       </dt>
    //       <dd>{consultationEntity.comment}</dd>
    //       <dt>
    //         <span id="hypothesis">Hypothèse diagnostique</span>
    //       </dt>
    //       <dd>{consultationEntity.hypothesis}</dd>
    //       <dt>
    //         <span id="exams">Examens</span>
    //       </dt>
    //       <dd>{consultationEntity.exams}</dd>
    //       <dt>
    //         <span id="treatment">Traitement</span>
    //       </dt>
    //       <dd>{consultationEntity.treatment}</dd>
    //       <dt>
    //         <span id="author">Autheur</span>
    //       </dt>
    //       <dd>{consultationEntity.author}</dd>
    //       <dt>Patient</dt>
    //       <dd>{consultationEntity.patient ? <Link to={`/patient/${consultationEntity.patient.id}`}>{consultationEntity.patient.lastName}</Link> : ''}</dd>
    //     </dl>
    //     <Button tag={Link} to="/consultation" replace color="info" data-cy="entityDetailsBackButton">
    //       <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/consultation/${consultationEntity.id}/edit`} replace color="primary">
    //       <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/prescription/new/${consultationEntity.id}`} replace color="success">
    //       <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">Ordonnance</span>
    //     </Button>
    //   </Col>
    // </Row>
  );
};

export default ConsultationDetail;
