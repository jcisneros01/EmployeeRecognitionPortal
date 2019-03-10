
import { Container } from 'unstated';
import Api from '../lib/api';

class ReportContainer extends Container {
    state = {
        loading: false,
        error: null,
        success: false,
        awards: {
            labels: ['Employee of the Month', 'Employee of the Year'],
            counts: [10,10]
        }
    };

    getAwardReports = (type) => {
        Api.get(`/awards/reports?type=${type}`, true).then(resp => {
            const json = resp.json()
            if (resp.ok) {
                return json
            }
            return json.then(err => { throw err });
          
        
        }).then(json => {
           
           if(type === 'countbytype') {
               const labels = json.awards && json.awards.map(award => {
                
                  return award.awardName
              })
              const counts = json.awards && json.awards.map(award => {
                return award.awardCount
            })
            this.setState({awards: {
                labels,
               counts
            }, success: true})
          }
        });        
    }

  }

 export default ReportContainer; 