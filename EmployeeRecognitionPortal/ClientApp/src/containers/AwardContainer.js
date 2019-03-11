
import { Container } from 'unstated';
import Api from '../lib/api';

class AwardContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        updateSuccess: false,
        awardsEOY: [],
        awardsEOM: []
    };

    initializeForm = () => {
      this.setState({
        updateSuccess: false
      })
    }


    getEOY = () => {
      Api.get(`/EmpOfYear`, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json
        }
        return json.then(err => {throw(err)})
      }).then(awards => {
        this.setState({awardsEOY: awards, success: true})
      }).catch(err => {
        this.setState({error: err.Message, success: false})
      });   
    }

    createEOY = (award) => {
      const { employeeName, employeeEmail, dateAwarded } = award;
      this.setState({
        loading: true
      });

      Api.post(`/EmpOfYear`, {
        employeeName,
        employeeEmail,
        dateAwarded,
        awardCreatorId: localStorage.id
      }, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)});
      }).then(award => {
        this.state.awardsEOY.push(award)
          this.setState({
              loading: false,
          updateSuccess: true
        });
      }).catch(err => {
        this.setState({
          loading: false,
          updateSuccess: false,
          error: err.Message
        });
      })
    }

    deleteEOY = (id) => {
        Api.delete(`/EmpOfYear/${id}`, {}, true).then(resp => {
       if(resp.ok) {
        let awardsEOY = this.state.awardsEOY.filter(award => {
          return award.id !== id
        })
           this.setState({
               loading:true,
           updateSuccess: true,
           awardsEOY
         })
       }
     });
     
    
    }

    getEOM = () => {
      Api.get(`/EmpOfMonth`, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)});
      }).then(awards => {
        this.setState({awardsEOM: awards, success: true})
      }).catch(err => {
        this.setState({error: err.Message, success: false})
      });   
    }

    createEOM = (award) => {
      const { employeeName, employeeEmail, dateAwarded } = award;
      this.setState({
        loading: true
      });

      Api.post(`/EmpOfMonth`, {
        employeeName,
        employeeEmail,
        dateAwarded,
        awardCreatorId: localStorage.id
      }, true).then(resp => {
        let json = resp.json();
        if(resp.ok) {
          return json;
        }
        return json.then(err => {throw(err)})
      }).then(award => {
        this.state.awardsEOM.push(award)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      }).catch(err => {
        this.setState({
          loading: false,
          updateSuccess: false,
          error: err.Message
        });
      })
    }

    deleteEOM = (id) => {
        Api.delete(`/EmpOfMonth/${id}`, {}, true).then(resp => {
       if(resp.ok) {
        let awardsEOM = this.state.awardsEOM.filter(award => {
          return award.id !== id
        });
        this.setState({
           updateSuccess: true,
           awardsEOM
        });
       }
     });
           
    }

  }

 export default AwardContainer; 