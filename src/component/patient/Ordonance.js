import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";

//service
import PatientService from "../../Services/PatientService";
import ConsultationService from "../../Services/ConsultationService";
import DossierService from "../../Services/DossierService";

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
import Ngirwi_Logo from "../appNavBar/Ngirwi_Transparent.png";
import Serpent from "./serpent.png";

export default function Ordonance() {
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

  //infoPatients
  const [matricule, setMatricule] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [cni, setCni] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [maritalStatus, SetMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const history = useNavigate();
  const { idPatient, idForm } = useParams();

  //infoDossier
  const [idDossier, setIdDossier] = useState("");
  const [motifConsultation, setMotifConsultation] = useState("");
  const [histoireMaladie, setHistoireMaladie] = useState("");
  const [terrain, setTerrain] = useState("");
  const [antecedantsPersonnels, setAntecedantsPersonnels] = useState("");
  const [antecedantsChirurgicaux, setAntecedantsChirurgicaux] = useState("");
  const [antecedantsFamiliaux, setAntecedantsFamiliaux] = useState("");
  const [gynecoObstretrique, setGynecoObstretrique] = useState("");
  const [syndromique, setSyndromique] = useState("");
  const [dad, setDad] = useState("");
  const [mom, setMom] = useState("");
  const [siblings, setSiblings] = useState("");
  const [descendants, setDescendants] = useState("");
  //infoConsultations
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [patient, setPatient] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [tension, setTension] = useState("");
  const [glycemie, setGlycemie] = useState("");
  const [comment, setComment] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [exams, setExams] = useState("");
  const [treatment, setTreatment] = useState("");

  //info ordonance
  const [medecine, setMedecine] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [formValues, setFormValues] = useState([
    { medecine: "", duration: "", frequency: "" },
  ]);

  useEffect(() => {
    PatientService.getPatientById(idPatient)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setBirthday(response.data.birthday);
        setGender(response.data.gender);
        setCni(response.data.cni);
        setPhone(response.data.phone);
        setJob(response.data.job);
        SetMaritalStatus(response.data.maritalStatus);
        setAddress(response.data.address);
        setMatricule(
          response.data.name +
            "_" +
            response.data.surname +
            "_" +
            response.data.birthday
        );
      })
      .catch((error) => {
        console.log(error);
      });

    DossierService.getDossierById(idPatient)
      .then((response) => {
        setIdDossier(response.data.idDossier);
        setMotifConsultation(response.data.motifConsultation);
        setHistoireMaladie(response.data.histoireMaladie);
        setTerrain(response.data.terrain);
        setAntecedantsPersonnels(response.data.antecedantsPersonnels);
        setAntecedantsChirurgicaux(response.data.antecedantsChirurgicaux);
        setAntecedantsFamiliaux(response.data.antecedantsFamiliaux);
        setGynecoObstretrique(response.data.gynecoObstretrique);
        setSyndromique(response.data.syndromique);
        setDad(response.data.dad);
        setMom(response.data.mom);
        setSiblings(response.data.siblings);
        setDescendants(response.data.descendants);
      })
      .catch((error) => {
        console.log(error);
      });

    ConsultationService.getConsultationById(idForm)
      .then((response) => {
        setTime(response.data.time);
        setDate(response.data.date);
        setPatient(response.data.patient);
        setTemperature(response.data.temperature);
        setWeight(response.data.weight);
        setTension(response.data.tension);
        setGlycemie(response.data.glycemie);
        setComment(response.data.comment);
        setHypothesis(response.data.hypothesis);
        setExams(response.data.exams);
        setTreatment(response.data.treatment);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  // let handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(JSON.stringify(formValues));

  //   const doc = (
  //     <Document>
  //       <Page size="A4" style={styles.page} wrap>
  //         <View style={styles.section}>
  //           <Image style={styles.image} src={Ngirwi_Logo} />
  //           <Text style={styles.text}>
  //             Date: {date}
  //             Patient: {patient}
  //             <h5>Ordonance Médicale</h5>
  //             {formValues.map((element) => {
  //               <div>
  //                 <p>Médicament</p>
  //                 <p>Nom : {element.medecine}</p>
  //                 <p>Durée : {element.duration}</p>
  //                 <p>Fréquence : {element.frequency}</p>
  //               </div>;
  //             })}
  //           </Text>
  //         </View>
  //       </Page>
  //     </Document>
  //   );
  // };

  const doc = (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <Image style={styles.imageHeader} src={Ngirwi_Logo} />
          <Image style={styles.image} src={Serpent} />
          <Text style={styles.title}> Ordonance Médicale</Text>
          <Text style={styles.text}>
            Service: 
          </Text>
          <Text style={styles.text}>
            Date: {date}
          </Text>
          <Text style={styles.text}>
            Patient: {name} {surname}
          </Text>
          <Text style={styles.text}>
            Médecin: TEST test
          </Text>
          {formValues.map( element => (
            <Text style={styles.text}>
                <b>Médicament</b> : {element.medecine} | <b>Durée</b> : {element.duration} | <b>Fréquence</b> : {element.frequency} {'\n\n'}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  const ordonance = () => {
    return (
      <Form>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <Form.Label>
              <b>Médicament</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="medecine"
              value={element.medecine || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <Form.Label>Duree</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={element.duration || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <Form.Label>Fréquence</Form.Label>
            <Form.Control
              type="text"
              name="frequency"
              value={element.frequency || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <br></br>
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
        <div className="button-section">
          <Button
            className="btn btn-success"
            type="button"
            onClick={() => addFormFields()}
            value="Envoyer"
            style={{
              marginLeft: "400px",
              paddingLeft: "200px",
              paddingRight: "300px",
              borderRadius: "12px",
            }}
          >
            Ajouter
          </Button>
          <PDFDownloadLink
          className="btn btn-primary"
            document={doc}
            fileName={`ordonnance_${name}_${surname}_${date}`}
            style={{
                marginLeft: "400px",
                paddingLeft: "200px",
                paddingRight: "240px",
                borderRadius: "12px",
              }}
          >
            {({ loading }) =>
              loading ? (
                <Button>Préparer fichier...</Button>
              ) : (
                <Button>Télécharger</Button>
              )
            }
          </PDFDownloadLink>
          {/* <Button className="submit-button" type="submit" value="Envoyer" style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "270px", borderRadius: "12px" }}>Enregistrer</Button> */}
          <Link
            to={`/consultation-patient-details/${idPatient}/${idForm}`}
            className="btn btn-danger"
            style={{
              marginLeft: "400px",
              paddingLeft: "200px",
              paddingRight: "300px",
              borderRadius: "12px",
            }}
            size="lg"
            block
          >
            {" "}
            Retour{" "}
          </Link>
        </div>
      </Form>
      // <Form>
      //     <Form.Group>
      //         <Row>
      //             <Col>
      //                 <Form.Label>Médicament</Form.Label>
      //                 <Form.Control className="name-input" type="text" onChange={(e) => setMedecine(e.target.value)} name="medecine" value={medecine}></Form.Control>
      //             </Col>
      //             <Col>
      //                 <Form.Label>Durée</Form.Label>
      //                 <Form.Control className="name-input" type="text" onChange={(e) => setDuration(e.target.value)} name="duration" value={duration}></Form.Control>
      //             </Col>
      //             <Col>
      //                 <Form.Label>Fréquence</Form.Label>
      //                 <Form.Control className="name-input" type="text" onChange={(e) => setFrequency(e.target.value)} name="frequency" value={frequency}></Form.Control>
      //             </Col>
      //         </Row>
      //     </Form.Group>
      // </Form>
    );
  };

  return (
    <Container fluid>
      <header>
        <AppNavBar />
      </header>
      <h3 align="center">
        Ordonance de {name} {surname} du {date}
      </h3>
      {ordonance()}
    </Container>
  );
}
