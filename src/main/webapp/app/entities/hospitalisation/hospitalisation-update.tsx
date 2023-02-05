import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Card } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity as getPatient } from 'app/entities/patient/patient.reducer';
import { HospitalisationStatus } from 'app/shared/model/enumerations/hospitalisation-status.model';
import { getEntity, updateEntity, createEntity, reset, createEntityBis } from './hospitalisation.reducer';
import Header from 'app/shared/layout/header/header';
import { IoIosArrowBack, IoIosRemoveCircle } from 'react-icons/io';
import { MdOutlineArrowCircleUp, MdOutlineArrowCircleDown } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';
import axios from 'axios';
import ConsultationRoutes from '../consultation';

export const HospitalisationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const { idPatient } = useParams<'idPatient'>();
  const { idEdit } = useParams<'idEdit'>();
  const ref = useRef(null);
  const refCard = useRef(null);

  const patient = useAppSelector(state => state.patient.entity);
  const hospitalisationEntity = useAppSelector(state => state.hospitalisation?.entity);
  const loading = useAppSelector(state => state.hospitalisation?.loading);
  const updating = useAppSelector(state => state.hospitalisation?.updating);
  const updateSuccess = useAppSelector(state => state.hospitalisation?.updateSuccess);
  const hospitalisationStatusValues = Object.keys(HospitalisationStatus);
  const account = useAppSelector(state => state.authentication.account);

  //will modify
  const [sheets, setSheets] = useState([]);

  const [formValues, setFormValues] = useState([
    {
      sheetDateTime: displayDefaultDateTime(),
      temperature: '',
      ta: '',
      pulseRate: '',
      respiratoryFrequency: '',
      recolorationTime: '',
      glasgow: '',
      gravityClass: '',
      horaryDiuresis: '',
      spo2: '',
      treatment: '',
      healthEvolution: '',
    },
  ]);

  const handleClose = () => {
    navigate('/hospitalisation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPatient(idPatient));
    axios.get('api/surveillance-sheets').then(res => setSheets(res.data));
  }, []);

  // const getSheetPatient = () => {
  let newSheets = [];
  for (const s of sheets) {
    if (s.hospitalisation?.id === parseInt(id)) [newSheets.push(s)];
  }
  // }

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.entryDate = convertDateTimeToServer(values.entryDate);
    values.releaseDate = convertDateTimeToServer(values.releaseDate);

    const entity = {
      ...hospitalisationEntity,
      ...values,
      // patient: patients?.find(it => it?.id?.toString() === values?.patient?.toString()),
      patient: patient,
    };

    console.log(entity);
    if (isNew) {
      dispatch(createEntityBis(entity));
      navigate(`/hospitalisation/${idPatient}`);
    } else {
      dispatch(updateEntity(entity));
      navigate(`/hospitalisation/${idPatient}`);
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          entryDate: displayDefaultDateTime(),
          sheetDateTime: displayDefaultDateTime(),
          status: 'STARTED',
          doctorName: account.firstName + ' ' + account.lastName,
        }
      : {
          //status: 'STARTED',
          ...hospitalisationEntity,
          entryDate: convertDateTimeFromServer(hospitalisationEntity?.entryDate),
          sheetDateTime: displayDefaultDateTime(),
          //releaseDate: convertDateTimeFromServer(hospitalisationEntity.releaseDate),
          doctorName: account.firstName + ' ' + account.lastName,
          patient: hospitalisationEntity?.patient?.id,
        };

  const [height, setHeight] = useState('180vh');
  const [ind, setInd] = useState(0);
  const [can, setCan] = useState(false);

  const [hideStyle, setHideStyle] = useState({
    transition: '',
    height: null,
    minHeight: '130vh',
    width: '80vw',
    boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
    borderRadius: '15px',
    marginBottom: '30px',
    fontFamily: 'Jost',
    overflow: null,
    cursor: 'pointer',
  });

  console.log(newSheets);

  let show = a => {
    if (ind !== a) {
      setInd(a);
    }
    if (ind === a) {
      can === false ? setCan(true) : setCan(false);
      if (can === true) {
        setHideStyle({
          transition: 'height 1.5s ease',
          height: null,
          minHeight: '130vh',
          width: '80vw',
          boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
          borderRadius: '15px',
          marginBottom: '30px',
          fontFamily: 'Jost',
          overflow: null,
          cursor: 'pointer',
        });
      } else {
        setHideStyle({
          transition: 'height 1.5s ease',
          height: '10.5vh',
          minHeight: null,
          width: '80vw',
          boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
          borderRadius: '15px',
          marginBottom: '30px',
          fontFamily: 'Jost',
          overflow: 'hidden',
          cursor: 'pointer',
        });
      }
    }
    console.log(can + 'Jour ' + a + 1);
  };
  let hide = a => {
    if (ind !== a) {
      setInd(a);
    }
    if (a === ind) {
      can === false ? setCan(true) : setCan(false);
      if (can === false) {
        setHideStyle({
          transition: 'height 1.5s ease',
          height: '10.5vh',
          minHeight: null,
          width: '80vw',
          boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
          borderRadius: '15px',
          marginBottom: '30px',
          fontFamily: 'Jost',
          overflow: 'hidden',
          cursor: 'pointer',
        });
      }
    }
    console.log(can + 'Jour ' + a + 1);
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        sheetDateTime: displayDefaultDateTime(),
        temperature: '',
        ta: '',
        pulseRate: '',
        respiratoryFrequency: '',
        recolorationTime: '',
        glasgow: '',
        gravityClass: '',
        horaryDiuresis: '',
        spo2: '',
        treatment: '',
        healthEvolution: '',
      },
    ]);
  };

  const removeFormFields = i => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const newForm = (arr, i) => {
    return (
      <ValidatedForm
        defaultValues={defaultValues()}
        onSubmit={saveEntity}
        style={{
          width: '94%',
          height: '80%',
          marginLeft: '3%',
          display: 'flex',
          marginTop: '1%',
          fontSize: '16px',
          fontWeight: '900',
          flexWrap: 'wrap',
          backgroundImage: 'url(content/images/NgirwiLogo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: '65% 90%',
          gap: '3vw',
          justifyContent: 'center',
        }}
      >
        <ValidatedField
          disabled
          hidden={isNew && i === 0 ? false : true}
          label="Date d'admission au service"
          id="hospitalisation-dateTime"
          name="entryDate"
          data-cy="entryDate"
          type="datetime-local"
          placeholder="YYYY-MM-DD HH:mm"
          style={{
            borderRadius: '25px',
            borderColor: '#CBDCF7',
            backgroundColor: '#A9B7CD',
            color: '#F6FAFF',
            width: '70vw',
          }}
        />

        <ValidatedField
          disabled
          label="Paramètres surveillés le"
          id="hospitalisation-sheetDateTime"
          name="sheetDateTime"
          data-cy="sheetDateTime"
          type="datetime-local"
          placeholder="YYYY-MM-DD HH:mm"
          style={{
            borderRadius: '25px',
            borderColor: '#CBDCF7',
            backgroundColor: '#A9B7CD',
            color: '#F6FAFF',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || i === 0 ? true : false}
          label="Statut de l'hospitalisation"
          id="hospitalisation-status"
          name="status"
          data-cy="status"
          type="select"
          // validate={{
          //   required: { value: true, message: 'Ce champ est obligatoire.' },
          // }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' || i === 0 ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' || i === 0 ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        >
          {i === 0 ? <option value="STARTED">Débute</option> : null}
          <option value="ONGOING">En cours</option>
          <option value="DONE">Terminée</option>
        </ValidatedField>

        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Température(en °C)"
          id="hospitalisation-temperature"
          name="temperature"
          data-cy="temperature"
          type="number"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
            validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
          }}
          // value={!isNew && newSheets[0]?.temperature}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Tension artérielle(max/mn)"
          id="hospitalisation-ta"
          name="ta"
          data-cy="ta"
          type="number"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
            validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Fréquence cardiaque(battements/mn)"
          id="hospitalisation-tension"
          name="pulseRate"
          data-cy="pulseRate"
          type="number"
          min={0}
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Fréquence respiratoire(cycles/mn)"
          id="hospitalisation-respiration"
          name="respiratoryFrequency"
          data-cy="respiratoryFrequency"
          type="number"
          min={0}
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Temps de Recoloration(secondes)"
          id="hospitalisation-recoloration"
          name="recolorationTime"
          data-cy="recolorationTime"
          min={0}
          type="number"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.34vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Glasgow(3 à 15)"
          id="hospitalisation-glasgow"
          name="glasgow"
          data-cy="glasgow"
          type="number"
          min={3}
          max={15}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Classe de gravité(I/II/III)"
          id="hospitalisation-gravity"
          name="gravityClass"
          data-cy="gravityClass"
          type="select"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        >
          <option value={'I'}>I</option>
          <option value={'II'}>II</option>
          <option value={'III'}>III</option>
        </ValidatedField>

        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Diurése horaire(ml/Kg/mn)"
          id="hospitalisation-diurese"
          name="horaryDiuresis"
          data-cy="horaryDiuresis"
          type="number"
          min={0}
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.34vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Saturation en oxygène"
          id="hospitalisation-spO2"
          name="spo2"
          data-cy="spo2"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Traitement administré"
          id="hospitalisation-treatment"
          name="treatment"
          data-cy="treatment"
          type="textarea"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' ? true : false}
          label="Evolution en fonction du traitement"
          id="hospitalisation-evolution"
          name="healthEvolution"
          data-cy="healthEvolution"
          type="select"
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.34vw',
          }}
        >
          <option value={'Stationnaire'}>Stationnaire</option>
          <option value={'Favorable'}>Favorable</option>
          <option value={'Détresse vitale'}>Détresse vitale</option>
          <option value={'Décès'}>Décès</option>
        </ValidatedField>

        {arr.length - 1 === i ? (
          <Button
            hidden={idEdit === 'voir' ? true : false}
            id="save-entity"
            data-cy="entityCreateSaveButton"
            type="submit"
            disabled={!isNew && i < 1}
            style={{
              borderRadius: '25px',
              color: 'white',
              backgroundColor: '#56B5C5',
              borderColor: '#56B5C5',
              flex: '1 1 100%',
            }}
          >
            Enregistrer
          </Button>
        ) : null}
        {arr.length - 1 === i ? (
          <Button
            onClick={() => {
              confirm('Êtes-vous sur de vouloir quitter?') === true ? window.history.back() : null;
            }}
            id="cancel-save"
            data-cy="entityCreateCancelButton"
            replace
            color="info"
            style={{
              borderRadius: '25px',
              color: 'white',
              backgroundColor: '#EC4747',
              borderColor: '#EC4747',
              textAlign: 'center',
              fontSize: idEdit === 'voir' ? '20px' : '',
              marginBottom: '2vh',
              flex: '1 1 100%',
            }}
          >
            <span className="d-none d-md-inline">{idEdit === 'voir' ? 'Retour' : 'Annuler'}</span>
          </Button>
        ) : null}

        {i ? (
          <span
            onClick={() => removeFormFields(i)}
            style={{
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderColor: 'transparent',
              color: '#EC4747',
              fontWeight: '900',
              width: '0.1vw',
              display: 'inline',
            }}
          >
            {React.createElement(IoIosRemoveCircle, { size: '25' })}
          </span>
        ) : null}
      </ValidatedForm>
    );
  };

  const showFormValues = (arr, i) => {
    return (
      <ValidatedForm
        defaultValues={defaultValues()}
        onSubmit={saveEntity}
        style={{
          width: '94%',
          height: '80%',
          marginLeft: '3%',
          display: 'flex',
          marginTop: '1%',
          fontSize: '16px',
          fontWeight: '900',
          flexWrap: 'wrap',
          backgroundImage: 'url(content/images/NgirwiLogo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: '65% 90%',
          gap: '3vw',
          justifyContent: 'center',
        }}
      >
        <ValidatedField
          disabled
          hidden={isNew && i === 0 ? false : true}
          label="Date d'admission au service"
          id="hospitalisation-dateTime"
          name="entryDate"
          data-cy="entryDate"
          type="datetime-local"
          placeholder="YYYY-MM-DD HH:mm"
          style={{
            borderRadius: '25px',
            borderColor: '#CBDCF7',
            backgroundColor: '#A9B7CD',
            color: '#F6FAFF',
            width: '70vw',
          }}
        />

        <ValidatedField
          disabled
          label="Paramètres surveillés le"
          id="hospitalisation-sheetDateTime"
          name="sheetDateTime"
          data-cy="sheetDateTime"
          type="text"
          placeholder="YYYY-MM-DD HH:mm"
          value={hospitalisationEntity?.sheetDateTime}
          style={{
            borderRadius: '25px',
            borderColor: '#CBDCF7',
            backgroundColor: '#A9B7CD',
            color: '#F6FAFF',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled
          label="Statut de l'hospitalisation"
          id="hospitalisation-status"
          name="status"
          data-cy="status"
          type="text"
          value={hospitalisationEntity?.status}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' || i === 0 ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' || i === 0 ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        ></ValidatedField>

        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Température(en °C)"
          id="hospitalisation-temperature"
          name="temperature"
          data-cy="temperature"
          type="text"
          onChange={a => handleChange(i, a)}
          value={!isNew && newSheets[0]?.temperature}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Tension artérielle(max/mn)"
          id="hospitalisation-ta"
          name="ta"
          data-cy="ta"
          type="text"
          value={newSheets[0]?.ta}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '33.5vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Fréquence cardiaque(battements/mn)"
          id="hospitalisation-tension"
          name="pulseRate"
          data-cy="pulseRate"
          type="text"
          value={newSheets[0]?.pulseRate}
          min={0}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Fréquence respiratoire(cycles/mn)"
          id="hospitalisation-respiration"
          name="respiratoryFrequency"
          data-cy="respiratoryFrequency"
          type={'text'}
          value={newSheets[0]?.respiratoryFrequency}
          min={0}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Temps de Recoloration(secondes)"
          id="hospitalisation-recoloration"
          name="recolorationTime"
          data-cy="recolorationTime"
          min={0}
          type={'text'}
          value={newSheets[0]?.recolorationTime}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.34vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Glasgow(3 à 15)"
          id="hospitalisation-glasgow"
          name="glasgow"
          data-cy="glasgow"
          type={'text'}
          value={newSheets[0]?.glasgow}
          min={3}
          max={15}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Classe de gravité(I/II/III)"
          id="hospitalisation-gravity"
          name="gravityClass"
          data-cy="gravityClass"
          type="text"
          value={newSheets[0]?.gravityClass}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        ></ValidatedField>

        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Diurése horaire(ml/Kg/mn)"
          id="hospitalisation-diurese"
          name="horaryDiuresis"
          data-cy="horaryDiuresis"
          type={'text'}
          value={newSheets[0]?.horaryDiuresis}
          min={0}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.34vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Saturation en oxygène"
          id="hospitalisation-spO2"
          name="spo2"
          data-cy="spo2"
          value={newSheets[0]?.spo2}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />
        <ValidatedField
          disabled={idEdit === 'voir' || !isNew ? true : false}
          label="Traitement administré"
          id="hospitalisation-treatment"
          name="treatment"
          data-cy="treatment"
          type="textarea"
          value={newSheets[0]?.treatment}
          onChange={a => handleChange(i, a)}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        />

        <ValidatedField
          disabled={idEdit === 'voir' ? true : false}
          label="Evolution en fonction du traitement"
          id="hospitalisation-evolution"
          name="healthEvolution"
          data-cy="healthEvolution"
          type="text"
          value={newSheets[0]?.healthEvolution}
          onChange={a => handleChange(i, a)}
          validate={{
            required: { value: true, message: 'Ce champ est obligatoire.' },
          }}
          style={{
            borderRadius: '25px',
            backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
            borderColor: '#CBDCF7',
            color: idEdit === 'voir' ? '#F6FAFF' : 'black',
            width: '21.33vw',
          }}
        ></ValidatedField>
        {arr.length - 1 === i ? (
          <Button
            hidden={idEdit === 'voir' ? true : false}
            id="save-entity"
            data-cy="entityCreateSaveButton"
            type="submit"
            disabled={!isNew && i < 1}
            style={{
              borderRadius: '25px',
              color: 'white',
              backgroundColor: '#56B5C5',
              borderColor: '#56B5C5',
              flex: '1 1 100%',
            }}
          >
            Enregistrer
          </Button>
        ) : null}
        {arr.length - 1 === i ? (
          <Button
            onClick={() => {
              confirm('Êtes-vous sur de vouloir quitter?') === true ? window.history.back() : null;
            }}
            id="cancel-save"
            data-cy="entityCreateCancelButton"
            replace
            color="info"
            style={{
              borderRadius: '25px',
              color: 'white',
              backgroundColor: '#EC4747',
              borderColor: '#EC4747',
              textAlign: 'center',
              fontSize: idEdit === 'voir' ? '20px' : '',
              marginBottom: '2vh',
              flex: '1 1 100%',
            }}
          >
            <span className="d-none d-md-inline">{idEdit === 'voir' ? 'Retour' : 'Annuler'}</span>
          </Button>
        ) : null}

        {i ? (
          <span
            onClick={() => removeFormFields(i)}
            style={{
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderColor: 'transparent',
              color: '#EC4747',
              fontWeight: '900',
              width: '0.1vw',
              display: 'inline',
            }}
          >
            {React.createElement(IoIosRemoveCircle, { size: '25' })}
          </span>
        ) : null}
      </ValidatedForm>
    );
  };

  return (
    <>
      <div
        style={{
          paddingLeft: '16vw',
          paddingTop: '1%',
          fontFamily: 'Mulish',
          fontWeight: '900',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header pageName="Gestion hospitalisation" />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '7.5vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: '10%',
              gap: '6vw',
            }}
          >
            <Card
              style={{
                height: '6.28vh',
                width: '35vw',
                borderRadius: '15px',
                backgroundColor: '#11485C',
                textAlign: 'center',
                color: 'white',
                marginBottom: '5vh',
                boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '2vw',
                paddingLeft: '1vw',
                marginTop: '10vh',
                marginLeft: '20vw',
              }}
            >
              <Button
                onClick={() => window.history.back()}
                style={{ color: '#53BFD1', backgroundColor: '#11485C', borderColor: '#11485C' }}
              >
                {React.createElement(IoIosArrowBack, { size: '20' })}
              </Button>
              <span>Enregistrement nouvelle hospitalisation</span>
            </Card>
          </div>
          <Button
            onClick={() => addFormFields()}
            style={{
              display: 'flex',
              textDecoration: 'none',
              textAlign: 'center',
              color: '#56B5C5',
              width: '12vw',
              height: '12vw',
              borderRadius: '50%',
              backgroundColor: '#CBDCF7',
              fontSize: '18px',
              paddingTop: '2%',
              fontWeight: '900',
              justifyContent: 'center',
              marginLeft: '65vw',
              position: 'absolute',
              top: '15vh',
            }}
          >
            <span style={{ display: 'block', width: '90%', wordBreak: 'break-word' }}>
              {React.createElement(RiUserAddLine, { size: '24' })}Ajouter fiche de surveillance
            </span>
          </Button>

          {
            // eslint-disable-next-line complexity
            formValues.map((e, i, arr) => (
              <Card
                style={
                  ind === i
                    ? hideStyle
                    : {
                        transition: 'height 1.5s ease',
                        height: '10.5vh',
                        minHeight: null,
                        width: '80vw',
                        boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                        borderRadius: '15px',
                        marginBottom: '30px',
                        fontFamily: 'Jost',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }
                }
                key={i}
              >
                <div
                  style={{
                    marginTop: '2%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2vw',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      transition: 'all 1.5s ease',
                      color: ind === i && can === false ? '#141414' : '#B1BBCC',
                      fontSize: '19px',
                      width: '70vw',
                    }}
                  >
                    {ind === i && can === false ? 'Initialisation des paramètres du patient' : 'Cliquez pour défiler'}
                  </span>
                  <span
                    style={{
                      transition: 'all 1.5s ease',
                      color: '#11485C',
                      textDecoration: 'underline',
                      fontWeight: '600',
                      fontSize: '24px',
                    }}
                  >
                    Jour {i + 1}
                  </span>
                  {ind === i && can === false ? (
                    <span onClick={() => hide(i)} style={{ transition: 'all 1.5s ease', color: '#11485C' }}>
                      {' '}
                      {React.createElement(MdOutlineArrowCircleUp, { size: '30' })}
                    </span>
                  ) : ind === i && can === true ? (
                    <span onClick={() => show(i)} style={{ transition: 'all 1.5s ease', color: '#11485C' }}>
                      {React.createElement(MdOutlineArrowCircleDown, { size: '30' })}
                    </span>
                  ) : (
                    <span onClick={() => show(i)} style={{ transition: 'all 1.5s ease', color: '#11485C' }}>
                      {React.createElement(MdOutlineArrowCircleDown, { size: '30' })}
                    </span>
                  )}
                </div>

                {isNew ? newForm(arr, i) : showFormValues(arr, i)}
              </Card>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default HospitalisationUpdate;
