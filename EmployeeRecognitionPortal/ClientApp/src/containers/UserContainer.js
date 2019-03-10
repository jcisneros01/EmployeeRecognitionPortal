
import { Container } from 'unstated';
import Api from '../lib/api';

class UserContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        updateSuccess: false,
        users: [],
        user: ""
    };

    initializeForm = () => {
        this.setState({
          updateSuccess: false,
          user: ""
        })
      }

    getUsers = () => {
        Api.get(`/users`, true).then(resp => {
            let json = resp.json();
            if(resp.ok) {
                return json;
            }
            return json.then(err => { throw err });
        
        }).then(users => {
            this.setState({ users: users, success: true })
        }).catch(err => {
            this.setState({ success: false, error: err.Message })
        });        
    }

    getUser = (id) => {
        Api.get(`/users/${id}`, true).then(resp => {
            let json = resp.json();
            if(resp.ok) {
                return json;
            }
            return json.then(err => { throw err });
        
        }).then(user => {
            this.setState({ user})
        }).catch(err => {
            this.setState({error: err.Message })
        });        
    }

    updateUser = (id, user) => {
      this.setState({
        loading: true
      });
      Api.put(`/users/${id}`, {
        email: user.email,
        password: user.password,
        name: user.name,
        signature: user.signature
      }, true).then(resp => {
          let json = resp.json();
          if (resp.ok) {
              return json;
          }
        }).then(resp => {
              let users = this.state.users.map(user => {
                  if (user.id === resp.id) {
                      user = resp;
                  }
                  return user;
              })
              this.setState({
                  loading: false,
                  updateSuccess: true,
                  users
              });
          })
          .catch(err => {
              this.setState({ loading: false, updateSuccess: false, error: err.Message })
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
      }, true).then(resp => {
          let json = resp.json();
          if(resp.ok) {
              return json;
          }
          return json.then(err => {throw err});
        
        })
        .then(user => {
            this.state.users.push(user)
            this.setState({
                loading: false,
                updateSuccess: true
            })
        })
        .catch(err => {
              this.setState({ loading: false, updateSuccess: false, error: err.Message })
        });
    }

    deleteUser = (id) => {
        Api.delete(`/users/${id}`, true).then(resp => {
            if (resp.ok) {
                let users = this.state.users.filter(user => {
                    return user.id !== id
                })
                this.setState({
                    updateSuccess: true,
                    users
                })
            } 
        });
    }

  }

 export default UserContainer; 