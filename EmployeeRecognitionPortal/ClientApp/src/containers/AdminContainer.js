
import { Container } from 'unstated';
import Api from '../lib/api';

class AdminContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        updateSuccess: false,
        admins: [],
        admin: ""
    };

    initializeForm = () => {
      this.setState({
        updateSuccess: false,
        admin: ""
      })
    }

    getAdmins = () => {
      Api.get(`/admins`, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)})
      }).then(admins => {
        this.setState({admins: admins, success: true})
      }).catch(err => {
        this.setState({success: false, error: err.Message})
      });        
    }

    getAdmin = (id) => {
      Api.get(`/admins/${id}`, true).then(resp => {
        let json = resp.json()
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)});
      }).then(admin => {
        
        this.setState({admin})
      }).catch(err => {
        this.setState({admin: "", error: err.Message})
      })
    }

    createAdmin = (admin) => {
      const { email, password } = admin;
      this.setState({
        loading: true
      });
      Api.post(`/admins`, {
        email,
        password,
      }, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)})
      }).then(admin => {
        this.state.admins.push(admin)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      }).catch(err => {
        this.setState({ loading: false, updateSuccess: false, error: err.Message })
      });
    }

    updateAdmin = (id, admin) => {
      this.setState({
        loading: true
      });
      Api.put(`/admins/${id}`, {
        email: admin.email,
        password: admin.password
      }, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)});      
      }).then(resp => {
        let admins = this.state.admins.map(admin => {  
          if(admin.id === resp.id) { 
              admin = resp;
          }
          return admin;
        })
        this.setState({
          loading: false,
          updateSuccess: true,
          admins
        });
      }).catch(err => {
        this.setState({
          loading: false,
          updateSuccess: false,
          error: err.Message
        });
      });
    }

    deleteAdmin = (id) => {
        Api.delete(`/admins/${id}`, {}, true).then(resp => {
       if(resp.ok) {
        let admins = this.state.admins.filter(admin => {
          return admin.id !== id
        })
         this.setState({
           updateSuccess: true,
           admins
         })
       }
     });
     
    }

  }

 export default AdminContainer; 