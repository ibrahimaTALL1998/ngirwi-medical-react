import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import ConsultationService from "../../Services/ConsultationService";
import DossierService from "../../Services/DossierService";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";

export default function ConsultationDetails() {
    //infoPatients
    const [matricule, setMatricule] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [cni, setCni] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [maritalStatus, SetMaritalStatus] = useState('')
    const [address, setAddress] = useState('')
    const history = useNavigate();
    const { idPatient, idForm } = useParams();

    //infoDossier
    const [idDossier, setIdDossier] = useState('')
    const [motifConsultation, setMotifConsultation] = useState('')
    const [histoireMaladie, setHistoireMaladie] = useState('')
    const [terrain, setTerrain] = useState('')
    const [antecedantsPersonnels, setAntecedantsPersonnels] = useState('')
    const [antecedantsChirurgicaux, setAntecedantsChirurgicaux] = useState('')
    const [antecedantsFamiliaux, setAntecedantsFamiliaux] = useState('')
    const [gynecoObstretrique, setGynecoObstretrique] = useState('')
    const [syndromique, setSyndromique] = useState('')
    const [dad, setDad] = useState('')
    const [mom, setMom] = useState('')
    const [siblings, setSiblings] = useState('')
    const [descendants, setDescendants] = useState('')
    //infoConsultations
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [patient, setPatient] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weight, setWeight] = useState('')
    const [tension, setTension] = useState('')
    const [glycemie, setGlycemie] = useState('')
    const [comment, setComment] = useState('')
    const [hypothesis, setHypothesis] = useState('')
    const [exams, setExams] = useState('')
    const [treatment, setTreatment] = useState('')

    useEffect(() => {

        PatientService.getPatientById(idPatient).then((response) => {
            setName(response.data.name)
            setSurname(response.data.surname)
            setBirthday(response.data.birthday)
            setGender(response.data.gender)
            setCni(response.data.cni)
            setPhone(response.data.phone)
            setJob(response.data.job)
            SetMaritalStatus(response.data.maritalStatus)
            setAddress(response.data.address)
            setMatricule(response.data.name + "_" + response.data.surname + "_" + response.data.birthday)
        }).catch(error => {
            console.log(error)
        })

        DossierService.getDossierById(idPatient).then((response) => {
            setIdDossier(response.data.idDossier)
            setMotifConsultation(response.data.motifConsultation)
            setHistoireMaladie(response.data.histoireMaladie)
            setTerrain(response.data.terrain)
            setAntecedantsPersonnels(response.data.antecedantsPersonnels)
            setAntecedantsChirurgicaux(response.data.antecedantsChirurgicaux)
            setAntecedantsFamiliaux(response.data.antecedantsFamiliaux)
            setGynecoObstretrique(response.data.gynecoObstretrique)
            setSyndromique(response.data.syndromique)
            setDad(response.data.dad)
            setMom(response.data.mom)
            setSiblings(response.data.siblings)
            setDescendants(response.data.descendants)
        }).catch(error => {
            console.log(error)
        })

        ConsultationService.getConsultationById(idForm).then((response => {
            setTime(response.data.time)
            setDate(response.data.date)
            setPatient(response.data.patient)
            setTemperature(response.data.temperature)
            setWeight(response.data.weight)
            setTension(response.data.tension)
            setGlycemie(response.data.glycemie)
            setComment(response.data.comment)
            setHypothesis(response.data.hypothesis)
            setExams(response.data.exams)
            setTreatment(response.data.treatment)
            console.log(JSON.stringify(response.data))
        })).catch(error => {
            console.log(error)
        })


    }, [])

    const title = () => {
        return <h2 className="text-center">Détails du la consultation du patient {name + ' ' + surname} du {date} à {time}</h2>
    }

    const dossier = () => {
        return (
            <Row>
                <Col>
                    <div class="card">
                        <Card className="text-center" hover style={{ display: "flex", rightPadding: "100px", padding: "1rem", borderRadius: "12px" }}>
                            <Card.Header style={{ color: "white", backgroundColor: "cadetblue", borderRadius: "12px", padding: "1rem" }}> <b>Civilité</b> </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Nom: {name} <br></br>
                                    Prénom: {surname} <br></br>
                                    Date de naissance: {birthday} <br></br>
                                    Genre: {gender} <br></br>
                                    CNI: {cni} <br></br>
                                    Téléphone: {phone} <br></br>
                                    Profession: {job} <br></br>
                                    Situation Matrimoniale: {maritalStatus} <br></br>
                                    Adresse: {address}<br></br>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col>

                    <div class="card">
                        <Card className="text-center" hover style={{ display: "flex", padding: "1rem", borderRadius: "12px", paddingBottom: "40px" }}>
                            <Card.Header style={{ color: "white", backgroundColor: "cadetblue", borderRadius: "12px", padding: "1rem" }}> <b>Dossier Médical</b> </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Motif: {motifConsultation} <br></br>
                                    Histoire de la maladie: {histoireMaladie} <br></br>
                                    Terrain: {terrain} <br></br>
                                    Antécédents personnels: {antecedantsPersonnels} <br></br>
                                    Antécédents chirurgicaux: {antecedantsChirurgicaux} <br></br>
                                    Antécédents Familiaux: {antecedantsFamiliaux} <br></br>
                                    Antécédents Gynéco-Obstétrique: {gynecoObstretrique} <br></br>
                                    Examens Syndromique: {syndromique}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

        )
    }

    const details = () => {
        return (
            <Form className="mb-3">
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Heure</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTime(e.target.value)} name="time" value={time} disabled /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Date</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setDate(e.target.value)} name="date" value={date} disabled /><br></br>

                        </Col>
                    </Row>
                    <Row>
                        <Form.Label><h5>Constantes</h5></Form.Label>
                    </Row>
                    <Row>
                        <Col><Form.Label>Température</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTemperature(e.target.value)} placeholder="Température" name="temperature" value={temperature} required disabled /><br></br>
                        </Col>
                        <Col> <Form.Label>Poids</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setWeight(e.target.value)} placeholder="Poids" name="weight" value={weight} required disabled /><br></br>
                        </Col>
                        <Col><Form.Label>Tension</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTension(e.target.value)} placeholder="Tension" name="tension" value={tension} required disabled /><br></br>
                        </Col>
                        <Col> <Form.Label>Glycémie</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setGlycemie(e.target.value)} placeholder="Glycémie" name="glycemie" value={glycemie} required disabled /><br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Form.Label>Hypothèse diagnostique</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setHypothesis(e.target.value)} placeholder="Hypothèses diagnostique" name="hypothesis" value={hypothesis} required disabled /><br></br>
                        </Col>
                        <Col><Form.Label>Examens Paracliniques</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setExams(e.target.value)} placeholder="examens" name="exams" value={exams} required disabled /><br></br>
                        </Col>
                        <Col><Form.Label>Traitement</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setTreatment(e.target.value)} placeholder="Traitement" name="treatment" value={treatment} required disabled /><br></br>
                        </Col>
                    </Row>
                    <Form.Label>Medecin ayant fait cette consultation</Form.Label>
                    <Form.Control className="name-input" type="text" name="doc" value={"test test"} required disabled /><br></br>
                    {/* <Button className="submit-button" type="submit" value="Envoyer" style={{ marginLeft: "595px" }}>Enregistrer</Button> */}
                    <Link to={`/consultation-patient-details-ordonance/${idPatient}/${idForm}`} className="btn btn-info" style={{ marginLeft: "10px" }} size="lg" block> Ordonance </Link>
                    <Link to={`/consultations-patient/${idPatient}`} className="btn btn-danger" style={{ marginLeft: "10px" }} size="lg" block> Retour </Link>

                </Form.Group>
            </Form >
        )
    }

    return (
        <Container fluid>
            <header>
                <AppNavBar />
            </header>
            {dossier()}<br></br>
            {title()}
            {details()}
        </Container>
    )

}