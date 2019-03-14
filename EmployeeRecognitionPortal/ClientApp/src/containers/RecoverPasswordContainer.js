
import { Container } from 'unstated';
import Api from '../lib/api';

class RecoverPasswordContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
    };

    doRecoverPassword = (email) => {
        this.setState({ loading: true });
        Api.post('/auth/recoverpassword', {
            email
        }).then(resp => {

            if (resp.ok) {
                this.setState({ loading: false, success: true, error: null });
            }
            else {
                this.setState({ loading: false, success: false, error: 'Invalid Email Address.' });
            }
        }).catch(err => {
            this.setState({ loading: false, success: false, error: err.Message });
        });
    }

}

export default RecoverPasswordContainer; 