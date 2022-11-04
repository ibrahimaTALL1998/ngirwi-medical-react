import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Card } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeFromServerToDate, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { getEntity, updateEntity, createEntity, reset } from './bill.reducer';
import { createEntity as createElement, getEntity as getElement, updateEntity as updateElement } from '../bill-element/bill-element.reducer';

//pdf
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Header from 'app/shared/layout/header/header';
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io';
import { size } from 'lodash';

export const BillUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const billEntity = useAppSelector(state => state.bill.entity);
  const loading = useAppSelector(state => state.bill.loading);
  const updating = useAppSelector(state => state.bill.updating);
  const updateSuccess = useAppSelector(state => state.bill.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    navigate('/bill' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPatients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const patient = patients.filter(pat => {
    return pat.id == idPatient;
  })



  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...billEntity,
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
        date: displayDefaultDateTime(),
        patient: idPatient,
        author: account.login
      }
      : {
        ...billEntity,
        date: convertDateTimeFromServer(billEntity.date),
        patient: billEntity?.patient?.id,
      };



  //info ordonance
  const [formValues, setFormValues] = useState([
    { service: "", description: "", amount: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { service: "", description: "", amount: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Times-Roman",
      color: "green"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 10,
      marginHorizontal: 200,
      alignContent: "center",
      maxWidth: "30%",
      maxHeight: "30%",
    },
    imageHeader: {
      float: "right",
      maxWidth: "20%",
      maxHeight: "20%",
    }
  });



  let total = 0;

  let tab = () => {
    let newElement = [...formValues]

    for (let i = 0; i < newElement.length; i++) {
      total += parseInt(newElement[i].amount);
    }
    return total;
  }

  total = tab();


  const doc = (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <Image style={styles.imageHeader} src='content/images/Ngirwi_Transparent.png' />
          {/* <Image style={styles.image} src='content/images/serpent.png' /> */}
          <Text style={styles.title}> Facture</Text>
          <Text style={styles.text}>
            Date: {displayDefaultDateTime()}
          </Text>
          {/* <Text style={styles.text}>
            Patient: {patient.lastName + ' ' + patient.firstName}
          </Text> */}
          <Text style={styles.text}>
            Médecin: {account.login}
          </Text>
          {formValues.map(element => (
            <Text style={styles.text}>
              Service : {element.service} | Description : {element.description} | Montant : {element.amount}
            </Text>
            // <Text style={styles.text}>
            //   <b>Service</b> : {element.service} | <b>Description</b> : {element.description} | <b>Montant</b> : {element.amount} {'\n\n'}
            // </Text>
          ))}
          <Text style={styles.text}>
            Total (en FCFA): {total}
          </Text>
        </View>
      </Page>
    </Document>
  );

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
      <Header pageName={"Facture"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5vh",
          marginTop: "9.5vh"
        }}
      >

        <Card
          style={{
            height: "6.28vh",
            width: "32vw",
            maxWidth: "50vw",
            borderRadius: "20px",
            backgroundColor: "#11485C",
            textAlign: "center",
            color: "white",
            marginBottom: "5vh",
            marginLeft: "25vw",
            boxShadow: "0px 10px 50px rgba(138, 161, 203, 0.23)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button replace onClick={() => window.history.back()} style={{ color: "#53BFD1", backgroundColor: "#11485C", borderColor: "#11485C" }}>{React.createElement(IoIosArrowBack, { size: "20" })}</Button>
          <span>Enregistrement nouvelle facture</span>
        </Card>
        <Card
          style={{
            minHeight: "70vh",
            marginRight: "5%",
            boxShadow: "0px 10px 50px rgba(138, 161, 203, 0.23)",
            borderRadius: "15px"

          }}
        >
          <div
            style={{
              marginTop: "1%",
              paddingBottom: "2vh",
              position: "sticky",
              top: "0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "45%",
              backgroundColor: "white",
              borderBottom: "1px solid #B3C0D3"
            }}
          >
            <span style={{ marginLeft: "3%", color: "#141414", fontSize: "19px", }}>Nouvelle facture patient</span>
            <div style={{ display: "flex", flexDirection: "row", gap: "3vh" }}>
              <Button onClick={() => addFormFields()} style={{ backgroundColor: "white", borderColor: "white", color: "#B3C0D3", fontWeight: "900" }}>{React.createElement(IoIosAddCircleOutline, { size: "30" })}</Button>
              <PDFDownloadLink
                document={doc}
                fileName={`facture_${account.login}_${JSON.stringify(convertDateTimeFromServerToDate)}`}
              >
                {({ loading }) =>
                  loading ? (
                    <Button style={{ borderRadius: "25px" }} color='dark' disabled>Préparer fichier...</Button>
                  ) : (
                    <Button style={{ borderRadius: "25px" }} color='primary'>Télécharger la facture</Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
          <ValidatedForm
            style={{
              width: "94%",
              marginLeft: "3%",
              height: "70%",
              display: "grid",
              columnGap: "25px",
              marginTop: "1%",
              gridTemplateColumns: "repeat(2, 1fr)",
              fontSize: "12px",
              fontWeight: "900"
            }}
            defaultValues={defaultValues()} onSubmit={saveEntity}>
            {!isNew ? <ValidatedField hidden name="id" required readOnly id="bill-id" label="ID" validate={{ required: true }} /> : null}
            <ValidatedField
              style={{ borderRadius: "25px", backgroundColor: "#A9B7CD", color: "#F6FAFF", borderColor: "#CBDCF7" }}
              disabled label="Date" id="bill-date" name="date" data-cy="date" type="datetime-local" placeholder="YYYY-MM-DD HH:mm" />
            <ValidatedField hidden label="Author" id="bill-author" name="author" data-cy="author" type="text" />
            <ValidatedField style={isNew ? { borderRadius: "25px", borderColor: "#CBDCF7" } : { borderRadius: "25px", backgroundColor: "#A9B7CD", borderColor: "#CBDCF7", color: "#F6FAFF" }} disabled={isNew ? false : true} id="bill-patient" name="patient" data-cy="patient" label="Patient" type="select">
              <option value="" key="0" />
              {patients
                ? patients.map(otherEntity => (
                  <option value={otherEntity.id} key={otherEntity.id}>
                    {otherEntity.lastName + ' ' + otherEntity.firstName}
                  </option>
                ))
                : null}
            </ValidatedField>
            {formValues.map((element, index) => (
              <div style={{ display: "grid", gridColumn: "1/3", gridTemplateColumns: "repeat(3,1fr)", columnGap: "2vh" }} key={index}>
                <ValidatedField
                  style={{
                    borderRadius: "25px",
                    borderColor: "#CBDCF7"
                  }}
                  type="text"
                  label='Désignation'
                  name="service"
                  value={element.service || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <ValidatedField
                  style={{
                    borderRadius: "25px",
                    borderColor: "#CBDCF7"
                  }}
                  type="number"
                  label='Quantité'
                  name="description"
                  value={element.description || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <ValidatedField
                  style={{
                    borderRadius: "25px",
                    borderColor: "#CBDCF7"
                  }}
                  label='Prix (FCFA)'
                  type="number"
                  name="amount"
                  value={element.amount || ""}
                  onChange={(e) => handleChange(index, e)}
                  validate={{
                    required: { value: false, message: 'Ce champ est obligatoire.' },
                    validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                  }}
                />
                {index ? (
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFormFields(index)}
                  >
                    Retirer
                  </Button>
                ) : null}
              </div>
            ))}

            <Button style={{ borderRadius: "25px", gridColumn: "1/3", marginTop: "2vh" }} id="cancel-save" data-cy="entityCreateCancelButton" onClick={() => window.history.back()} replace color="danger">
              <span className="d-none d-md-inline"> Retour</span>
            </Button>
            <Button style={{ borderRadius: "25px", gridColumn: "1/3", marginTop: "2vh" }} color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
              Sauvegarder
            </Button>
          </ValidatedForm>


        </Card>
      </div>

    </div>
    // <div>
    //   <Row className="justify-content-center">
    //     <Col md="8">
    //       <h2 id="ngirwiFrontEndApp.bill.home.createOrEditLabel" data-cy="BillCreateUpdateHeading">
    //         Créer ou éditer une facture
    //       </h2>
    //     </Col>
    //   </Row>
    //   <Row className="justify-content-center">
    //     <Col md="8">
    //       {loading ? (
    //         <p>Loading...</p>
    //       ) : (
    //         <Card>
    //       <ValidatedForm
    // style={{
    //   width:"94%",
    //   marginLeft:"3%",
    //   height:"70%",
    //   display:"grid",
    //   columnGap:"25px",
    //   marginTop:"1%",
    //   gridTemplateColumns : "repeat(3, 5fr)",
    //   fontSize:"12px",
    //   fontWeight:"900"
    // }}          
    // defaultValues={defaultValues()} onSubmit={saveEntity}>
    //           {!isNew ? <ValidatedField hidden name="id" required readOnly id="bill-id" label="ID" validate={{ required: true }} /> : null}
    //           <ValidatedField 
    //           style={{borderRadius:"25px",width:"25vw",backgroundColor:"#A9B7CD",color:"#F6FAFF",borderColor:"#CBDCF7"}}
    //           disabled label="Date" id="bill-date" name="date" data-cy="date" type="datetime-local" placeholder="YYYY-MM-DD HH:mm" />
    //           <ValidatedField hidden label="Author" id="bill-author" name="author" data-cy="author" type="text" />
    //           <ValidatedField style={isNew?{borderRadius:"25px",width:"25vw",borderColor:"#CBDCF7"}:{borderRadius:"25px",width:"25vw",backgroundColor:"#A9B7CD",borderColor:"#CBDCF7",color:"#F6FAFF"}} disabled={isNew?false:true} id="bill-patient" name="patient" data-cy="patient" label="Patient" type="select">
    //             <option value="" key="0" />
    //             {patients
    //               ? patients.map(otherEntity => (
    //                 <option value={otherEntity.id} key={otherEntity.id}>
    //                   {otherEntity.lastName+' '+otherEntity.firstName}
    //                 </option>
    //               ))
    //               : null}
    //           </ValidatedField>
    //           {formValues.map((element, index) => (
    //             <div key={index}>
    //               <ValidatedField
    //                 type="text"
    //                 label='Désignation'
    //                 name="service"
    //                 value={element.service || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //               />
    //               <ValidatedField
    //                 type="number"
    //                 label='Quantité'
    //                 name="description"
    //                 value={element.description || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //               />
    //               <ValidatedField
    //                 label='Prix (FCFA)'
    //                 type="number"
    //                 name="amount"
    //                 value={element.amount || ""}
    //                 onChange={(e) => handleChange(index, e)}
    //                 validate={{
    //                   required: { value: false, message: 'Ce champ est obligatoire.' },
    //                   validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
    //                 }}
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

    //             <span className="d-none d-md-inline">Ajouter</span>
    //           </Button>
    //           &nbsp;
    //           <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bill" replace color="info">
    //             <FontAwesomeIcon icon="arrow-left" />
    //             &nbsp;
    //             <span className="d-none d-md-inline"> &nbsp; Retour</span>
    //           </Button>
    //           &nbsp;
    //           <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
    //             <FontAwesomeIcon icon="save" />
    //             &nbsp; Sauvegarder
    //           </Button>
    //         </ValidatedForm>
    //         </Card>

    //       )}
    //       <br/>
    // <PDFDownloadLink
    //   document={doc}
    //   fileName={`ordonnance_${account.login}_${JSON.stringify(displayDefaultDateTime)}`}
    // >
    //   {({ loading }) =>
    //     loading ? (
    //       <Button color='primary'>Préparer fichier...</Button>
    //     ) : (
    //       <Button color='success'>Télécharger</Button>
    //     )
    //   }
    // </PDFDownloadLink>
    //     </Col>
    //   </Row>
    // </div>
  );
};

export default BillUpdate;
