import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Card } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  convertDateTimeFromServer,
  convertDateTimeFromServerToDate,
  convertDateTimeFromServerToHours,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities as getConsultations } from 'app/entities/consultation/consultation.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntity, updateEntity, createEntity, reset } from './prescription.reducer';

//pdf
import { Page, Text, Image, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { AccountMenu } from 'app/shared/layout/menus';
import Header from 'app/shared/layout/header/header';
import { IoIosAddCircle, IoIosAddCircleOutline, IoIosArrowBack, IoIosRemoveCircle } from 'react-icons/io';
import { BiDownload } from 'react-icons/bi';

export const PrescriptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idEdit } = useParams<'idEdit'>();
  const { idConsultation } = useParams<'idConsultation'>();
  const isNew = id === undefined;

  const consultations = useAppSelector(state => state.consultation.entities);
  const prescriptionEntity = useAppSelector(state => state.prescription.entity);
  const loading = useAppSelector(state => state.prescription.loading);
  const updating = useAppSelector(state => state.prescription.updating);
  const updateSuccess = useAppSelector(state => state.prescription.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);
  const [consul, setConsul] = useState(idConsultation);

  const handleConsulChange = e => {
    setConsul(e.target.value);
  };

  const handleClose = () => {
    navigate('/prescription' + location.search);
  };
  function rtn() {
    window.history.back();
  }
  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getConsultations({}));
  }, []);

  const consultation = consultations.filter(consult => {
    return consult.id == idConsultation;
  });

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.creationDate = convertDateTimeToServer(values.creationDate);

    const entity = {
      ...prescriptionEntity,
      ...values,
      consultation: consultations.find(it => it.id.toString() === values.consultation.toString()),
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
          creationDate: convertDateTimeFromServerToDate(displayDefaultDateTime()),
          consultation: idConsultation,
          author: account.login,
        }
      : {
          ...prescriptionEntity,
          creationDate: convertDateTimeFromServerToDate(prescriptionEntity.creationDate),
          consultation: prescriptionEntity?.consultation?.id,
        };

  //info ordonance
  const [formValues, setFormValues] = useState([{ medecine: '', duration: '', frequency: '' }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { medecine: '', duration: '', frequency: '' }]);
  };

  let removeFormFields = i => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  let p;
  let infosPatient = () => {
    consultations.map(otherEntity =>
      otherEntity.id.toString() === consul
        ? // console.log(otherEntity.id+"."+otherEntity.patient.lastName)
          (p = otherEntity.patient.lastName.toUpperCase() + ' ' + otherEntity.patient.firstName)
        : console.log(otherEntity.id)
    );

    return p;
  };
  p = infosPatient();
  let showID = () => {
    console.log(p);
  };

  Font.register({ family: 'Poppins', src: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2', fontStyle: 'normal' });
  const doc = (
    <Document>
      <Page style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Poppins' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottom: '1px solid green',
            paddingBottom: '10px',
            marginTop: '20px',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={{ fontSize: '20px', color: 'green', marginBottom: '9px', fontWeight: 'bold' }}>Nom médecin</Text>
            <Text style={{ fontSize: '15px', marginBottom: '9px', fontWeight: 'medium' }}>Médecin général</Text>
            <Text style={{ fontSize: '15px', fontWeight: 'thin' }}>Téléphone</Text>
          </View>
          <View>
            <Image style={{ width: '50px', height: '50px' }} src="content/images/serpent.png" />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={{ fontSize: '20px', color: 'green', marginBottom: '9px', fontWeight: 'bold' }}>Nom clinique</Text>
            <Text style={{ fontSize: '15px', marginBottom: '9px', fontWeight: 'medium' }}>Adresse</Text>
            <Text style={{ fontSize: '15px', fontWeight: 'thin' }}>Email Clinique</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '15px' }}>
          <Text style={{ fontSize: '35px', fontWeight: 'extrabold', marginBottom: '9px' }}>Ordonnance Médicale</Text>
          <Text style={{ fontSize: '18px', marginBottom: '9px' }}>
            {' '}
            Fait à: ...................... Le:{' '}
            {convertDateTimeFromServerToDate(displayDefaultDateTime()) + ' à ' + convertDateTimeFromServerToHours(displayDefaultDateTime())}
          </Text>
          <Text style={{ fontSize: '18px', marginBottom: '7px' }}>
            Nom et Prénom(s):{' '}
            {prescriptionEntity.consultation
              ? prescriptionEntity?.consultation?.patient?.lastName.toUpperCase() +
                ' ' +
                prescriptionEntity?.consultation?.patient?.firstName
              : p}{' '}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
            border: '3px solid silver',
            marginLeft: '10vw',
            marginRight: '5vw',
            width: '80vw',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                width: '40vw',
                borderRight: '3px solid silver',
                textTransform: 'uppercase',
                fontSize: '15px',
                color: 'green',
                paddingTop: '3px',
                paddingBottom: '5px',
                textAlign: 'center',
              }}
            >
              Médicament(s)
            </Text>
            <Text
              style={{
                width: '20vw',
                textTransform: 'uppercase',
                fontSize: '15px',
                color: 'green',
                paddingTop: '3px',
                paddingBottom: '5px',
                textAlign: 'center',
              }}
            >
              Durée
            </Text>
            <Text
              style={{
                width: '20vw',
                borderLeft: '3px solid silver',
                textTransform: 'uppercase',
                fontSize: '15px',
                color: 'green',
                paddingTop: '3px',
                paddingBottom: '5px',
                textAlign: 'center',
              }}
            >
              Fréquence
            </Text>
          </View>
          {formValues.map((element, i) =>
            element.medecine.length > 0 ? (
              <View key={`entity-${i}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    width: '40vw',
                    minHeight: '4vh',
                    borderRight: '3px solid silver',
                    borderTop: '3px solid silver',
                    fontSize: '15px',
                    paddingTop: '5px',
                    paddingBottom: '3px',
                    textAlign: 'center',
                  }}
                >
                  {element.medecine}
                </Text>
                <Text
                  style={{
                    width: '20vw',
                    minHeight: '4vh',
                    borderTop: '3px solid silver',
                    fontSize: '15px',
                    paddingTop: '5px',
                    paddingBottom: '3px',
                    textAlign: 'center',
                  }}
                >
                  {element.duration} Jours
                </Text>
                <Text
                  style={{
                    width: '20vw',
                    minHeight: '4vh',
                    borderTop: '3px solid silver',
                    borderLeft: '3px solid silver',
                    fontSize: '15px',
                    paddingTop: '5px',
                    paddingBottom: '3px',
                    textAlign: 'center',
                  }}
                >
                  {element.frequency} /J
                </Text>
              </View>
            ) : null
          )}
        </View>
      </Page>
    </Document>
  );

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
      <Header pageName={'Ordonnance'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5vh',
          marginTop: '9.5vh',
        }}
      >
        <Card
          style={{
            height: '6.28vh',
            width: '32vw',
            maxWidth: '50vw',
            borderRadius: '20px',
            backgroundColor: '#11485C',
            textAlign: 'center',
            color: 'white',
            marginBottom: '5vh',
            marginLeft: '25vw',
            boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            replace
            onClick={() => window.history.back()}
            style={{ color: '#53BFD1', backgroundColor: '#11485C', borderColor: '#11485C' }}
          >
            {React.createElement(IoIosArrowBack, { size: '20' })}
          </Button>
          <span>{isNew ? 'Enregistrement nouvelle ' : idEdit === 'voir' ? 'Consultation ' : 'Modification '} ordonnance</span>
        </Card>
        <Card
          style={{
            minHeight: '70vh',
            marginRight: '5%',
            boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
            borderRadius: '15px',
            marginBottom: '2vh',
          }}
        >
          <div
            style={{
              marginTop: '1%',
              paddingBottom: '2vh',
              position: 'sticky',
              top: '0',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderBottom: '1px solid #B3C0D3',
            }}
          >
            <span style={{ marginLeft: '3%', color: '#141414', fontSize: '19px', width: '75vw' }}>
              {isNew ? 'Nouvelle ordonnance ' : 'Ordonnance '}patient
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3vh' }}>
              <PDFDownloadLink document={doc} fileName={`ordonnance_${account.login}_${JSON.stringify(displayDefaultDateTime())}`}>
                {({ loading }) =>
                  loading ? (
                    <FontAwesomeIcon style={{ color: 'black', fontSize: '25px' }} icon={'loader'} spin={loading} />
                  ) : (
                    <span style={{ borderRadius: '25px', cursor: 'pointer', color: '#B3C0D3', fontWeight: '900' }}>
                      {React.createElement(BiDownload, { size: '25' })}{' '}
                    </span>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
          <ValidatedForm
            style={{
              width: '94%',
              marginLeft: '3%',
              height: '70%',
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '25px',
              marginTop: '1%',
              fontSize: '12px',
              fontWeight: '900',
              backgroundImage: 'url(content/images/NgirwiLogo.png)',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundPosition: '65% 90%',
              backgroundSize: '50% 50%',
            }}
            defaultValues={defaultValues()}
            onSubmit={saveEntity}
          >
            {!isNew ? <ValidatedField hidden name="id" required readOnly id="bill-id" label="ID" validate={{ required: true }} /> : null}
            <ValidatedField
              style={{ borderRadius: '25px', backgroundColor: '#A9B7CD', color: '#F6FAFF', borderColor: '#CBDCF7', width: '30vw' }}
              disabled
              label="Date de création"
              id="prescription-creationDate"
              name="creationDate"
              data-cy="creationDate"
              type="datetime"
              placeholder="YYYY-MM-DD HH:mm"
            />
            {/* <ValidatedField
              style={{ borderRadius: "25px", backgroundColor: "#A9B7CD", color: "#F6FAFF", borderColor: "#CBDCF7" }}
              disabled label="Date" id="bill-date" name="date" data-cy="date" type="datetime-local" placeholder="YYYY-MM-DD HH:mm" /> */}
            <ValidatedField hidden label="Author" id="prescription-author" name="author" data-cy="author" type="text" />
            <ValidatedField
              onChange={b => handleConsulChange(b)}
              style={
                isNew
                  ? { borderRadius: '25px', borderColor: '#CBDCF7', width: '37vw' }
                  : { borderRadius: '25px', backgroundColor: '#A9B7CD', borderColor: '#CBDCF7', color: '#F6FAFF', width: '37vw' }
              }
              disabled={isNew ? false : true}
              id="prescription-consultation"
              name="consultation"
              data-cy="medecine"
              label="Consultation"
              type="select"
            >
              <option value="" key="0" />
              {consultations
                ? consultations.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      Faite le {convertDateTimeFromServerToDate(otherEntity.dateTime)} à {otherEntity.patient.lastName.toUpperCase()}{' '}
                      {otherEntity.patient.firstName}
                    </option>
                  ))
                : null}
            </ValidatedField>
            {/* <ValidatedField style={isNew ? { borderRadius: "25px", borderColor: "#CBDCF7" } : { borderRadius: "25px", backgroundColor: "#A9B7CD", borderColor: "#CBDCF7", color: "#F6FAFF" }} disabled={isNew ? false : true} id="bill-patient" name="patient" data-cy="patient" label="Patient" type="select">
              <option value="" key="0" />
              {patients
                ? patients.map(otherEntity => (
                  <option value={otherEntity.id} key={otherEntity.id}>
                    {otherEntity.lastName + ' ' + otherEntity.firstName}
                  </option>
                ))
                : null}
            </ValidatedField> */}
            {formValues.map((element, index, arr) => (
              <div
                style={{
                  display: 'flex',
                  flex: '1 1 100%',
                  flexWrap: 'wrap',
                  gap: '0.7vw',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={index}
              >
                <ValidatedField
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '28vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  disabled={idEdit === 'voir' ? true : false}
                  type="text"
                  label="Médicament"
                  name="medecine"
                  value={element.medecine || ''}
                  onChange={e => handleChange(index, e)}
                />
                <ValidatedField
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '20vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  disabled={idEdit === 'voir' ? true : false}
                  type="number"
                  label="Durée (en Jours)"
                  name="duration"
                  value={element.duration || ''}
                  onChange={e => handleChange(index, e)}
                />
                <ValidatedField
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '20vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  disabled={idEdit === 'voir' ? true : false}
                  label="Féquence (par Jour)"
                  type="number"
                  name="frequency"
                  value={element.frequency || ''}
                  onChange={e => handleChange(index, e)}
                  validate={{
                    required: { value: false, message: 'Ce champ est obligatoire.' },
                    validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                  }}
                />
                {arr.length - 1 === index ? (
                  <span
                    hidden={idEdit === 'voir' ? true : false}
                    onClick={idEdit !== 'voir' ? () => addFormFields() : null}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      color: '#11485C',
                      borderRadius: '50%',
                      fontWeight: '900',
                      width: '1vw',
                      cursor: 'pointer',
                    }}
                  >
                    {React.createElement(IoIosAddCircle, { size: '25' })}
                  </span>
                ) : (
                  <span style={{ width: '1vw', color: 'transparent' }}>{React.createElement(IoIosAddCircleOutline, { size: '25' })}</span>
                )}

                {index ? (
                  <span
                    hidden={idEdit === 'voir' ? true : false}
                    onClick={idEdit !== 'voir' ? () => removeFormFields(index) : null}
                    style={{
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      borderColor: 'transparent',
                      color: '#EC4747',
                      fontWeight: '900',
                      width: '0.1vw',
                      display: 'inline',
                    }}
                  >
                    {React.createElement(IoIosRemoveCircle, { size: '25' })}
                  </span>
                ) : null}
              </div>
            ))}

            <Button
              style={{ borderRadius: '25px', flex: '1 1 100%', marginTop: '2vh' }}
              id="cancel-save"
              data-cy="entityCreateCancelButton"
              onClick={() => window.history.back()}
              replace
              color="danger"
            >
              <span className="d-none d-md-inline"> Retour</span>
            </Button>
            <Button
              style={{ borderRadius: '25px', flex: '1 1 100%', marginTop: '2vh', marginBottom: '2vh' }}
              color="primary"
              id="save-entity"
              data-cy="entityCreateSaveButton"
              type="submit"
              disabled={updating}
            >
              Sauvegarder
            </Button>
          </ValidatedForm>
        </Card>
      </div>
    </div>
    // <div>
    //   <Row className="justify-content-center">
    //     <Col md="8">
    //       <h2 id="ngirwiFrontEndApp.prescription.home.createOrEditLabel" data-cy="PrescriptionCreateUpdateHeading">
    //         Créer ou éditer une ordonnance
    //       </h2>
    //     </Col>
    //   </Row>
    //   <Row className="justify-content-center">
    //     <Col md="8">
    //       {loading ? (
    //         <p>Loading...</p>
    //       ) : (
    //         <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
    //           {!isNew ? <ValidatedField name="id" required readOnly id="prescription-id" label="ID" validate={{ required: true }} /> : null}
    // <ValidatedField
    //   disabled
    //   label="Date de création"
    //   id="prescription-creationDate"
    //   name="creationDate"
    //   data-cy="creationDate"
    //   type="datetime-local"
    //   placeholder="YYYY-MM-DD HH:mm"
    // />
    //           <ValidatedField hidden label="Author" id="prescription-author" name="author" data-cy="author" type="text" />
    // <ValidatedField id="prescription-consultation" name="consultation" data-cy="medecine" label="Consultation" type="select">
    //   <option value="" key="0" />
    //   {consultations
    //     ? consultations.map(otherEntity => (
    //       <option value={otherEntity.id} key={otherEntity.id}>
    //       Faite le  {otherEntity.dateTime} à { otherEntity.patient.lastName.toUpperCase()} {otherEntity.patient.firstName}
    //       </option>
    //     ))
    //     : null}
    // </ValidatedField>
    //           {formValues.map((element, index) => (
    //             <div key={index}>
    //               <ValidatedField
    //                 type="text"
    //                 label='Médicament'
    //                 name="medecine"
    //                 value={element.medecine || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //                 required
    //               />
    //               <ValidatedField
    //                 type="number"
    //                 label='Durée(en jours)'
    //                 name="duration"
    //                 value={element.duration || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //                 required
    //               />
    //               <ValidatedField
    //                 label='Fréquence(par jour)'
    //                 type="number"
    //                 name="frequency"
    //                 value={element.frequency || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //                 required
    //               />
    //               {index ? (
    //                 <Button
    //                   type="button"
    //                   className="btn btn-danger"
    //                   onClick={() => removeFormFields(index)}
    //                 >
    //                   Retirer
    //                 </Button>
    //               ) : null}
    //             </div>
    //           ))}
    //           <Button id='envoyer' replace color="success" onClick={() => addFormFields()}
    //             value="Envoyer">
    //             {/* <FontAwesomeIcon icon="arrow-left" /> */}
    //             &nbsp;
    //             <span className="d-none d-md-inline">Ajouter</span>
    //           </Button>
    //           &nbsp;
    //           <Button  id="cancel-save" data-cy="entityCreateCancelButton" onClick={() => window.history.back()} replace color="info">
    //             <FontAwesomeIcon icon="arrow-left" />

    //             <span className="d-none d-md-inline">Retour</span>
    //           </Button>
    //           &nbsp;
    //           <Button className="d-none d-md-inline" color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
    //             <FontAwesomeIcon icon="save" />
    //             &nbsp; Sauvegarder
    //           </Button>
    //         </ValidatedForm>
    //       )}
    //       <br />
    //       <PDFDownloadLink
    //         document={doc}
    //         fileName={`ordonnance_${account.login}_${JSON.stringify(displayDefaultDateTime)}`}
    //       >
    //         {({ loading }) =>
    //           loading ? (
    //             <Button color='primary'>Préparer fichier...</Button>
    //           ) : (
    //             <Button color='success'>Télécharger</Button>
    //           )
    //         }
    //       </PDFDownloadLink>
    //     </Col>
    //   </Row>
    // </div>
  );
};

export default PrescriptionUpdate;
