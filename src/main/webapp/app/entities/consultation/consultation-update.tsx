import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label, Card } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FiLock, FiLogOut } from 'react-icons/fi';

import { convertDateTimeFromServer, convertDateTimeFromServerToDate, convertDateTimeFromServerToHours, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
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
import Header from 'app/shared/layout/header/header'
import dayjs from 'dayjs';
import { IoIosArrowBack } from 'react-icons/io';

export const ConsultationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const { idEdit } = useParams<'idEdit'>();
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

        hours: dayjs().format("HH:mm:ss"),
        date: dayjs().format("DD/MM/YYYY"),
        dateTime: displayDefaultDateTime(),
        author: account.login,
        exams: JSON.stringify(exams),
        patient: idPatient,
      }
      : {
        ...consultationEntity,
        dateTime: convertDateTimeFromServer(consultationEntity.dateTime),
        hours: convertDateTimeFromServerToHours(consultationEntity.dateTime),
        date: convertDateTimeFromServerToDate(consultationEntity.dateTime),
        patient: consultationEntity?.patient?.id,
        author: account.login,
        ...consultationEntity?.exams
      };

  const animatedComponents = makeAnimated();

  return (
    <div
      style={{
        paddingLeft: "16vw",
        paddingTop: "1%",
        fontFamily: "Mulish",
        fontWeight: "900",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header pageName="Consultations" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "7.5vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "10%",
            gap: "6vw"

          }}
        >

          <Card
            style={{
              height: "6.28vh",
              width: "30vw",
              borderRadius: "20px",
              backgroundColor: "#11485C",
              textAlign: "center",
              color: "white",
              marginBottom: "5vh",
              boxShadow: "0px 10px 50px rgba(138, 161, 203, 0.23)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: isNew ? "2vw" : "4vw",
              paddingLeft: isNew ? "1vw" : "2vw"
            }}
          >
            <Link to={idPatient == undefined ? (`/consultation/`) : (`/consultation/list/${idPatient}`)} style={{ color: "#53BFD1", }}>{React.createElement(IoIosArrowBack, { size: "20" })}</Link >
            {
              isNew ? (<span >Enregistrement nouvelle consultation

              </span>) :
                (<span >
                  {idEdit === "voir" ? "Consultation patient " : "Mise à jour consultation patient "}

                </span>)}
          </Card>
          <Card
            style={{
              height: "30vh",
              width: "40vw",
              boxShadow: "0px 10px 50px rgba(138, 161, 203, 0.23)",
              borderRadius: "15px",
              borderColor: "#0075FF",
              backgroundColor: "#F6FAFF"

            }}
          >
            <Card
              style={{
                backgroundColor: "#0075FF",
                borderColor: "#0075FF",
                color: "#F6FAFF",
                fontSize: "15px",
                borderRadius: "13px",
                height: "30%",
                display: "flex",
                flexDirection: "row",
                gap: "50%",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "2%",
                paddingLeft: "2%"
              }}>
              <span style={{ fontSize: "18px", fontWeight: "900" }}>
                Dossier médical

              </span>
              <Link to="#"
                style={{ fontSize: "13px", color: "#F6FAFF", textDecoration: "none", border: "1px solid #72C9D8", backgroundColor: "#0075F5", padding: "10px", borderRadius: "25px", boxShadow: "2px 5px 11px rgba(0, 0, 0, 0.25)" }}>Tout voir </Link>

            </Card>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              fontSize: "13px",
              color: "#A9B7CD",
              fontWeight: "700",
              marginTop: "15px",
              marginLeft: "5%",
              gap: "1vh"
            }}>
              <div>Motif:</div>
              <div>Histoire de la maladie:</div>
              <div>Antécédants chirigicaux:</div>
              <div>Antécédants familiaux:</div>
              <div>Gynéco-Obstrétique:</div>
            </div>
          </Card>


        </div>


        <Card
          style={{
            minHeight: "110vh",
            width: "80vw",
            boxShadow: "0px 10px 50px rgba(138, 161, 203, 0.23)",
            borderRadius: "15px",
            marginBottom: "30px",
            fontFamily: 'Jost',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: "15px"

          }}
        >
          {isNew ? (<span style={{ marginTop: "1%", color: "#141414", fontSize: "19px", marginLeft: "3%" }}>Remplir informations patient</span>) : (
            <span style={{ marginTop: "1%", color: "#141414", fontSize: "19px", fontFamily: "jost", marginLeft: "3%" }}> {idEdit === "voir" ? "Consultation patient" : "Modifications consultation patient"} </span>
          )}
          <span
            style={{
              marginTop: "2%",
              color: "#141414",
              fontSize: "25px",
              marginBottom: "3%",
              textAlign: "center",
              fontWeight: "900"
            }}
          >
            {patients
              ? patients.map(otherEntity => (
                (consultationEntity?.patient?.id === otherEntity.id || idPatient == otherEntity.id) ? (
                  <div>
                    <span key={otherEntity.id}>
                      {'Patient: ' + otherEntity.lastName.toUpperCase() + ' ' + otherEntity.firstName}
                    </span> <br />
                    <span style={{ fontWeight: "400" }}>{'Matricule: #' + otherEntity.id}</span>
                  </div>

                ) : (null))

              )
              : null}
          </span>



          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}
            style={{
              width: "94%",
              height: "80%",
              marginLeft: "3%",
              display: "grid",
              columnGap: "30px",
              marginTop: "1%",
              gridTemplateColumns: "repeat(2,1fr)",
              fontSize: "18px",
              fontWeight: "900",
            }}
          >
            <ValidatedField
              hidden
              disabled
              label="Date et heure"
              id="consultation-dateTime"
              name="dateTime"
              data-cy="dateTime"
              type="datetime-local"
              placeholder="YYYY-MM-DD HH:mm"
            />
            <ValidatedField
              disabled
              label="Date"
              id="consultation-date"
              name="date"
              data-cy="date"
              type="datetime"
              placeholder="YYYY-MM-DD HH:mm"
              style={{
                borderRadius: "25px",
                borderColor: "#CBDCF7",
                backgroundColor: "#A9B7CD",
                color: "#F6FAFF"
              }}
            />



            <ValidatedField
              disabled
              label="Heure"
              id="consultation-hours"
              name="hours"
              data-cy="hours"
              type="datetime"
              placeholder="YYYY-MM-DD HH:mm"
              style={{
                borderRadius: "25px",
                backgroundColor: "#A9B7CD",
                color: "#F6FAFF",
                borderColor: "#CBDCF7"
              }}
            >
              <span style={{
                color: "#F6FAFF",
                textAlign: "end"
              }}>{React.createElement(FiLock, { size: "20" })}</span>
            </ValidatedField>
            <ValidatedField label="Patient" name="patient" type="select"
              hidden={isNew?false:true}
              disabled={isNew?false:true}
              style={{
                borderRadius: "25px",
                backgroundColor: "#F7FAFF",
                borderColor: "#CBDCF7"
              }}
            >
              {patients.map((otherEntity, i) => (
                <option value={otherEntity.id} key={`entity-${i}`}>
                  {otherEntity.lastName.toUpperCase()+' '+otherEntity.firstName}
                </option>
              ))
              }
            </ValidatedField>
            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
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
                borderRadius: "25px",
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black")
              }}
            />
            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
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
                borderRadius: "25px",
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black")
              }}
            />
            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
              label="Tension"
              id="consultation-tension"
              name="tension"
              data-cy="tension"
              type="text"
              validate={{
                required: { value: true, message: 'Ce champ est obligatoire.' },
              }}
              style={{
                borderRadius: "25px",
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black")
              }}
            />
            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
              label="Glycemie"
              id="consultation-glycemie"
              name="glycemie"
              data-cy="glycemie"
              type="text"
              style={{
                borderRadius: "25px",
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black")
              }}
            />


            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
              label="Hypothèse diagnostique"
              id="consultation-hypothesis"
              name="hypothesis"
              data-cy="hypothesis"
              type="text"
              validate={{
                required: { value: true, message: 'Ce champ est obligatoire.' },
              }}
              style={{
                borderRadius: "25px",
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black")
              }}
            />
            {/* <div
                style={{
                  borderRadius:"25px",
                  backgroundColor:"#F7FAFF",
                  borderColor:"#CBDCF7",
                }}>
                <Label>Examens complémentaires</Label>
              <Select  name="exams"
              options={examsList} components={animatedComponents} isMulti onChange={(e) => setExams(e)} />
              </div> */}

            <ValidatedField label="Examens paracliniques" name="exams" type="select"
              isMulti
              components={animatedComponents}
              onChange={(e) => setExams(e)}
              style={{
                borderRadius: "25px",
                backgroundColor: "#F7FAFF",
                borderColor: "#CBDCF7"
              }}
            >
              {examsList.map((otherEntity, i) => (
                <option value={otherEntity.value} key={`entity-${i}`}>
                  {otherEntity.label}
                </option>
              ))
              }
            </ValidatedField>



            <ValidatedField
              disabled={idEdit === "voir" ? true : false}
              label="Traitement"
              id="consultation-treatment"
              name="treatment"
              data-cy="treatment"
              type="textarea"
              validate={{
                required: { value: true, message: 'Ce champ est obligatoire.' },
              }}
              style={{
                gridColumn:isNew?"1/3":"",
                width: isNew?"":"150%",
                marginBottom: "20px",
                borderRadius: "10px",
                color: (idEdit === "voir") ? ("#F6FAFF") : ("black"),
                backgroundColor: (idEdit === "voir") ? ("#A9B7CD") : ("#F7FAFF"),
                borderColor: "#CBDCF7"
              }}
            />

            <Button
              hidden={idEdit === "voir" ? true : false}
              id="save-entity"
              data-cy="entityCreateSaveButton"
              type="submit"
              disabled={updating}
              style={{
                gridColumn: "1/3",
                borderRadius: "25px",
                color: "white",
                backgroundColor: "#56B5C5",
                borderColor: "#56B5C5"
              }}
            >
              Enregistrer
            </Button>
            &nbsp;

            <Button onClick={() => { window.history.back() }} id="cancel-save" data-cy="entityCreateCancelButton" replace color="info"
              style={{
                gridColumn: "1/3",
                borderRadius: "25px",
                color: "white",
                backgroundColor: "#EC4747",
                borderColor: "#EC4747",
                textAlign: "center",
                fontSize: (idEdit === "voir") ? ("20px") : ("")

              }}
            >
              <span className="d-none d-md-inline">{idEdit === "voir" ? "Retour" : "Annuler"}</span>
            </Button>
            <ValidatedField hidden label="Author" id="consultation-author" name="author" data-cy="author" type="text" />


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
