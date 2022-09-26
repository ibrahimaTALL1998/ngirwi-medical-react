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
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <Image style={styles.imageHeader} src='content/images/Ngirwi_Transparent.png' />
          <Image style={styles.image} src='content/images/serpent.png' />
          <Text style={styles.title}> Ordonance Médicale</Text>
          <Text style={styles.text}>
            Service:
          </Text>
          <Text style={styles.text}>
            Date: {displayDefaultDateTime()}
          </Text>
          {/* <Text style={styles.text}>
            Patient: {name} {surname}
          </Text> */}
          <Text style={styles.text}>
            Médecin: {account.login}
          </Text>
          {formValues.map(element => (
            <Text style={styles.text}>
              Médicament : {element.medecine} | Durée : {element.duration} | Fréquence : {element.frequency} {'\n\n'}
            </Text>
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
                label="Creation Date"
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
                  />
                  <ValidatedField
                    type="text"
                    label='Durée'
                    name="duration"
                    value={element.duration || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <ValidatedField
                    label='Fréquence'
                    type="text"
                    name="frequency"
                    value={element.frequency || ""}
                    onChange={(e) => handleChange(index, e)}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/prescription" replace color="info">
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
