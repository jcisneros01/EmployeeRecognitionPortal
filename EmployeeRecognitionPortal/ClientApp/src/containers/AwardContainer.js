
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
      Api.get(`/EmpOfYear`).then(awards => {
        this.setState({awardsEOY: awards, success: true})
      });   
    }

    createEOY = (award) => {
      const { employeeName, employeeEmail, dateAwarded, awardCreatorId } = award;
      this.setState({
        loading: true
      });

      Api.post(`/EmpOfYear`, {
        employeeName,
        employeeEmail,
        dateAwarded,
        awardCreatorId
      }).then(award => {
        this.state.awardsEOY.push(award)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      })
    }

    deleteEOY = (id) => {
     Api.delete(`/EmpOfYear/${id}`);
      let awardsEOY = this.state.awardsEOY.filter(award => {
        return award.id !== id
      })
       this.setState({
         updateSuccess: true,
         awardsEOY
       })
    
    }

    getEOM = () => {
      Api.get(`/EmpOfMonth`).then(awards => {
        this.setState({awardsEOM: awards, success: true})
      });   
    }

    createEOM = (award) => {
      const { employeeName, employeeEmail, dateAwarded, awardCreatorId } = award;
      this.setState({
        loading: true
      });

      Api.post(`/EmpOfMonth`, {
        employeeName,
        employeeEmail,
        dateAwarded,
        awardCreatorId
      }).then(award => {
        this.state.awardsEOM.push(award)
        this.setState({
          loading: false,
          updateSuccess: true
        });
      })
    }

    deleteEOM = (id) => {
     Api.delete(`/EmpOfMonth/${id}`);
      let awardsEOM = this.state.awardsEOM.filter(award => {
        return award.id !== id
      });
      this.setState({
         updateSuccess: true,
         awardsEOM
      });     
    }

  }

 export default AwardContainer; 