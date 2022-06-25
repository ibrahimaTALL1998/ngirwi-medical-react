import axios from 'axios';

const Consultations_API_BASE_URL = 'http://localhost:8080/api/consultations';

class ConsultationService{

    getConsultations(){
        return axios.get(Consultations_API_BASE_URL);
    }

    createConsultation(consultation){
        return axios.post(Consultations_API_BASE_URL, consultation)
    }

    getConsultationById(consultationId){
        return axios.get(Consultations_API_BASE_URL + '/id/' + consultationId);
    }

    getConsultationByPAtient(patient){
        return axios.get(Consultations_API_BASE_URL + '/' + patient);
    }

    updateConsultation(consultationId, consultation){
        return axios.put(Consultations_API_BASE_URL + '/' +consultationId, consultation);
    }
}

export default new ConsultationService();