import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label, Card } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import {FiLogOut} from 'react-icons/fi';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntities as getPrescriptions } from 'app/entities/prescription/prescription.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntity, updateEntity, createEntity, reset } from './consultation.reducer';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { examsList } from 'app/shared/util/exams-list';

export const ConsultationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const prescriptions = useAppSelector(state => state.prescription.entities);
  const consultationEntity = useAppSelector(state => state.consultation.entity);
  const loading = useAppSelector(state => state.consultation.loading);
  const updating = useAppSelector(state => state.consultation.updating);
  const updateSuccess = useAppSelector(state => state.consultation.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);
  // const [exams, setExams] = useState([{"label" : '', "value" : ''}])
  const [exams, setExams] = useState(Object)


  const handleClose = () => {
    navigate('/consultation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPatients({}));
    dispatch(getPrescriptions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateTime = convertDateTimeToServer(values.dateTime);

    const entity = {
      ...consultationEntity,
      ...values,
      patient: patients.find(it => it.id.toString() === values.patient.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };
  
  const defaultValues = () =>
    isNew
      ? {

        dateTime: displayDefaultDateTime(),
        author: account.login,
        exams: JSON.stringify(exams),
        patient: idPatient, 
      }
      : {
        ...consultationEntity,
        dateTime: convertDateTimeFromServer(consultationEntity.dateTime),
        patient: consultationEntity?.patient?.id,
        author: account.login,
      };

  const animatedComponents = makeAnimated();

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
          <span>Gestions Patients</span>  
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
           {
           isNew ? (<span style={{marginTop:"2.5%"}}>Enregistrer Consultation</span>):
           (<span style={{marginTop:"2.5%"}}>
            Modifier Consultation  
           </span>)}  
          </Card>
          <Card 
            style={{
              height:"70vh",
              marginRight:"5%",
              boxShadow:"0px 10px 50px rgba(138, 161, 203, 0.23)",
              borderRadius:"15px"

            }}
          >
              <span style={{marginTop:"1%", color:"#141414",fontSize:"15px", marginLeft:"3%"}}>Remplir informations patient</span>
              
              
              <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}
                style={{
                  width:"94%",
                  marginLeft:"3%",
                  height:"70%",
                  display:"grid",
                  columnGap:"25px",
                  marginTop:"1%",
                  gridTemplateColumns : "repeat(3, 5fr)",
                  fontSize:"12px",
                  fontWeight:"900"
                }}
              >
              {!isNew ? 
               <ValidatedField name="id" disabled required readOnly id="consultation-id" label="ID" validate={{ required: true }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
               /> : null}
               <ValidatedField
                disabled
                label="Date et heure"
                id="consultation-dateTime"
                name="dateTime"
                data-cy="dateTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField
                label="Temperature"
                id="consultation-temperature"
                name="temperature"
                data-cy="temperature"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                  validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField
                label="Poids"
                id="consultation-weight"
                name="weight"
                data-cy="weight"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                  validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField
                label="Tension"
                id="consultation-tension"
                name="tension"
                data-cy="tension"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField label="Glycemie" id="consultation-glycemie" name="glycemie" data-cy="glycemie" type="text"
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField label="Commentaire" id="consultation-comment" name="comment" data-cy="comment" type="text"
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />

              <ValidatedField
                label="Hypothèse diagnostique"
                id="consultation-hypothesis"
                name="hypothesis"
                data-cy="hypothesis"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <div
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}>
              <Label>Examens paracliniques</Label>
               <Select options={examsList}                 
              
                components={animatedComponents} isMulti onChange={(e) => setExams(e)} />
              </div>
             
                {/* <ValidatedField label="Examens paracliniques" name="examspara" type="select" 
                  isMulti
                  onChange={(e) => setExams(e)}
                  style={{
                    borderRadius:"25px",
                    backgroundColor:"#F7FAFF",
                    borderColor:"#CBDCF7"
                  }}
                >
                <option value="" key="0" />
                { examsList.map((otherEntity, i) => (
                    <option value={otherEntity.value} key={`entity-${i}`}>
                      {otherEntity.label}
                    </option>
                    ))
                }
                </ValidatedField> */}

              
              <ValidatedField
                label="Examens"
                id="consultation-exams"
                name="exams"
                data-cy="exams"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField 
                label="Traitement"
                id="consultation-treatment"
                name="treatment"
                data-cy="treatment"
                type="text"
                validate={{
                  required: { value: true, message: 'Ce champ est obligatoire.' },
                }}
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7"
                }}
              />
              <ValidatedField hidden label="Author" id="consultation-author" name="author" data-cy="author" type="text"/>
              
            <ValidatedField  
              disabled={isNew?false:true}
              id="consultation-patient" 
              name="patient" 
              data-cy="patient" 
              label="Patient" 
              type="select"
              style={{
                borderRadius:"25px",
                backgroundColor:"#F7FAFF",
                borderColor:"#CBDCF7"
              }}              
              >
              <option value="" key="0" />
                {patients
                  ? patients.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.lastName + ' ' + otherEntity.firstName + ' (' +otherEntity.birthday +')'}
                    </option>
                    ))
                : null}
              </ValidatedField>
               
              <ValidatedField
                hidden
                label="Date Created"
                id="patient-dateCreated"
                name="dateCreated"
                data-cy="dateCreated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                hidden
                label="Date Updated"
                id="patient-dateUpdated"
                name="dateUpdated"
                data-cy="dateUpdated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField hidden label="Author" id="patient-author" name="author" data-cy="author" type="text" />

              <Button id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}
                style={{
                  gridColumn:"1/4",
                  borderRadius:"25px",
                  color:"white",
                  backgroundColor:"#56B5C5",
                  borderColor:"#56B5C5"
                }}
              >
                 Enregistrer
              </Button>
              &nbsp;

              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/consultation" replace color="info"
                style={{
                  gridColumn:"1/4",
                  borderRadius:"25px",
                  color:"white",
                  backgroundColor:"#EC4747",
                  borderColor:"#EC4747",
                }}
              >
                <span className="d-none d-md-inline">Annuler</span>
              </Button>
            </ValidatedForm>
          </Card>
        </div>
  
  </div>
    

 

    //           {/* <ValidatedField

    //           /> */}
    //           <ValidatedField

    //           />
    //           < />

    //           <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/consultation" replace color="info">
    //             <FontAwesomeIcon icon="arrow-left" />
    //             &nbsp;
    //             <span className="d-none d-md-inline">Retour</span>
    //           </Button>
    //           &nbsp;
    //           <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
    //             <FontAwesomeIcon icon="save" />
    //             &nbsp; Sauvegarder
    //           </Button>
    //         </ValidatedForm>
    //       )}
    //     </Col>
    //   </Row>
    // </div>
  );
};

export default ConsultationUpdate;
