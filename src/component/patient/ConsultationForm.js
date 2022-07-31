import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";
import ConsultationService from "../../Services/ConsultationService";
import DossierService from "../../Services/DossierService";
import PatientService from "../../Services/PatientService";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export default function ConsultationForm() {
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

    const examsList = [
        { label: "Radio", value: 'Radio' },
        { label: "TDM", value: 'TDM' },
        { label: "IRM", value: 'IRM' },
        { label: "Echographie", value: 'Echographie' },
        { label: "ECG", value: 'ECG' },
        { label: "NFS", value: 'NFS' },
        { label: "CRP", value: 'CRP' },
        { label: "Urémie", value: 'Urémie' },
        { label: "Créatininémie", value: 'Créatininémie' },
        { label: "Hémoglobine Glycosylée", value: 'Hémoglobine Glycosylée' },
        { label: "Fructosamine", value: 'Fructosamine' },
        { label: "Hyperglycémie provoquée par voie orale", value: 'Hyperglycémie provoquée par voie orale' },
        { label: "Créatine", value: 'Créatine' }
    ]

    const timer = new Date();
    const currentTime = timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();

    const saveOrUpdateConsultation = (e) => {
        e.preventDefault(); //no reload

        let examString = ''

        exams.map((exam => {
            examString += exam.value + ', '
        }))

        const consultation = { patient: idPatient, time: currentTime, date: dateValue, temperature, weight, tension, glycemie, comment, hypothesis, exams:examString, treatment }

        console.log(JSON.stringify(consultation));

        if (idForm) {
            ConsultationService.updateConsultation(consultation).then((response) => {
                console.log(response.data)
                history(`/details-patient/${idPatient}`)
            })
        } else {

            ConsultationService.createConsultation(consultation).then((response) => {

                console.log(response.data)

                history(`/details-patient/${idPatient}`)

            }).catch(error => {
                console.log(error)
            })

        }
    }

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
            //setIdDossier(idPatient)
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
            setTime(currentTime)
            setDate(dateValue)
            setPatient(idPatient)
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

    const padLeadingZeros = (num) => {
        var s = num + "";
        while (s.length < 2) s = "0" + s;
        return s;
    }


    const defaultDate = (e) => {
        const today = new Date();
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const defaultValue = padLeadingZeros(month) + '/' + padLeadingZeros(day) + '/' + year
        return defaultValue;
    }

    const dateValue = defaultDate();

    const animatedComponents = makeAnimated();

    console.log(exams)

    const formulaire = () => {
        return (
            <Form className="mb-3" onSubmit={(e) => saveOrUpdateConsultation(e)}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Heure</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTime(e.target.value)} name="time" value={currentTime} disabled /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Date</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setDate(e.target.value)} name="date" value={dateValue} disabled /><br></br>

                        </Col>
                    </Row>
                    <Row>
                        <Form.Label><h5>Constantes</h5></Form.Label>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Température</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTemperature(e.target.value)} placeholder="Température" name="temperature" value={temperature} required /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Poids</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setWeight(e.target.value)} placeholder="Poids" name="weight" value={weight} required /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Tension</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setTension(e.target.value)} placeholder="Tension" name="tension" value={tension} required /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Glycémie</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setGlycemie(e.target.value)} placeholder="Glycémie" name="glycemie" value={glycemie} required /><br></br>

                        </Col>
                    </Row>
                    <Row>
                        <Form.Label><h5>Complément Dossier</h5></Form.Label>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Hypothèses diagnostiques</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setHypothesis(e.target.value)} placeholder="Hypothèses diagnostique" name="hypothesis" value={hypothesis} required /><br></br>

                        </Col>
                        <Col>
                            <Form.Label>Examens Paracliniques</Form.Label>
                            <Select options={examsList} components={animatedComponents} isMulti style={{ paddingBottom: "30px" }}  onChange={(e) => setExams(e)}/><br></br>
                        </Col>
                        <Col>
                            <Form.Label>Traitement</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setTreatment(e.target.value)} placeholder="Traitement" name="treatment" value={treatment} required /><br></br>

                        </Col>
                    </Row>
                    <Row xs={5}>
                    <Button className="submit-button" type="submit" value="Envoyer" style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "300px", borderRadius: "12px" }}>Enregistrer</Button>

                    </Row>
                    <Row xs={5}>

                    <Link to={`/details-patient/${idPatient}`} className="btn btn-danger" style={{ marginLeft: "400px", paddingLeft: "230px", paddingRight: "270px", borderRadius: "12px", marginTop: "10px" }} size="lg" block> Retour </Link>

                    </Row>


                </Form.Group>
            </Form>
        )
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

    return (
        <Container fluid>
            <header>
                <AppNavBar />
            </header>
            {dossier()}<br></br>
            <h3 align="center">Nouvelle Consultation</h3>
            {formulaire()}
        </Container>
    )

}