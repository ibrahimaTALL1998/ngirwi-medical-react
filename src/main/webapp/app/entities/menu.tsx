import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/patient">
        Patient
      </MenuItem>
      <MenuItem icon="asterisk" to="/dossier-medical">
        Dossier Medical
      </MenuItem>
      <MenuItem icon="asterisk" to="/consultation">
        Consultation
      </MenuItem>
      <MenuItem icon="asterisk" to="/prescription">
        Prescription
      </MenuItem>
      <MenuItem icon="asterisk" to="/medecine">
        Medecine
      </MenuItem>
      <MenuItem icon="asterisk" to="/bill">
        Bill
      </MenuItem>
      <MenuItem icon="asterisk" to="/bill-element">
        Bill Element
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
