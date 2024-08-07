import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from 'app/entities/hospital/hospital.reducer';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login))
      .then(response => {
        // Handle the response or dispatch another action here
        // const userData = response.payload;
        dispatch(getEntity(user.hospitalId));
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching user:', error);
      });
  }, []);

  const user = useAppSelector(state => state.userManagement.user);
  const hospital = useAppSelector(state => state.hospital.entity);

  console.log(hospital);

  return (
    <div style={{ marginLeft: '16vw' }}>
      <h2>
        Utilisateur [<strong>{user.login}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>Login</dt>
          <dd>
            <span>{user.login}</span>&nbsp;
            {user.activated ? <Badge color="success">Activé</Badge> : <Badge color="danger">Désactivé</Badge>}
          </dd>
          <dt>Prénom</dt>
          <dd>{user.firstName}</dd>
          <dt>Nom</dt>
          <dd>{user.lastName}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Créé par</dt>
          <dd>{user.createdBy}</dd>
          <dt>Créé le</dt>
          <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>Modifié par</dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>Modifié le</dt>
          <dd>
            {user.lastModifiedDate ? (
              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          <dt>Hopital</dt>
          <dd>{hospital?.name}</dd>
          <dt>Droits</dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                    <li key={`user-auth-${i}`}>
                      <Badge color="info">{authority}</Badge>
                    </li>
                  ))
                : null}
            </ul>
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
