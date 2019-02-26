
import { Container } from 'unstated';
import Api from '../lib/api';

class RecoverPasswordContainer extends Container {
    state = {
      loading: false,
      error: null,
      success: false,
    };

    doRecoverPassword = (email) => {
      this.setState({loading: true});
      Api.post('/users/recover-password', {
        email
      }).then(resp => {
        if(resp.status === 'success') {
          this.setState({loading: false, success: true, error: null});
        } else {
          this.setState({loading: false, success: false, error: 'Invalid Email Address.'});
        }
      }); 
    }

  }

 export default RecoverPasswordContainer; 