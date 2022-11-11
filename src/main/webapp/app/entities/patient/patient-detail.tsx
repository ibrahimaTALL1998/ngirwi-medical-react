import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Card } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { translateGender, translateMaritalStatus, translateBloodType } from 'app/shared/util/translation-utils';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './patient.reducer';
import { getPatient} from '../dossier-medical/dossier-medical.reducer';
import { FiLogOut } from 'react-icons/fi';
import Header from 'app/shared/layout/header/header';

export const PatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  function changeColor(e) {
    e.target.style.color = '#0075FF';
    e.target.style.backgroundColor = "#FFFFFF";
  }
function setColor(e){
  e.target.style.backgroundColor = "#0075FF";
  e.target.style.color = '#FFFFFF';
}

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getPatient(id));
  }, []);
 

  const patientEntity = useAppSelector(state => state.patient.entity);
  const dossierMedicalEntity = useAppSelector(state => state.dossierMedical.entity)
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
      
      <Header pageName="Gestion patients" />
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
          <span style={{marginTop:"2.5%"}}>Details Patient {patientEntity.lastName + ' ' + patientEntity.firstName}</span>  
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
              <span>Enregistré le:</span>
              <span 
                style={{
                  color:"#006CEB",
                  fontFamily:"Mulish",
                  fontSize:"15px"
                }}
              >
                {patientEntity.dateCreated ? <TextFormat value={patientEntity.dateCreated} type="date" format={APP_DATE_FORMAT} /> : null}
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
                >Nom: </span>
                <span>
                  {patientEntity.lastName}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Prénom: </span>
                <span>
                  {patientEntity.firstName}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Date de naissance: </span>
                <span>
                  {patientEntity.birthday}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Sexe: </span>
                <span>
                  {translateGender(patientEntity.gender)}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Situation matrimoniale: </span>
                <span>
                  {translateMaritalStatus(patientEntity.maritialStatus)}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Adresse: </span>
                <span>
                  {patientEntity.adress}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Profession: </span>
                <span>
                  {patientEntity.job}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Téléphone: </span>
                <span>
                  {patientEntity.phone}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >CNI: </span>
                <span>
                  {patientEntity.cni}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Groupe sanguin: </span>
                <span>
                  {translateBloodType(patientEntity.bloodType)}  
                </span>
              </div>
              <div>
                <span
                  style={{
                    color:"#A9B7CD"
                  }}
                >Date de mise à jour: </span>
                <span>
                  {patientEntity.dateUpdated? <TextFormat value={patientEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} /> : null}  
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
            <Button
              onMouseOver={changeColor}
              onMouseLeave={setColor}
              tag={Link}
              to={`/dossier-medical/${dossierMedicalEntity?.id}/edit/${"voir"}`}   
              style={{
                borderColor:"#0075FF",
                backgroundColor:"#0075FF",
                color:"#FFFFFF",
                width:"25vh",
                height:"9vh",
                borderRadius:"4px",
                fontFamily:"Ubuntu",
                padding:"10%"
              }}
            >
             Dossier médical
            </Button>
            <Button
              onMouseOver={changeColor}
              onMouseLeave={setColor}
              href={`/consultation/new/${patientEntity.id}/`}
              style={{
                borderColor:"#0075FF",
                backgroundColor:"#0075FF",
                color:"#FFFFFF",
                width:"25vh",
                height:"9vh",
                borderRadius:"4px",
                fontFamily:"Ubuntu",
                textAlign:"center",
                paddingTop:"3.75%"
              }}
            >
              Nouvelle consultation
            </Button>
            <Button
              onMouseOver={changeColor}
              onMouseLeave={setColor}
              tag={Link}
              to={`/consultation/list/${patientEntity.id}`}
              style={{
                borderColor:"#0075FF",
                backgroundColor:"#0075FF",
                color:"#FFFFFF",
                width:"25vh",
                height:"9vh",
                borderRadius:"4px",
                fontFamily:"Ubuntu",
              }}
            >
              Voir consultations faites
            </Button>
          </div>
        </Card>


        <Button  id="cancel-save" data-cy="entityCreateCancelButton" onClick={()=>window.history.back()} replace color="info"
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
    // <Row style={{marginLeft:"16vw"}}>
    //   <Col md="8">
    //     <h2 data-cy="patientDetailsHeading">Patient</h2>
    //     <dl className="jh-entity-details">
    //       <dt>
    //         <span id="id">ID</span>
    //       </dt>
    //       <dd>{patientEntity.id}</dd>
    //       <dt>
    //         <span id="firstName">Prénom</span>
    //       </dt>
    //       <dd>{patientEntity.firstName}</dd>
    //       <dt>
    //         <span id="lastName">Nom</span>
    //       </dt>
    //       <dd>{patientEntity.lastName}</dd>
    //       <dt>
    //         <span id="birthday">Date de naissance</span>
    //       </dt>
    //       <dd>
    //         {patientEntity.birthday ? <TextFormat value={patientEntity.birthday} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
    //       </dd>
    //       <dt>
    //         <span id="birthplace">Lieu de naissance</span>
    //       </dt>
    //       <dd>{patientEntity.birthplace}</dd>
    //       <dt>
    //         <span id="gender">Genre</span>
    //       </dt>
    //       <dd>{patientEntity.gender}</dd>
    //       <dt>
    //         <span id="adress">Adresse</span>
    //       </dt>
    //       <dd>{patientEntity.adress}</dd>
    //       <dt>
    //         <span id="phone">Téléphone</span>
    //       </dt>
    //       <dd>{patientEntity.phone}</dd>
    //       <dt>
    //         <span id="cni">Cni</span>
    //       </dt>
    //       <dd>{patientEntity.cni}</dd>
    //       <dt>
    //         <span id="job">Profession</span>
    //       </dt>
    //       <dd>{patientEntity.job}</dd>
    //       <dt>
    //         <span id="bloodType">Groupe Sanguin</span>
    //       </dt>
    //       <dd>{patientEntity.bloodType}</dd>
    //       <dt>
    //         <span id="maritialStatus">Status Matrimonial</span>
    //       </dt>
    //       <dd>{patientEntity.maritialStatus}</dd>
    //       <dt>
    //         <span id="dateCreated">Date de création</span>
    //       </dt>
    //       <dd>
    //         {patientEntity.dateCreated ? <TextFormat value={patientEntity.dateCreated} type="date" format={APP_DATE_FORMAT} /> : null}
    //       </dd>
    //       <dt>
    //         <span id="dateUpdated">Date de mise à jour</span>
    //       </dt>
    //       <dd>
    //         {patientEntity.dateUpdated ? <TextFormat value={patientEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} /> : null}
    //       </dd>
    //       <dt> 
    //         <span id="author">Autheur</span>
    //       </dt>
    //       <dd>{patientEntity.author}</dd>
    //     </dl>
    //     <Button tag={Link} to="/patient" replace color="info" data-cy="entityDetailsBackButton">
    //       <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/patient/${patientEntity.id}/edit`} replace color="primary">
    //       <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editer</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/dossier-medical/${patientEntity.id}/`} replace color="success">
    //       <FontAwesomeIcon icon="book" /> <span className="d-none d-md-inline">Dossier Médical</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/consultation/new/${patientEntity.id}/`} replace color="warning">
    //       <FontAwesomeIcon icon="person" /> <span className="d-none d-md-inline">Consulter</span>
    //     </Button>
    //     &nbsp;
    //     <Button tag={Link} to={`/bill/new/${patientEntity.id}/`} replace color="info">
    //       <FontAwesomeIcon icon="money-bill" /> <span className="d-none d-md-inline">facture</span>
    //     </Button>
    //   </Col>
    // </Row>
  );
};

export default PatientDetail;
