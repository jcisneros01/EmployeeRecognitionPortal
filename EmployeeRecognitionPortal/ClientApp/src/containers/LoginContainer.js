
import { Container } from 'unstated';
import Api from '../lib/api';

class LoginContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        token: '',
        id:'',
        isAdmin: false
    };
    doLogin(token) {
        if (localStorage.isAdmin) {
            this.setState({ isAdmin: localStorage.isAdmin })
        }
        this.setState({ token, success: true });
    }
    requestLogin = (data) => {
        this.setState({ loading: true });
        Api.post(
            `/auth/token`,
            {
                email: data.email,
                password: data.password
            }
        ).then(resp => {
            localStorage.userJWT = resp.jwt;
            localStorage.isAdmin = resp.isAdmin
            localStorage.id = resp.id
            this.setState({ loading: false, success: true, token: resp.token, id: resp.id, isAdmin: resp.isAdmin })
        }).catch(err => {
            this.setState({ loading: false, success: false, error: err.Message })
        });
    }

    logout = () => {
        localStorage.clear();
        this.setState({ token: null, success: false });
    }
}

export default LoginContainer; 