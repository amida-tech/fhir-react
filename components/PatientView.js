import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { find, get, has } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import HumanName from './HumanName';
import Address from './Address';

const styles = {
  patient: {

  },
  patientTop: {
    'margin-bottom': '5%',
  },
};

class PatientView extends PureComponent {
  render() {
    const patientIdentifier = find(get(this.props, 'patient.identifier'), identifier => identifier.use === 'official').value;
    const { classes } = this.props;
    return (
      <div className="patient">
        <div className={classes.patientTop}>
          <div className="photo-body">
            {' '}
            {
              has(this.props, 'patient.photo')
                ? <img className="photo" src={get(this.props, 'patient.photo')} />
                : <i className="fas fa-user fa-6x photo-body" />
            }
          </div>
          <h1>Patient</h1>
          <div className="patient-id-panel">
            <HumanName
              humanName={get(this.props, 'patient.name')}
              nameInfo={get(this.props, 'info.nameInfo')}
            />
            <div className="field">
              Date of Birth:
              {' '}
              {moment(get(this.props, 'patient.birthDate')).format('MM/DD/YYYY')}
            </div>
            <div className="field capitalize">
              Gender:
              {' '}
              {get(this.props, 'patient.gender')}
            </div>
            <div className="field">
              Identifier:
              {' '}
              {patientIdentifier}
              <i className="fas fa-info-circle fa icon-info" title={get(this.props, 'info.identifierInfo')} />
            </div>
          </div>
        </div>
        <div className="tab-title">Overview</div>
        <div className="patient-details-table">
          <div className="patient-details-row">
            <div className="patient-detail">Address</div>
            <div className="patient-detail">
              <Address address={get(this.props, 'patient.address')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PatientView.propTypes = {
  classes: PropTypes.shapeOf({
    patientTop: PropTypes.string,
  }),
};

PatientView.defaultProps = {
  classes: {
    patientTop: styles.patientTop,
  },
};

export default withStyles(styles)(PatientView);
