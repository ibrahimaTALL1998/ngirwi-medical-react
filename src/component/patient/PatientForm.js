import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";
import { Label } from "reactstrap";

export default function PatientForm() {

    const [matricule, setMatricule] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('FEMININ')
    const [cni, setCni] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [maritalStatus, SetMaritalStatus] = useState('CELIBATAIRE')
    const [address, setAddress] = useState('')

    // const [add, SetAdd] = useState(false)
    let add = false
    const [update, setUpdate] = useState(false)
    const history = useNavigate();
    const { idPatient } = useParams();

    const saveOrUpdatePatient = (e) => {
        e.preventDefault(); //no reload

        const patient = { name, surname, birthday, gender, cni, phone, job, maritalStatus, address }

        // if(gender.length === 0){
        //     setGender("FEMININ");
        // }
        // if(maritalStatus.length === 0){
        //     SetMaritalStatus("CELIBATAIRE");
        // }
        // if (matricule.length === 0) {
        //     setMatricule(name + '_' + surname + '_' + birthday)
        // }

        // matricule =name + '_' + surname + '_' + birthday 
        console.log(patient)

        if (idPatient) {
            PatientService.updatePatient(idPatient, patient).then((response) => {
                setUpdate(!update)
                console.log(update)
                history(`/patients/${update}`)
            }).catch(error => {
                console.log(error)
            })

        } else {
            PatientService.createPatient(patient).then((response) => {

                console.log(response.data)
                add = true
                // SetAdd(current => !current)
                // console.log(add)
                history(`/patients/${add}`)
                // history('/patients/added=true');

            }).catch(error => {
                console.log(error)
            })
        }

    }
    // const numberOfDaysToAdd = 3;
    // const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    // const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

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
    }, [])

    const title = () => {
        if (idPatient) {
            return <h2 className="text-center">Mis à jour du patient {name + ' ' + surname}</h2>
        } else {
            return <h2 className="text-center">Enregistrer Patient</h2>
        }
    }

    return (

        <div>
            <header>
                <AppNavBar />
            </header>
            <Container className="form-container">
                <h3>
                    {title()}
                </h3>
                <Form className="mb-3" onSubmit={(e) => saveOrUpdatePatient(e)}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Label>Nom</Label>
                                <Form.Control className="name-input" type="text" onChange={(e) => setName(e.target.value)} placeholder="Nom" name="name" value={name} required /><br></br>

                            </Col>
                            <Col>
                                <Label>Prénom</Label>
                                <Form.Control className="name-input" type="text" onChange={(e) => setSurname(e.target.value)} placeholder="Prénom" name="surname" value={surname} required /><br></br>

                            </Col>
                            <Col>
                                <Label>Date de naissance</Label>
                                <Form.Control className="date-input" type="date" onChange={(e) => setBirthday(e.target.value)} placeholder="Date de naissance" name="birthday" value={birthday} required /><br></br>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>Genre</Label>
                                <Form.Select onChange={(e) => setGender(e.target.value)} placeholder="Genre" name="gender" value={gender} required>
                                    <option disabled>
                                        Sexe
                                    </option>
                                    <option value="FEMININ">
                                        Féminin
                                    </option>
                                    <option value="MASCULIN">
                                        Masculin
                                    </option>
                                </Form.Select><br></br>
                            </Col>
                            <Col>
                                <Label>Numéro de carte d'identité</Label>
                                <Form.Control className="name-input" type="text" onChange={(e) => setCni(e.target.value)} placeholder="Carte d'identite nationale" name="cni" value={cni} /><br></br>

                            </Col>

                            <Col>
                                <Label>Numéro de téléphone</Label>
                                <Form.Control className="phone-input" type="tel" onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de léléphone" name="phone" value={phone} /><br></br>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Label>Status professionnel</Label>
                                <Form.Control className="name-input" type="text" onChange={(e) => setJob(e.target.value)} placeholder="Profession" name="job" value={job} required /><br></br>

                            </Col>
                            <Col>
                                <Label>Status familiale</Label>
                                <Form.Select onChange={(e) => SetMaritalStatus(e.target.value)} placeholder="Status Matrimonial" name="maritalStatus" value={maritalStatus} required>
                                    <option disabled>
                                        Status Matrimonial
                                    </option>
                                    <option value="CELIBATAIRE">
                                        Célibataire
                                    </option>
                                    <option value="DIVORCE">
                                        Divorcé(e)
                                    </option>
                                    <option value="MARIE">
                                        Marié(e)
                                    </option>
                                    <option value="VEUF">
                                        Veuf(ve)
                                    </option>
                                </Form.Select><br></br>
                            </Col>
                            <Col>
                                <Label>Adresse</Label>
                                <Form.Control className="name-input" type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" name="address" value={address} /><br></br>

                            </Col>
                        </Row>
                        <Row xs={5}>
                            <Button className="text-center" type="submit" value="Envoyer" style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "300px", borderRadius: "12px" }}>Envoyer</Button>

                        </Row>

                        <Row xs={5}>
                            <Link to="/patients" className="btn btn-danger" style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "300px", borderRadius: "12px", marginTop: "10px" }}> Annuler </Link>

                        </Row>


                    </Form.Group>
                </Form>
            </Container>
        </div>
        // <div>
        //     <br /><br />
        //     <div className="container">
        //         <div className="row">
        //             <div className="card col-md-6 offset-md-3 offset-md-3">
        //                 {
        //                     title()
        //                 }
        //                 <div className="card-body">
        //                     <form>
        //                         <div className="form-group mb-2">
        //                             <label className="form-label"> First Name :</label>
        //                             <input
        //                                 type="text"
        //                                 placeholder="Enter first name"
        //                                 name="name"
        //                                 className="form-control"
        //                                 value={name}
        //                                 onChange={(e) => setName(e.target.value)}
        //                             >
        //                             </input>
        //                         </div>

        //                         <div className="form-group mb-2">
        //                             <label className="form-label"> Last Name :</label>
        //                             <input
        //                                 type="text"
        //                                 placeholder="Enter last name"
        //                                 name="surname"
        //                                 className="form-control"
        //                                 value={surname}
        //                                 onChange={(e) => setSurname(e.target.value)}
        //                             >
        //                             </input>
        //                         </div>

        //                         <div className="form-group mb-2">
        //                             <label className="form-label"> Email Id :</label>
        //                             <input
        //                                 type="email"
        //                                 placeholder="Enter email Id"
        //                                 name="email"
        //                                 className="form-control"
        //                                 value={email}
        //                                 onChange={(e) => setEmail(e.target.value)}
        //                             >
        //                             </input>
        //                         </div>

        //                         <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Submit </button>
        //                         <Link to="/employees" className="btn btn-danger"> Cancel </Link>
        //                     </form>

        //                 </div>
        //             </div>
        //         </div>

        //     </div>

        // </div>
    )
}