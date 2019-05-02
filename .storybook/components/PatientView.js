import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Address from './Address';

class PatientView extends PureComponent {
    render() {
      const patientIdentifier = _.find(_.get(this.props, 'patient.identifier'), identifier => identifier.use === 'official').value;
      return (
        <div className='patient'>
          <div className='patient-top'>
            <div className='photo-body'> {
                _.has(this.props, 'patient.photo') ? 
                  <img className='photo' src={_.get(this.props, 'patient.photo')}/> :
                  <i className='fas fa-user fa-6x photo-body'/>
              }          
            </div>
            <h1>Patient</h1>
            <div className='patient-id-panel'>
              <HumanName humanName={_.get(this.props, 'patient.name')} 
                nameInfo={_.get(this.props, 'info.nameInfo')}/>
              <div className='field'>
                Date of Birth: {moment(_.get(this.props, 'patient.birthDate')).format('MM/DD/YYYY')}
              </div>
              <div className='field capitalize'>
                Gender: {_.get(this.props, 'patient.gender')}
              </div>
              <div className='field'>
                Identifier: {patientIdentifier}
                <i className='fas fa-info-circle fa icon-info' title={_.get(this.props, 'info.identifierInfo')}/>
              </div>
            </div>
          </div>
          <div className='tab-title'>Overview</div>
          <div className='patient-details-table'>
            <div className='patient-details-row'>
              <div className='patient-detail'>Address</div>
              <div className='patient-detail'>
                <Address address={_.get(this.props, 'patient.address')} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  PatientView.propTypes = {
    patient: PropTypes.object,
};