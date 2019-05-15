/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  find, get, has, replace,
} from 'lodash';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import DataRow from './shared/DataRow';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoDropdown from './InfoDropdown';

const styles = {
  humanName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  humanNamePanel: {
    display: 'flex',
    alignItems: 'center',
  },
  humanNameLabel: {
    fontFamily: 'Helvetica',
    fontSize: '1.5em',
    fontStyle: 'normal',
    fontWeight: 400,
    color: 'rgb(36, 59, 83)',
    paddingLeft: '1rem',

  },
  humanNameMenuHeader: {
    fontFamily: 'Helvetica',
    fontSize: '1.3em',
    color: '#243B53',
    marginLeft: '5%',
    marginBottom: '3%',
  },
  humanNameTableLabel: {
    fontFamily: 'Source Sans Pro',
    fontSize: '1rem',
    color: '#486581',
    marginLeft: '15px',
    minWidth: '80px',
    textTransform: 'capitalize',
  },
  iconInfo: {
    color: '#D3D3D3', // Be nice if we could use some preprocessor to render variables real soon.
    alignSelf: 'end',
  },
};

class HumanName extends PureComponent {
  static nameConcatenator(nameRecord) {
    return (`${replace(get(nameRecord, 'prefix', []), /,/g, ' ')} ${
      replace(get(nameRecord, 'given', []), /,/g, ' ')} ${
      get(nameRecord, 'family', '')} ${
      replace(get(nameRecord, 'suffix', []), /,/g, ' ')}`).trim();
  }

  constructor(props) {
    super(props);
    const patientUse = find(get(this.props, 'humanName'), name => name.use === 'usual') || find(get(this.props, 'humanName'), name => name.use === 'official');
    this.patientName = patientUse.text || `${patientUse.given.join(' ')} ${patientUse.family}`;
    this.fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || HumanName.nameConcatenator(nameRecord));
  }

  menuGenerator(nameRecords, classes) {
    const menuList = nameRecords.map((nameRecord, index) => (
      <DataRow
        key={`humanName${uuidv4()}`}
        label={get(nameRecord, 'use', 'N/A')}
        value={this.fullNames[index]}
        details={`${moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')
        } - ${has(nameRecord, 'period.end')}`
          ? moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY')
          : 'Present'}
      />
    ));
    menuList.unshift(
      <div
        className={classes.humanNameMenuHeader}
        key="additionalNames"
      >
        Additional Names
      </div>,
    );
    return menuList;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.humanName}>
        <div className={classes.humanNamePanel}>
          <div className={classes.humanNameLabel}>
            {this.patientName}
          </div>
          <InfoDropdown>
            {this.menuGenerator(get(this.props, 'humanName'), classes)}
          </InfoDropdown>
        </div>
        {/* <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa icon-info'} title={get(this.props, 'nameInfo')}/> */}
      </div>
    );
  }
}

HumanName.propTypes = {
  classes: PropTypes.object,
  // humanName: PropTypes.array,
  // nameInfo: PropTypes.string,
};

export default withStyles(styles)(HumanName);
