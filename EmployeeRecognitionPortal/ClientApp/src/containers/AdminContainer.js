
import { Container } from 'unstated';
import Api from '../lib/api';

class AdminContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        updateSuccess: false,
        admins: []
    };

    getAdmins = () => {
      Api.get(`/admins`, true).then(admins => {
        this.setState({admins: admins, success: true})
      });        
    }

    initializeForm = () => {
      this.setState({
        updateSuccess: false
      })
    }

    updateAdmin = (admin) => {
      this.setState({
        loading: true
      });
      Api.put(`/admins/${admin.id}`, {
        email: admin.email,
        password: admin.password
      }, true).then(resp => {
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
        
      });
    }

    createAdmin = (admin) => {
      const { email, password } = admin;
      this.setState({
        loading: true
      });
      Api.post(`/admins`, {
        email,
        password,
      }, true).then(admin => {
        this.state.admins.push(admin)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      });
    }

    deleteAdmin = (id) => {
     Api.delete(`/admins/${id}`, true);
     let admins = this.state.admins.filter(admin => {
      return admin.id !== id
    })
     this.setState({
       updateSuccess: true,
       admins
     })
    }

  }

 export default AdminContainer; 