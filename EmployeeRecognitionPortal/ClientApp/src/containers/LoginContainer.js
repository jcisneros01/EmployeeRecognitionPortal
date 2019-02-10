
import { Container } from 'unstated';
import Api from '../lib/api';

class LoginContainer extends Container {
    state = {
      loading: false,
      error: null,
      success: false,
      token: '',
      isAdmin: false
    };
    doLogin(token) {
         if(localStorage.isAdmin) {
           this.setState({isAdmin: localStorage.isAdmin})
         }
        this.setState({ token, success: true });
    }
    requestLogin = (data) => {
      this.setState({ loading: true});
      Api.post(
        `/auth/token`,
        {
          email: data.email,
          password: data.password 
        }
      ).then(resp => {
        localStorage.userJWT = resp.token; 
        let isAdmin = false;
        if(data.email === 'admin@admin.com') {
          localStorage.isAdmin = true
          isAdmin = true
        }
        this.setState({loading: false, success: true, token: resp.token, isAdmin})
      });
    }
  
    logout = () => {
      localStorage.clear();
      this.setState({ token: null, success: false });
    }
  }

 export default LoginContainer; 