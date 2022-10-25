import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities as getConsultations } from 'app/entities/consultation/consultation.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntity, updateEntity, createEntity, reset } from './prescription.reducer';

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
import { AccountMenu } from 'app/shared/layout/menus';

export const PrescriptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const { idConsultation } = useParams<'idConsultation'>();
  const isNew = id === undefined;

  const consultations = useAppSelector(state => state.consultation.entities);
  const prescriptionEntity = useAppSelector(state => state.prescription.entity);
  const loading = useAppSelector(state => state.prescription.loading);
  const updating = useAppSelector(state => state.prescription.updating);
  const updateSuccess = useAppSelector(state => state.prescription.updateSuccess);

  const account = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    navigate('/prescription' + location.search);
  };
  function rtn(){
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
    return consult.id == idConsultation
  })

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
        creationDate: displayDefaultDateTime(),
        consultation: idConsultation,
        author: account.login
      }
      : {
        ...prescriptionEntity,
        creationDate: convertDateTimeFromServer(prescriptionEntity.creationDate),
        consultation: prescriptionEntity?.consultation?.id,
      };


  //info ordonance
  const [medecine, setMedecine] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [formValues, setFormValues] = useState([
    { medecine: "", duration: "", frequency: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { medecine: "", duration: "", frequency: "" },
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

  const doc = (

      <Document>
        <Page style={{display:"flex",flexDirection:"column"}}>
          <View style={{display:"flex", flexDirection:"row",justifyContent:'space-around',alignItems:"center", borderBottom:"1px solid green", paddingBottom:"10px",marginTop:"20px"}}>
            <View style={{display:"flex",flexDirection:"column",justifyContent:'space-around',alignItems:"center"}}>
              <Text style={{fontSize:"20px", color:"green",marginBottom:"9px"}}>Nom médecin</Text>
              <Text style={{fontSize:"15px",marginBottom:"9px"}}>Médecin général</Text>
              <Text style={{fontSize:"15px"}}>Téléphone</Text>
            </View>
            <View>
              <Image style={{width:"50px",height:"50px"}} src='content/images/serpent.png'/>
            </View>
            <View style={{display:"flex",flexDirection:"column",justifyContent:'space-around',alignItems:"center"}}>
              <Text style={{fontSize:"20px", color:"green",marginBottom:"9px"}}>Nom clinique</Text>
              <Text style={{fontSize:"15px",marginBottom:"9px"}}>Adresse</Text>
              <Text style={{fontSize:"15px"}}>Email Clinique</Text>
            </View>
          </View>
          <View style={{display:"flex",flexDirection:"column",justifyContent:'space-around',alignItems:"center", marginTop:"15px"}}>
            <Text style={{fontSize:"35px", fontWeight:"extrabold",marginBottom:"9px"}}>Ordonnance Médicale</Text>
            <Text style={{fontSize:"18px",marginBottom:"9px"}}> Fait à: ...................... Le: ...../......./......</Text>
            <Text style={{fontSize:"18px",marginBottom:"7px"}}>Nom et Prénom(s): ..............................................</Text>
          </View>
          <View style={{display:"flex",flexDirection:"column",alignItems:"center", marginTop:"15px",border:"3px solid silver",marginLeft:"10vw",marginRight:"5vw",width:"80vw"}}>
              <View style={{display:"flex", flexDirection:"row",justifyContent:'center',alignItems:"center"}}>
                <Text style={{width:"40vw",borderRight:"3px solid silver",textTransform:"uppercase",fontSize:"15px",color:"green",paddingTop:"3px",paddingBottom:"3px",textAlign:"center"}}>Médicament(s)</Text>
                <Text style={{width:"20vw",textTransform:"uppercase",fontSize:"15px",color:"green",paddingTop:"3px",paddingBottom:"3px",textAlign:"center"}}>Durée</Text>
                <Text style={{width:"20vw",borderLeft:"3px solid silver",textTransform:"uppercase",fontSize:"15px",color:"green",paddingTop:"3px",paddingBottom:"3px",textAlign:"center"}}>Fréquence</Text>
              </View>
              {formValues.map(element => element.medecine != '' ?(
                <View key={element.duration} style={{display:"flex", flexDirection:"row",justifyContent:'center',alignItems:"center"}}>
                  <Text style={{width:"40vw",borderRight:"3px solid silver",borderTop:"3px solid silver",fontSize:"15px",paddingTop:"5px",paddingBottom:"3px",textAlign:"center"}}>{element.medecine}</Text>
                  <Text style={{width:"20vw",borderTop:"3px solid silver",fontSize:"15px",paddingTop:"5px",paddingBottom:"3px",textAlign:"center"}}>{element.duration} Jours</Text>
                  <Text style={{width:"20vw",borderTop:"3px solid silver",borderLeft:"3px solid silver",fontSize:"15px",paddingTop:"5px",paddingBottom:"3px",textAlign:"center"}}>{element.frequency} /J</Text>
                </View>
              ):(
                <View key={element.duration} style={{display:"flex", flexDirection:"row",justifyContent:'center',alignItems:"center"}}>
                <Text style={{width:"80vw",borderRight:"3px solid silver",borderTop:"3px solid silver",fontSize:"15px",paddingTop:"5px",paddingBottom:"3px",textAlign:"center"}}>Aucun médicament préscrit</Text>
              </View>
              ))}
          </View>
        </Page>
      </Document>
  );



  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ngirwiFrontEndApp.prescription.home.createOrEditLabel" data-cy="PrescriptionCreateUpdateHeading">
            Créer ou éditer une ordonnance
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="prescription-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                disabled
                label="Date de création"
                id="prescription-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField hidden label="Author" id="prescription-author" name="author" data-cy="author" type="text" />
              <ValidatedField id="prescription-consultation" name="consultation" data-cy="medecine" label="Consultation" type="select">
                <option value="" key="0" />
                {consultations
                  ? consultations.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.id}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              {formValues.map((element, index) => (
                <div key={index}>
                  <ValidatedField
                    type="text"
                    label='Médicament'
                    name="medecine"
                    value={element.medecine || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                  <ValidatedField
                    type="number"
                    label='Durée(en jours)'
                    name="duration"
                    value={element.duration || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                  <ValidatedField
                    label='Fréquence(par jour)'
                    type="number"
                    name="frequency"
                    value={element.frequency || ""}
                    onChange={(e) => handleChange(index, e)}
                    required
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
              <Button id='envoyer' replace color="success" onClick={() => addFormFields()}
                value="Envoyer">
                {/* <FontAwesomeIcon icon="arrow-left" /> */}
                &nbsp;
                <span className="d-none d-md-inline">Ajouter</span>
              </Button>
              &nbsp;
              <Button  id="cancel-save" data-cy="entityCreateCancelButton" onClick={() => window.history.back()} replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                
                <span className="d-none d-md-inline">Retour</span>
              </Button>
              &nbsp;
              <Button className="d-none d-md-inline" color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Sauvegarder
              </Button>
            </ValidatedForm>
          )}
          <br />
          <PDFDownloadLink
            document={doc}
            fileName={`ordonnance_${account.login}_${JSON.stringify(displayDefaultDateTime)}`}
          >
            {({ loading }) =>
              loading ? (
                <Button color='primary'>Préparer fichier...</Button>
              ) : (
                <Button color='success'>Télécharger</Button>
              )
            }
          </PDFDownloadLink>
        </Col>
      </Row>
    </div>
  );
};

export default PrescriptionUpdate;
