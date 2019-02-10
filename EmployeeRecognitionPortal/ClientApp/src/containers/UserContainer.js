
import { Container } from 'unstated';
import Api from '../lib/api';

class UserContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        updateSuccess: false,
        users: []
    };

    getUsers = () => {
      Api.get(`/users`).then(users => {
        this.setState({users: users, success: true})
      });        
    }

    initializeForm = () => {
      this.setState({
        updateSuccess: false
      })
    }

    updateUser = (user) => {
      this.setState({
        loading: true
      });
      Api.put(`/users/${user.id}`, {
        email: user.email,
        password: user.password,
        name: user.name,
        signature: user.signature
      }).then(resp => {
        let users = this.state.users.map(user => {  
          if(user.id === resp.id) { 
              user = resp;
          }
          return user;
        })
        this.setState({
          loading: false,
          updateSuccess: true,
          users
        });
        
      });
    }

    createUser = (user) => {
      const { email, password, name, signature } = user;
      this.setState({
        loading: true
      });
      Api.post(`/users`, {
        email,
        password,
        name,
        signature
      }).then(user => {
        this.state.users.push(user)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      });
    }

    deleteUser = (id) => {
     Api.delete(`/users/${id}`);
     let users = this.state.users.filter(user => {
      return user.id !== id
    })
     this.setState({
       updateSuccess: true,
       users
     })
    }

  }

 export default UserContainer; 