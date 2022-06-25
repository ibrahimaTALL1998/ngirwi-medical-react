import axios from 'axios';

const DOSSIER_API_BASE_URL = 'http://localhost:8080/api/dossiers';

class DossierService{

    getDossiers(){
        return axios.get(DOSSIER_API_BASE_URL);
    }

    createDossier(dossier){
        return axios.post(DOSSIER_API_BASE_URL, dossier)
    }

    getDossierById(dossierId){
        return axios.get(DOSSIER_API_BASE_URL + '/' + dossierId);
    }

    updateDossier(dossierId, dossier){
        return axios.put(DOSSIER_API_BASE_URL + '/' +dossierId, dossier);
    }
}

export default new DossierService();