import './home.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { RiUserAddLine } from 'react-icons/ri';

import { Table, Card } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

import SearchBar from 'app/shared/layout/searchbar/searchbar';
import { useAppSelector } from 'app/config/store';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { FaUserMd } from 'react-icons/fa';

import Calendar from 'react-calendar';
import { TextFormat, ValidatedField } from 'react-jhipster';
import { translateGender } from 'app/shared/util/translation-utils';
import { APP_DATE_FORMAT } from 'app/config/constants';
import Header from 'app/shared/layout/header/header';
import { BrandIcon } from 'app/shared/layout/header/header-components';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [date, setDate] = useState(new Date());
  const patientList = useAppSelector(state => state.patient.entities);
  const dossierMedicalList = useAppSelector(state => state.dossierMedical.entities);

  const [query, setQuery] = useState('');

  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <div
        style={{
          marginLeft: '16vw',
          paddingTop: '1%',
          fontFamily: 'Mulish',
          fontWeight: '900',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'url(content/images/NgirwiLogo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: '50% 50%',
          backgroundSize: '100% 100%',
        }}
      >
        <Header pageName="Accueil" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw', position: 'fixed', top: '9vh', right: '2.5vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3vh', marginTop: '3vh' }}>
            <Card
              style={{
                width: '33.38vw',
                minHeight: '20vh',
                borderColor: '#53BFD1',
                backgroundColor: '#53BFD1',
                borderRadius: '20px',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '3%',
                paddingLeft: '4%',
                boxShadow: '0px 0px 5px silver',
              }}
            >
              <div>Bienvenue Docteur {account.login}</div>
              <p style={{ fontSize: 'small', marginTop: '1.2%', opacity: '0.7', width: '25vw' }}>
                Ngirwi Medical l’application pour la numérisation des dossiers médicaux, développée par la société NGIRWI S.A.R.L.
              </p>
            </Card>
            <Card
              style={{
                width: '36.25vw',
                minHeight: '18vh',
                boxShadow: '0px 0px 5px silver',
                marginLeft: '3%',
                display: 'flex',
                borderRadius: '15px',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                href="patient?page=1&sort=id,asc"
                className="btn btn-lg"
                style={{
                  backgroundColor: '#11485C',
                  borderColor: '#11485C',
                  width: '85%',
                  marginTop: '1.5%',
                  fontSize: '18px',
                  boxShadow: '0px 4px 11px rgba(0,0,0,0.25)',
                  borderRadius: '15px',
                }}
              >
                GESTION DES PATIENTS
              </Button>
              <div>
                <Link
                  to="patient/new"
                  style={{
                    marginTop: '3.5%',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '5px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(RiUserAddLine, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Enregistrer nouveau patient
                  </span>
                </Link>
                <Link
                  to="patient?page=1&sort=id,asc"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '5px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(FaEye, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Voir listes des patients
                  </span>
                </Link>
              </div>
            </Card>
            <Card
              style={{
                width: '36.25vw',
                minHeight: '18vh',
                borderRadius: '15px',
                boxShadow: '0px 0px 5px silver',
                marginLeft: '3%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                href="consultation?page=1&sort=id,asc"
                className="btn btn-lg"
                style={{
                  backgroundColor: '#11485C',
                  borderColor: '#11485C',
                  width: '85%',
                  marginTop: '1.5%',
                  fontSize: '18px',
                  boxShadow: '0px 4px 11px rgba(0,0,0,0.25)',
                  borderRadius: '15px',
                }}
              >
                GESTION DES CONSULTATIONS
              </Button>
              <div>
                <Link
                  to="/consultation/new/"
                  style={{
                    marginTop: '3.5%',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '4px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(RiUserAddLine, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Enregistrer nouvelle consultation
                  </span>
                </Link>
                <Link
                  to="/consultation?page=1&sort=id,asc"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '5px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(FaEye, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Voir liste des consultations
                  </span>
                </Link>
              </div>
            </Card>
            <Card
              style={{
                width: '36.25vw',
                minHeight: '18vh',
                borderRadius: '15px',
                boxShadow: '0px 0px 5px silver',
                marginLeft: '3%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                className="btn btn-lg"
                href="bill?page=1&sort=id,asc"
                style={{
                  backgroundColor: '#11485C',
                  borderColor: '#11485C',
                  width: '85%',
                  marginTop: '1.5%',
                  fontSize: '18px',
                  boxShadow: '0px 4px 11px rgba(0,0,0,0.25)',
                  borderRadius: '15px',
                }}
              >
                GESTION DE LA FACTURATION
              </Button>
              <div>
                <Link
                  to="/bill/new"
                  style={{
                    marginTop: '3.5%',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '4px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(RiUserAddLine, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Enregistrer nouvelle facture
                  </span>
                </Link>
                <Link
                  to="/bill?page=1&sort=id,asc"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '5px',
                    gap: '5%',
                    padding: '5px',
                    fontFamily: 'Mulish',
                    textDecoration: 'none',
                    color: '#56B5C5',
                    width: '110%',
                  }}
                >
                  <div>{React.createElement(FaEye, { size: '22' })}</div>
                  <span
                    style={{
                      fontFamily: 'Mulish',
                      color: '#56B5C5',
                      fontSize: '13px',
                    }}
                  >
                    Voir liste des factures
                  </span>
                </Link>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.7vw', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1vw',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontSize: 'small',
                  }}
                >
                  Docteur {account.login}
                </span>
                <span
                  style={{
                    fontSize: 'smaller',
                    opacity: '0.3',
                  }}
                >
                  Médecin
                </span>
                <span></span>
              </div>

              <Button
                href="/account/password"
                style={{
                  borderColor: '#DDDDDD',
                  backgroundColor: '#DDDDDD',
                  color: '#233538',
                  borderRadius: '50%',
                  width: '5vw',
                  height: '10vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {React.createElement(FaUserMd, { size: '40' })}
              </Button>
            </div>

            <Calendar defaultValue={date} next2Label={null} prev2Label={null}></Calendar>

            <Card style={{ height: '30vh', width: '40vw', borderRadius: '15px', boxShadow: '0px 0px 5px silver', marginLeft: '3vw' }}>
              <div
                style={{
                  marginTop: '1%',
                  fontSize: '15px',
                  marginLeft: '3%',
                  marginBottom: '1%',
                  color: '#11485C',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '60%',
                }}
              >
                <span>Patients récents</span>
                <Link to="#" style={{ textDecoration: 'none', color: '#11485C' }}>
                  Tout voir
                </Link>
              </div>
              {patientList && patientList.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr style={{ paddingLeft: '5%', color: '#747678' }}>
                      <th
                        style={{
                          fontSize: '13px',
                          position: 'sticky',
                          top: '0',
                          backgroundColor: 'white',
                        }}
                      >
                        Noms
                      </th>
                      <th
                        style={{
                          fontSize: '13px',
                          position: 'sticky',
                          top: '0',
                          backgroundColor: 'white',
                        }}
                      >
                        Sexe
                      </th>
                      <th
                        style={{
                          fontSize: '13px',
                          position: 'sticky',
                          top: '0',
                          backgroundColor: 'white',
                        }}
                      >
                        Motif
                      </th>
                      <th
                        style={{
                          fontSize: '13px',
                          position: 'sticky',
                          top: '0',
                          backgroundColor: 'white',
                        }}
                      >
                        Date et Heure
                      </th>

                      <th
                        style={{
                          fontSize: '13px',
                          position: 'sticky',
                          top: '0',
                          backgroundColor: 'white',
                        }}
                      >
                        Matricule
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      fontSize: '12px',
                      borderBottom: '1px solid #222',
                    }}
                  >
                    {patientList.map((patient, i) => {
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>{patient.lastName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.lastName}</td>
                      </tr>;
                    })}
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <span>Aucun dossier médical</span>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
