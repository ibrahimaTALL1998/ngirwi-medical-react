import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        {/* <span className="hipster rounded" /> */}
        <img src="content/images/Ngirwi_Transparent.png" alt="LogoNgirwi" />
      </Col>
      <Col md="9">
        <h2>Bienvenue sur NGIRWI MEDICAL !</h2>

        {account?.login ? (
          <>
            <div>
              <Alert color="success">Vous êtes connecté en tant que &quot;{account.login}&quot;.</Alert>
            </div>
            <Row>
              <Col md="4" style={{ padding: '3rem' }}>
                <Link to={'/patient'}>
                  <FontAwesomeIcon style={{ width: '50px', height: '50px', marginTop: '8px' }} icon="users" /><br></br>
                  <span>Patients</span>
                </Link>
              </Col>
              <Col md="4" style={{ padding: '3rem' }}>
                <Link to={'/consultation'}>
                  <FontAwesomeIcon style={{ width: '50px', height: '50px', marginTop: '8px' }} icon="book" /><br></br>
                  <span>Consultation</span>
                </Link>
              </Col>
              <Col md="4" style={{ padding: '3rem' }}>
                <Link to={'/bill'}>
                  <FontAwesomeIcon style={{ width: '50px', height: '50px', marginTop: '8px' }} icon="pencil" /><br></br>
                  <span>Facture</span>
                </Link>
              </Col>
              
            </Row>
          </>
        ) : (
          <>
            <div>
              <p className="lead">La nouvelle jeunesse</p>
              <Alert color="warning">
                Vous avez déjà un compte?
                <span>&nbsp;</span>
                <Link to="/login" className="alert-link">
                  Connectez vous!
                </Link>
                {/* , vous pouvez utiliser les comptes par défaut : <br /> - Administrateur (nom d&apos;utilisateur=&quot;admin&quot; et mot de
    passe =&quot;admin&quot;) <br /> - Utilisateur (nom d&apos;utilisateur=&quot;user&quot; et mot de passe =&quot;user&quot;). */}
              </Alert>

              <Alert color="warning">
                Vous n&apos;avez pas encore de compte ?&nbsp;
                <Link to="/account/register" className="alert-link">
                  Créer un compte
                </Link>
              </Alert>
            </div>
            <p>Si vous avez des questions à propos de NGIRWI SARL :</p>
            <ul>
              <li>
                <a href="https://www.ngirwisarl.com/" target="_blank" rel="noopener noreferrer">
                  Visitez le site web de l'entreprise
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/NgirwiSARL/" target="_blank" rel="noopener noreferrer">
                  NGIRWI SARL sur Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ngirwi?lang=fr" target="_blank" rel="noopener noreferrer">
                  NGIRWI SARL sur Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/ngirwi_s.a.r.l/?hl=fr" target="_blank" rel="noopener noreferrer">
                  NGIRWI SARL sur Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/ngirwi-s-a-r-l" target="_blank" rel="noopener noreferrer">
                  NGIRWI SARL sur Linkedin
                </a>
              </li>
            </ul>
          </>
        )}
        {/* <p>
          Si vous aimez JHipster, donnez nous une étoile sur{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p> */}
      </Col>
    </Row>
  );
};

export default Home;
