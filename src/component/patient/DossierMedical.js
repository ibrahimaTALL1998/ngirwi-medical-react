import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";
import DossierService from "../../Services/DossierService";
import { Collapse } from "reactstrap";

export default function DossierMedical() {

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
    const { idPatient } = useParams();

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


    const [open, setOpen] = useState(false);


    const saveDossier = (e) => {
        e.preventDefault(); //no reload

        const id = idPatient

        const dossier = { id, motifConsultation, histoireMaladie, terrain, antecedantsPersonnels, antecedantsChirurgicaux, antecedantsFamiliaux, gynecoObstretrique, syndromique, dad, mom, siblings, descendants }

        console.log(JSON.stringify(dossier));

        DossierService.createDossier(dossier).then((response) => {

            console.log(response.data)

            history(`/details-patient/${idPatient}`)

        }).catch(error => {
            console.log(error)
        })


        // if (idDossier) {
        // DossierService.updateDossier(id, dossier).then((response) => {
        //     history(`/details-patient/${id}`)
        // }).catch(error => {
        //     console.log(error)
        //     })

        // } else {
        //     DossierService.createDossier(dossier).then((response) => {

        //         console.log(response.data)

        //         history(`/details-patient/${id}`)

        //     }).catch(error => {
        //         console.log(error)
        //     })
        // }

    }

    const updateDossier = (e) => {
        e.preventDefault(); //no reload

        const dossier = { motifConsultation, histoireMaladie, antecedantsPersonnels, antecedantsChirurgicaux, antecedantsFamiliaux, gynecoObstretrique, dad, mom, siblings, descendants }

        console.log(JSON.stringify(dossier));

        DossierService.updateDossier(idPatient, dossier).then((response) => {

            console.log(response.data)

            history(`/details-patient/${idPatient}`)

        }).catch(error => {
            console.log(error)
        })

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
            setIdDossier(idPatient)
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
    }, [])

    console.log(open)

    const title = () => {
        if (idPatient) {
            return <div className="text-center"> <Button style={{ backgroundColor: "cadetblue", leftPadding: "10px", borderRadius: "12px" }}><h2 className="text-center">Dossier médical du patient {name + ' ' + surname}</h2> </Button></div>
        } else {
            return <h2 className="text-center">Enregistrer Dossier médical</h2>
        }
    }

    const button = () => {
        if (idDossier) {
            return <Button className="submit-button" type="submit" value="Envoyer" onClick={(e) => saveDossier(e)}>Enregistrer</Button>
            //onSubmit={(e) => saveDossier(e)}
        }
        else {
            return <Button className="submit-button" type="submit" value="Envoyer" onClick={(e) => updateDossier(e)}>Modifier</Button>
        }
    }
    const firstTime = () => {
        return (
            <Form className="mb-3" >
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Motif de la consultation</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setMotifConsultation(e.target.value)} placeholder="Motif de la consultation" name="motifConsultation" value={motifConsultation} required /><br></br>
                        </Col>
                        <Col>
                            <Form.Label>Histoire de la maladie</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setHistoireMaladie(e.target.value)} placeholder="Histoire de la maladie" name="histoireMaladie" value={histoireMaladie} required /><br></br>
                        </Col>
                        <Col>
                            <Form.Label>Terrain</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setTerrain(e.target.value)} placeholder="Terrain" name="terrain" value={terrain} required ></Form.Control><br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label><h5>Antécédents</h5></Form.Label>
                    </Row>
                    <Row>
                        <Col><Form.Label>Antécédents personnels</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setAntecedantsPersonnels(e.target.value)} placeholder="Antécédents personnels" name="antecedantsPersonnels" value={antecedantsPersonnels} required /><br></br>
                        </Col>
                        <Col><Form.Label>Antécédents chirurgicaux</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setAntecedantsChirurgicaux(e.target.value)} placeholder="Antécédents chirurgicaux" name="antecedantsChirurgicaux" value={antecedantsChirurgicaux} required /><br></br>
                        </Col>
                        <Col> <Form.Label>Antécédents Familiaux</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setAntecedantsFamiliaux(e.target.value)} placeholder="Antécédents familiaux" name="antecedantsFamiliaux" value={antecedantsFamiliaux} required /><br></br>
                        </Col>
                        <Col> <Form.Label>Antécédents Gynéco-Obstétricaux <b>**</b></Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setGynecoObstretrique(e.target.value)} placeholder="Gynéco-Obstretrique" name="gynecoObstretrique" value={gynecoObstretrique} required /><br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Résumé Syndromique</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setSyndromique(e.target.value)} placeholder="Résumé Syndromique" name="syndromique" value={syndromique} required ></Form.Control>
                        </Col>
                    </Row><br/>
                    {/* <Row>
                        <Col><Form.Label>Père</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setDad(e.target.value)} placeholder="Père" name="dad" value={dad} style={{padding:"2rem"}} required /><br></br>
                        </Col>
                        <Col><Form.Label>Mère</Form.Label>
                            <Form.Control className="name-input" type="text" onChange={(e) => setMom(e.target.value)} placeholder="Mère" name="mom" value={mom} style={{padding:"2rem"}} required /><br></br>
                        </Col>
                    </Row>
                    <Row>

                        <Col>

                            <Form.Label>Fères/Soeurs</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setSiblings(e.target.value)} placeholder="Frères/Soeurs" name="name" value={siblings} required /><br></br>
                        </Col>
                        <Col>
                            <Form.Label>Descendants</Form.Label>
                            <Form.Control className="name-input" type="text" as="textarea" onChange={(e) => setDescendants(e.target.value)} placeholder="Descandants" name="descendants" value={descendants} required /><br></br>
                        </Col>
                    </Row> */}
                    <Row xs={5}>
                        <Button className="submit-button" type="submit" value="Envoyer" onClick={(e) => saveDossier(e)} style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "300px", borderRadius: "12px" }}>Enregistrer</Button>
                    </Row>
                    <Row xs={5}>
                        <Link className="btn btn-danger" to={`/details-patient/${idPatient}`} style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "300px", borderRadius: "12px", marginTop: "10px" }}>Retour</Link>

                    </Row>
                </Form.Group>
            </Form>

            
        )
    }

    return (
        <Container fluid>
            <header>
                <AppNavBar />
            </header>
            {title()}
            {firstTime()}
            <p><b>**</b> Pour femmes</p>
        </Container>
    )
}