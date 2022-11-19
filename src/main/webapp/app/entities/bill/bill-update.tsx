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

import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { getEntity, updateEntity, createEntity, reset } from './bill.reducer';
import {
  createEntity as createElement,
  getEntity as getElement,
  updateEntity as updateElement,
} from '../bill-element/bill-element.reducer';

//pdf
import { Page, Text, Image, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import Header from 'app/shared/layout/header/header';
import { IoIosAddCircleOutline, IoIosArrowBack, IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { size } from 'lodash';
import { AiFillCloseCircle, AiOutlineLock } from 'react-icons/ai';
import { BiDownload } from 'react-icons/bi';
import { BrandIcon } from 'app/shared/layout/header/header-components';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
export const BillUpdate = () => {
  const dispatch = useAppDispatch();
  const assurance = [
    { label: '', id: '0' },
    { label: 'ALLIANCE INTERNATIONAL', id: '1' },
    { label: 'AMSA ASSURANCES', id: '2' },
    { label: 'ASKIA ASSURANCES', id: '3' },
    { label: 'ASSOCIATION ASSOFAL', id: '4' },
    { label: 'ASSUR CONSEILS MARSH', id: '5' },
    { label: 'ASSURANCES LA SECURITE SENEGALAISE', id: '6' },
    { label: 'AXA ASSURANCES', id: '7' },
    { label: 'AXA INTERNATIONAL', id: '8' },
    { label: 'CGA SANTE', id: '9' },
    { label: 'CIGNA', id: '10' },
    { label: 'CNART ASSURANCES', id: '11' },
    { label: 'COLINA', id: '12' },
    { label: 'EURO CENTER', id: '13' },
    { label: 'EUROP ASSISTANCE', id: '14' },
    { label: 'GMC', id: '15' },
    { label: 'GRAS SAVOYE', id: '16' },
    { label: 'NSIA', id: '17' },
    { label: 'PREVOYANCE ASSURANCE', id: '18' },
    { label: 'SAAR VIE', id: '19' },
    { label: 'SALAMA ASSURANCES', id: '20' },
    { label: 'SEGMA', id: '21' },
    { label: 'SONAM', id: '22' },
    { label: 'UASEN VIE', id: '23' },
  ];
  const ipm = [
    { label: '', id: '0' },
    { label: 'AFRIC MANAGEMENT', id: '1' },
    { label: 'ARMEMENT DE PECHE', id: '2' },
    { label: 'BANQUE ISLAMIQUE DE SENEGAL', id: '3' },
    { label: 'BCEAO', id: '4' },
    { label: 'BHS', id: '5' },
    { label: 'BICIS', id: '6' },
    { label: 'BOKK', id: '7' },
    { label: 'CAISSE SECU SOC', id: '8' },
    { label: 'CBAO', id: '9' },
    { label: 'CITIBANK', id: '10' },
    { label: 'CNCAS', id: '11' },
    { label: 'COTONIERE DU CAP VERT', id: '12' },
    { label: 'CNCAS', id: '13' },
    { label: 'CSE', id: '14' },
    { label: 'CSS', id: '15' },
    { label: 'ECOBANK', id: '16' },
    { label: 'EIFFAGE SENEGAL', id: '17' },
    { label: 'FILFILI', id: '18' },
    { label: 'GROUPE MIMRAN', id: '19' },
    { label: 'ICS', id: '20' },
    { label: 'INTER-ENTREPRISE DU PERSONNEL', id: '21' },
    { label: 'IPM NDIMBAL', id: '22' },
    { label: 'KEUR GU MAG', id: '23' },
    { label: 'LA POSTE', id: '24' },
    { label: 'LONASE', id: '25' },
    { label: 'MBARUM KOLUTE', id: '26' },
    { label: 'MERIDIEN KING FAHD PALACE', id: '27' },
    { label: 'MUTUELLE HOTELIERE DU CAP VERT', id: '28' },
    { label: 'NDIMBAL', id: '29' },
    { label: 'NESTLE SENEGAL', id: '30' },
    { label: 'NJABOOT', id: '31' },
    { label: 'OXFAM', id: '32' },
    { label: 'PREVOYANCE DU PERSONEL SOSETER', id: '33' },
    { label: 'PROFESSION LIBERALE', id: '34' },
    { label: 'SAGAM', id: '35' },
    { label: 'SANTE POUR TOUS', id: '36' },
    { label: 'SAR', id: '37' },
    { label: 'SDE', id: '38' },
    { label: 'SENELEC', id: '39' },
    { label: 'SENTENAC', id: '40' },
    { label: 'SERA', id: '41' },
    { label: 'SGBS', id: '42' },
    { label: 'SOBOA', id: '43' },
    { label: 'SODEFITEX', id: '44' },
    { label: 'SONATEL', id: '45' },
    { label: 'SOSETER', id: '46' },
    { label: 'SYPAOA', id: '47' },
    { label: 'TRANSIT', id: '48' },
    { label: 'TRANSPORT AERIEN', id: '49' },
  ];
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idPatient } = useParams<'idPatient'>();
  const { idEdit } = useParams<'idEdit'>();
  const isNew = id === undefined;

  const patients = useAppSelector(state => state.patient.entities);
  const billEntity = useAppSelector(state => state.bill.entity);
  const loading = useAppSelector(state => state.bill.loading);
  const updating = useAppSelector(state => state.bill.updating);
  const updateSuccess = useAppSelector(state => state.bill.updateSuccess);
  const [blockIPM, setBlockIPM] = useState('');
  const [blockAssurance, setBlockAssurance] = useState('');

  const account = useAppSelector(state => state.authentication.account);
  const [patientId, setPatientId] = useState(patients);

  let getPatient = e => {
    setPatientId(e.target.value);
  };

  let getIPM = e => {
    setBlockIPM(e.target.value);
    return e.target.value;
  };
  let getAssurance = e => {
    setBlockAssurance(e.target.value);
    return e.target.value;
  };
  let resetBlock = () => {
    setBlockAssurance('');
    setBlockIPM('');
  };
  let p;
  let n;
  let prenomPatient = () => {
    patients.map(otherEntity =>
      otherEntity.id.toString() === patientId.toString()
        ? // console.log(otherEntity.id+"."+otherEntity.patient.lastName)
          (p = otherEntity.firstName)
        : console.log(otherEntity.id)
    );

    return p;
  };
  let nomPatient = () => {
    patients.map(otherEntity =>
      otherEntity.id.toString() === patientId.toString()
        ? // console.log(otherEntity.id+"."+otherEntity.patient.lastName)
          (n = otherEntity.lastName.toUpperCase())
        : console.log(otherEntity.id)
    );

    return n;
  };
  p = prenomPatient();
  n = nomPatient();
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
  });

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
          author: account.login,
        }
      : {
          ...billEntity,
          date: convertDateTimeFromServer(billEntity.date),
          patient: billEntity?.patient?.id,
        };

  //info ordonance
  const [formValues, setFormValues] = useState([{ service: '', amount: '', taux: '', quantity: '' }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { service: '', amount: '', taux: '', quantity: '' }]);
  };

  let removeFormFields = i => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      color: 'green',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    image: {
      marginVertical: 10,
      marginHorizontal: 200,
      alignContent: 'center',
      maxWidth: '30%',
      maxHeight: '30%',
    },
    imageHeader: {
      float: 'right',
      maxWidth: '20%',
      maxHeight: '20%',
    },
  });
  let nombre = 1;
  let tarif = 0;
  let total = 0;
  let remise = 0;
  let tab = () => {
    let newElement = [...formValues];

    for (let i = 0; i < newElement.length; i++) {
      if (newElement[i].taux !== '') {
        remise = 1 - parseInt(newElement[i].taux, 10) / 100;
      } else {
        remise = 1;
      }
      if (newElement[i].amount !== '') {
        tarif = parseInt(newElement[i].amount, 10);
      } else {
        tarif = 0;
      }
      if (newElement[i].quantity === '') {
        nombre = 1;
      } else {
        nombre = parseInt(newElement[i].quantity, 10);
      }
      total += Math.round(tarif * remise * nombre);
    }
    return total;
  };

  total = tab();

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
            borderBottom: '1px solid #141414',
            paddingBottom: '10px',
            marginTop: '20px',
            marginLeft: '10vw',
            marginRight: '10vw',
            width: '80vw',
          }}
        >
          {/* <View style={{ display: "flex", flexDirection: "column", justifyContent: 'space-around', alignItems: "center" }}>
            <Text style={{ fontSize: "20px", color: "green", marginBottom: "9px",fontWeight:"bold"}}>Nom médecin</Text>
            <Text style={{ fontSize: "15px", marginBottom: "9px" ,fontWeight:"medium"}}>Médecin général</Text>
            <Text style={{ fontSize: "15px",fontWeight:"thin" }}>Téléphone</Text>
          </View> */}
          {/* <View>
            <Image style={{ width: "50px", height: "50px" }} src='content/images/serpent.png' />
          </View> */}
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={{ fontSize: '10px', marginBottom: '9px', fontWeight: 'bold' }}>Nom clinique</Text>
            <Text style={{ fontSize: '10px', marginBottom: '9px', fontWeight: 'medium' }}>Adresse</Text>
            <Text style={{ fontSize: '10px', fontWeight: 'thin' }}>Email Clinique</Text>
            <Text style={{ fontSize: '10px', fontWeight: 'thin' }}>Telephone Clinique</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'extrabold', marginBottom: '5px' }}>Facture</Text>
          <Text style={{ fontSize: '12px', marginBottom: '9px', marginLeft: '60vw' }}>
            {' '}
            Dakar, Le {convertDateTimeFromServerToDate(displayDefaultDateTime())}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '15px', marginLeft: '5vw' }}>
          <Text style={{ fontSize: '12px', marginBottom: '7px' }}>
            Nom : {billEntity.patient ? billEntity?.patient?.lastName.toUpperCase() : n}{' '}
          </Text>
          <Text style={{ fontSize: '12px', marginBottom: '7px' }}>
            Prénom(s): {billEntity.patient ? billEntity?.patient?.firstName : p}{' '}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
            border: '1px solid #141414',
            marginLeft: '5vw',
            marginRight: '5vw',
            width: '90vw',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                width: '15vw',
                height: '6vh',
                borderRight: '1px solid #141414',
                textTransform: 'uppercase',
                fontSize: '12px',
                color: '#141414',
                paddingTop: '20px',
                textAlign: 'center',
              }}
            >
              Quantité
            </Text>
            <Text
              style={{
                width: '25vw',
                height: '6vh',
                borderRight: '1px solid #141414',
                textTransform: 'uppercase',
                fontSize: '12px',
                color: '#141414',
                padding: '10px',
                paddingTop: '20px',
                textAlign: 'center',
              }}
            >
              Intervention
            </Text>
            <Text
              style={{
                width: '20vw',
                height: '6vh',
                textTransform: 'uppercase',
                fontSize: '12px',
                color: '#141414',
                padding: '10px',
                paddingTop: '20px',
                textAlign: 'center',
              }}
            >
              Prix unitaire
            </Text>
            <Text
              style={{
                width: '10vw',
                height: '6vh',
                borderLeft: '1px solid #141414',
                textTransform: 'uppercase',
                fontSize: '12px',
                paddingRight: '5px',
                paddingTop: '20px',
                paddingLeft: '5px',
                color: '#141414',
                textAlign: 'center',
              }}
            >
              Remise
            </Text>
            <Text
              style={{
                width: '20vw',
                height: '6vh',
                borderLeft: '1px solid #141414',
                textTransform: 'uppercase',
                fontSize: '12px',
                color: '#141414',
                padding: '10px',
                paddingTop: '20px',
                textAlign: 'center',
              }}
            >
              Prix total
            </Text>
          </View>
          {formValues.map((element, i) =>
            element.service.length > 0 ? (
              <View key={`entity-${i}`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    width: '15vw',
                    height: '6vh',
                    borderRight: '1px solid #141414',
                    borderTop: '1px solid #141414',
                    fontSize: '15px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {element.quantity === '' ? '1' : element.quantity}
                </Text>
                <Text
                  style={{
                    width: '25vw',
                    height: '6vh',
                    borderRight: '1px solid #141414',
                    borderTop: '1px solid #141414',
                    fontSize: '15px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {element.service}
                </Text>
                <Text
                  style={{
                    width: '20vw',
                    height: '6vh',
                    borderTop: '1px solid #141414',
                    fontSize: '15px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {element.amount === '' ? '0' : element.amount} FCFA
                </Text>
                <Text
                  style={{
                    width: '10vw',
                    height: '6vh',
                    borderTop: '1px solid #141414',
                    borderLeft: '1px solid #141414',
                    fontSize: '15px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {element.taux === '' ? '0' : element.taux} %
                </Text>
                <Text
                  style={{
                    width: '20vw',
                    height: '6vh',
                    borderTop: '1px solid #141414',
                    borderLeft: '1px solid #141414',
                    fontSize: '15px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {Math.round(
                    parseInt(element.amount === '' ? '0' : element.amount, 10) *
                      (1 - parseInt(element.taux === '' ? '0' : element.taux, 10) / 100) *
                      parseInt(element.quantity === '' ? '1' : element.quantity, 10)
                  )}{' '}
                  FCFA
                  {/* {Math.round(tarif*remise*nombre)} */}
                </Text>
              </View>
            ) : null
          )}
          <View style={{ borderTop: '1px solid #141414', width: '90vw', paddingLeft: '5px', paddingRight: '5px' }}>
            <Text style={{ width: '60vw' }}>Montant total : </Text>
            <Text style={{ position: 'absolute', right: '0' }}>{total + 'FCFA'} </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  // const doc = (
  //   <Document>
  //     <Page size="A4" style={styles.page} wrap>
  //       <View style={styles.section}>
  //         <Image style={styles.imageHeader} src='content/images/Ngirwi_Transparent.png' />
  //         <Text style={styles.title}> Facture</Text>
  //         <Text style={styles.text}>
  //           Date: {displayDefaultDateTime()}
  //         </Text>
  //         <Text style={styles.text}>
  //           Médecin: {account.login}
  //         </Text>
  //         {formValues.map((element,i) => (
  //           <Text key={`e${i}`} style={styles.text}>
  //             Service : {element.service} | Description : {element.amount} | Montant : {element.taux}
  //           </Text>
  //         ))}
  //         <Text style={styles.text}>
  //           Total (en FCFA): {total}
  //         </Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );
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
      <Header pageName={'Facture'} />
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
          <span>{isNew ? 'Enregistrement nouvelle ' : idEdit === 'voir' ? 'Consultation ' : 'Modification '} facture</span>
        </Card>
        <Card
          style={{
            minHeight: '70vh',
            marginRight: '3%',
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
            <span style={{ marginLeft: '3%', color: '#141414', fontSize: '19px', width: '65vw' }}>
              {isNew ? 'Nouvelle facture ' : 'Facture '}patient
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3vh' }}>
              <PDFDownloadLink document={doc} fileName={`facture_${account.login}_${JSON.stringify(convertDateTimeFromServerToDate)}`}>
                {({ loading }) =>
                  loading ? (
                    // <Button style={{ borderRadius: "25px" }} color='dark' disabled>Préparer fichier...</Button>
                    <span style={{ cursor: 'pointer', fontWeight: '900', color: '#B3C0D3', textAlign: 'center', marginRight: '2vw' }}>
                      Préparation...
                    </span>
                  ) : (
                    // <FontAwesomeIcon style={{ color: "black", fontSize: "25px" }} icon={"loader"} spin={loading} />
                    <span style={{ cursor: 'pointer', fontWeight: '900', color: '#B3C0D3', textAlign: 'center' }}>
                      {React.createElement(BiDownload, { size: '25' })} Télécharger
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
              backgroundPosition: '60% 120%',
            }}
            defaultValues={defaultValues()}
            onSubmit={saveEntity}
          >
            {!isNew ? <ValidatedField hidden name="id" required readOnly id="bill-id" label="ID" validate={{ required: true }} /> : null}
            <ValidatedField
              style={{ borderRadius: '25px', backgroundColor: '#A9B7CD', color: '#F6FAFF', borderColor: '#CBDCF7', width: '75vw' }}
              disabled
              label="Date"
              id="bill-date"
              name="date"
              data-cy="date"
              type="datetime-local"
              placeholder="YYYY-MM-DD HH:mm"
            >
              <i className="fa-light fa-lock" style={{ position: 'absolute', zIndex: '0', color: 'white', right: '0' }}>
                {' '}
              </i>
            </ValidatedField>
            <ValidatedField hidden label="Author" id="bill-author" name="author" data-cy="author" type="text" />
            <ValidatedField
              onChange={e => getPatient(e)}
              style={
                isNew
                  ? { borderRadius: '25px', borderColor: '#CBDCF7', width: '28vw' }
                  : { borderRadius: '25px', backgroundColor: '#A9B7CD', borderColor: '#CBDCF7', color: '#F6FAFF', width: '28vw' }
              }
              disabled={isNew ? false : true}
              id="bill-patient"
              name="patient"
              data-cy="patient"
              label="Patient"
              type="select"
            >
              <option value="" key="0" />
              {patients
                ? patients.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.lastName + ' ' + otherEntity.firstName}
                    </option>
                  ))
                : null}
            </ValidatedField>
            <ValidatedField
              style={
                isNew
                  ? {
                      borderRadius: '25px',
                      borderColor: '#CBDCF7',
                      width: '20vw',
                    }
                  : {
                      borderRadius: '25px',
                      borderColor: '#CBDCF7',
                      width: '20vw',
                      backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                      color: idEdit === 'voir' ? '#F6FAFF' : '',
                    }
              }
              disabled={
                isNew && blockIPM === '' ? false : isNew && blockIPM !== '' ? true : idEdit !== 'voir' && blockIPM === '' ? false : true
              }
              id="bill-asurance"
              name="asurance"
              data-cy="asurance"
              label="Assurance"
              type="select"
              onChange={e => getAssurance(e)}
            >
              {assurance.map((assur, i) => (
                <option value={assur.label} key={assur.id}>
                  {assur.label}
                </option>
              ))}
            </ValidatedField>
            <ValidatedField
              style={
                isNew
                  ? { borderRadius: '25px', borderColor: '#CBDCF7', width: '20vw' }
                  : {
                      borderRadius: '25px',
                      borderColor: '#CBDCF7',
                      width: '20vw',
                      backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                      color: idEdit === 'voir' ? '#F6FAFF' : '',
                    }
              }
              id="bill-ipm"
              name="ipm"
              data-cy="ipm"
              label="IPM"
              type="select"
              disabled={
                isNew && blockAssurance === ''
                  ? false
                  : isNew && blockAssurance !== ''
                  ? true
                  : idEdit !== 'voir' && blockAssurance === ''
                  ? false
                  : true
              }
              onChange={e => getIPM(e)}
            >
              {ipm.map((a, i) => (
                <option value={a.label} key={a.id}>
                  {a.label}
                </option>
              ))}
            </ValidatedField>
            {/* <Button
              onClick={() => resetBlock()}
              style={{
                width: "4vw",
                color: "red",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
            >
              {React.createElement(AiFillCloseCircle, { size: "25" })}
            </Button> */}
            {formValues.map((element, index, arr) => (
              <div
                style={{
                  flex: '1 1 100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.7vw',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={index}
              >
                <ValidatedField
                  type="number"
                  label="Quantité"
                  name="quantity"
                  min="1"
                  value={element.quantity || ''}
                  onChange={e => handleChange(index, e)}
                  required
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '6vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                />
                <ValidatedField
                  disabled={idEdit === 'voir' ? true : false}
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '21vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  type="text"
                  label="Intervention"
                  placeholder="Intervention..."
                  name="service"
                  value={element.service || ''}
                  onChange={e => handleChange(index, e)}
                  validate={{
                    required: { value: false, message: 'Ce champ est obligatoire.' },
                  }}
                />
                <ValidatedField
                  disabled={idEdit === 'voir' ? true : false}
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '20vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  type="number"
                  label="Tarif unitaire(FCFA)"
                  placeholder="Tarif..."
                  name="amount"
                  value={element.amount || ''}
                  onChange={e => handleChange(index, e)}
                  validate={{
                    required: { value: false, message: 'Ce champ est obligatoire.' },
                    validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                  }}
                />
                <ValidatedField
                  disabled={idEdit === 'voir' ? true : false}
                  style={{
                    borderRadius: '25px',
                    borderColor: '#CBDCF7',
                    width: '20vw',
                    backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                    color: idEdit === 'voir' ? '#F6FAFF' : '',
                  }}
                  label="Taux de remboursement(en %)"
                  type="number"
                  name="taux"
                  placeholder="Taux..."
                  value={element.taux || ''}
                  onChange={e => handleChange(index, e)}
                />
                {arr.length - 1 === index ? (
                  <span
                    onClick={() => addFormFields()}
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
                    onClick={() => removeFormFields(index)}
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
            <ValidatedField
              value={isNaN(total) ? 'Calcul en cours...' : total}
              style={
                isNew
                  ? { borderRadius: '25px', borderColor: '#CBDCF7', width: '36vw' }
                  : {
                      borderRadius: '25px',
                      borderColor: '#CBDCF7',
                      width: '36vw',
                      backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                      color: idEdit === 'voir' ? '#F6FAFF' : '',
                    }
              }
              disabled
              id="bill-total"
              name="total"
              data-cy="total"
              label="Montant Total(CFA)"
              placeholder="Montant..."
              type="text"
            />
            <ValidatedField
              style={
                isNew
                  ? { borderRadius: '25px', borderColor: '#CBDCF7', width: '36vw', height: '20vh' }
                  : {
                      borderRadius: '25px',
                      borderColor: '#CBDCF7',
                      width: '36vw',
                      height: '20vh',
                      backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '',
                      color: idEdit === 'voir' ? '#F6FAFF' : '',
                    }
              }
              disabled={isNew || idEdit !== 'voir' ? false : idEdit === 'voir' ? false : true}
              id="bill-desc"
              name="desc"
              data-cy="total"
              label="Description"
              placeholder="Description..."
              type="textarea"
            />

            <Button
              hidden={idEdit === 'voir' ? true : false}
              style={{ borderRadius: '25px', flex: '1 1 100%', marginTop: '2vh', backgroundColor: '#56B5C5', borderColor: '#56B5C5' }}
              id="save-entity"
              data-cy="entityCreateSaveButton"
              type="submit"
              disabled={updating}
            >
              Enregistrer
            </Button>
            <Button
              style={{
                borderRadius: '25px',
                flex: '1 1 100%',
                marginTop: '2vh',
                backgroundColor: '#EC4747',
                borderColor: '#EC4747',
                marginBottom: '2vh',
              }}
              id="cancel-save"
              data-cy="entityCreateCancelButton"
              onClick={() => window.history.back()}
              replace
              color="danger"
            >
              <span className="d-none d-md-inline"> {idEdit === 'voir' ? 'Retour' : 'Annuler'} </span>
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
