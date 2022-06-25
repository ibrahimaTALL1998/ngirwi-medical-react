import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ngirwi_Logo from './Ngirwi_Transparent.png';
import './Login.css';
import { Container, Image } from "react-bootstrap";
import { Input, Label } from "reactstrap";

export default function Login() {

    const navigate = useNavigate();

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // liste d'utilisateurs statique
    const users = [
        {
            username: "ibrahima.tall@engtechnologie.com",
            password: "EngTechnolog13"
        },
        {
            username: "test",
            password: "test"
        }
    ];

    const error = "Utilisateur ou Mot de passe invalide"

    const handleSubmit = (event) => {
        //empecher la page de reloader
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // chercher le user dans la liste
        const userVerif = users.find((user) => user.username === uname.value);

        // comparer
        if (userVerif) {
            if (userVerif.password !== pass.value) {
                // password invalid
                setErrorMessages({ name: "pass", message: error });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username invalid
            setErrorMessages({ name: "uname", message: error });
        }
    };

    // message d'erreur
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code login
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    {renderErrorMessage("uname")}
                    {renderErrorMessage("pass")}
                    <Label><b>Nom d'utilisateur</b> </Label>
                    <Input type="text" name="uname" required />

                </div>
                <div className="input-container">
                    <Label><b>Mot de passe </b></Label>
                    <Input type="password" name="pass" required />
                    <Label><b>Attention :</b> Les mots de passe sont sensibles à la case.</Label>
                    <a href="####" style={{ color: "cadetblue" }}>Mot de passe oublié?</a>
                </div>
                <div className="button-container">
                    <Input type="submit" value="Se connecter" style={{ color: "white", backgroundColor: "cadetblue"}} />
                </div>
            </form>
        </div>
    );

    return (
        <Container fluid className="all">
            <h1></h1>
            <div className="app">
                <div className="logo">
                    <Image src={Ngirwi_Logo} width="50%" />
                </div>
                <div className="login-form">
                    <div className="title">NGIRWI MEDICAL</div>
                    {isSubmitted ? navigate('/home') : renderForm}
                </div>
            </div>
        </Container>
    );
}


