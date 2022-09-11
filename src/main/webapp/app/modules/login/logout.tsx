import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      // window.location.href = 'logoutUrl';
      toast("Déconnexion")
      navigate('/')
    }
  });

  return (
    <div className="p-5">
      <h4>Déconnecté avec succès!</h4>
    </div>
  );
};

export default Logout;
