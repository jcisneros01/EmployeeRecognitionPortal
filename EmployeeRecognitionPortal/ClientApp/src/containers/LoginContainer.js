
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
        this.setState({ token, success: true, id: localStorage.id });
    }
    requestLogin = (data) => {
        console.log(data);
        this.setState({ loading: true });
        Api.post(
            `/auth/token`,
            {
                email: data.email,
                password: data.password
            }
        ).then(resp => {
            let json = resp.json();
            if(resp.ok) {
                return json;
            }
            return json.then(err => {throw err})
        }).then(user => {
            localStorage.userJWT = user.jwt;
            localStorage.isAdmin = user.isAdmin
            localStorage.id = user.id
            this.setState({ 
                loading: false, 
                success: true, 
                token: user.token, 
                id: user.id, 
                isAdmin: user.isAdmin 
            })
        })
        .catch(err => {
            this.setState({ loading: false, success: false, error: err.Message })
        });
    }

    logout = () => {
        localStorage.clear();
        this.setState({ token: null, success: false });
    }
}

export default LoginContainer; 