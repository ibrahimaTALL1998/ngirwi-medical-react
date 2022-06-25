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
    const [email, setEmail] = useState('')
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
    const [antecedantsPersonnels, setAntecedantsPersonnels] = useState('')
    const [antecedantsChirurgicaux, setAntecedantsChirurgicaux] = useState('')
    const [antecedantsFamiliaux, setAntecedantsFamiliaux] = useState('')
    const [gynecoObstretrique, setGynecoObstretrique] = useState('')
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
        { label: "Hémoglobine Glycosylée", value: "" },
        { label: "Fructosamine", value: "Fructosamine" },
        { label: "Hyperglycémie provoquée par voie orale", value: "Hyperglycémie provoquée par voie orale" },
        { label: "Créatine", value: "Créatine" }
    ]

    const timer = new Date();
    const currentTime = timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();

    const saveOrUpdateConsultation = (e) => {
        e.preventDefault(); //no reload

        const consultation = { patient: idPatient, time: currentTime, date: dateValue, temperature, weight, tension, glycemie, comment, hypothesis, exams, treatment }

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
            setEmail(response.data.email)
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
            setAntecedantsPersonnels(response.data.antecedantsPersonnels)
            setAntecedantsChirurgicaux(response.data.antecedantsChirurgicaux)
            setAntecedantsFamiliaux(response.data.antecedantsFamiliaux)
            setGynecoObstretrique(response.data.gynecoObstretrique)
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
                    <Form.Label>Heure</Form.Label>
                    <Form.Control className="name-input" type="text" onChange={(e) => setTime(e.target.value)} name="time" value={currentTime} disabled /><br></br>
                    <Form.Label>Date</Form.Label>
                    <Form.Control className="name-input" type="text" onChange={(e) => setDate(e.target.value)} name="date" value={dateValue} disabled /><br></br>
                    <Form.Control className="name-input" type="text" onChange={(e) => setTemperature(e.target.value)} placeholder="Température" name="temperature" value={temperature} required /><br></br>
                    <Form.Control className="name-input" type="text" onChange={(e) => setWeight(e.target.value)} placeholder="Poids" name="weight" value={weight} required /><br></br>
                    <Form.Control className="name-input" type="text" onChange={(e) => setTension(e.target.value)} placeholder="Tension" name="tension" value={tension} required /><br></br>
                    <Form.Control className="name-input" type="text" onChange={(e) => setGlycemie(e.target.value)} placeholder="Glycémie" name="glycemie" value={glycemie} required /><br></br>
                    <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setHypothesis(e.target.value)} placeholder="Hypothèses diagnostique" name="hypothesis" value={hypothesis} required /><br></br>
                    <Form.Label>Examens Complémentaires</Form.Label>
                    <Select options={examsList} components={animatedComponents} isMulti /><br></br>
                    <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setTreatment(e.target.value)} placeholder="Traitement" name="treatment" value={treatment} required /><br></br>
                    <Button className="submit-button" type="submit" value="Envoyer" style={{ marginLeft: "595px" }}>Enregistrer</Button>
                    <Link to={`/details-patient/${idPatient}`} className="btn btn-danger" style={{ marginLeft: "10px" }} size="lg" block> Retour </Link>

                    {/* <Form.Label>Motif de la consultation</Form.Label>
                    <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setMotifConsultation(e.target.value)} placeholder="Motif de la consultation" name="motifConsultation" value={motifConsultation} required /><br></br>
                    <Form.Label>Motif de la consultation</Form.Label>
                    <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setMotifConsultation(e.target.value)} placeholder="Motif de la consultation" name="motifConsultation" value={motifConsultation} required /><br></br>
                    <Form.Label>Motif de la consultation</Form.Label>
                    <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setMotifConsultation(e.target.value)} placeholder="Motif de la consultation" name="motifConsultation" value={motifConsultation} required /><br></br> */}

                </Form.Group>
            </Form>
        )
    }

    const dossier = () => {
        return (
            <div class="card">
                <Card className="text-center" hover>
                    <Card.Header> <b>Dossier Médical</b> </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Motif: {motifConsultation} <br></br>
                            Histoire de la maladie: {histoireMaladie} <br></br>
                            Antécédants personnels: {antecedantsPersonnels} <br></br>
                            Antécédants chirurgicaux: {antecedantsChirurgicaux} <br></br>
                            Antécédants Familiaux: {antecedantsFamiliaux} <br></br>
                            Gynéco-Obstrétique: {gynecoObstretrique} <br></br>
                            {/* Profession: {job} <br></br>
                            Situation Matrimoniale: {maritalStatus} <br></br>
                            Adresse: {address}<br></br>
                            Matricule: {matricule} */}
                        </Card.Text>

                        {/* <Link className="btn btn-primary" to={`/dossier-patient/${id}`}>Dossier Médical</Link>
                        <Link className="btn btn-primary" to={`/consultation-patient/${id}`} style={{ marginLeft: "10px" }}>Consultation</Link> */}
                    </Card.Body>
                </Card>
            </div>
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