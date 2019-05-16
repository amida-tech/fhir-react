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
  humanNameField: {
    display: 'flex',
    flexDirection: 'row',
  },
  humanNameTableLabel: {
    fontFamily: 'Source Sans Pro',
    fontSize: '1rem',
    color: '#486581',
    marginLeft: '15px',
    minWidth: '80px',
    textTransform: 'capitalize',
  },
  humanNameDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  humanNameTableName: {
    fontFamily: 'Helvetica',
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#243B53',
  },
  humanNameTablePeriod: {
    fontFamily: 'Source Sans Pro',
    fontSize: '.9em',
    color: '#829AB1',
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

  menuGenerator(nameRecords, classes) {
    const fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || HumanName.nameConcatenator(nameRecord));
    const menuList = nameRecords.map((nameRecord, index) => (
      <div key={`humanName${uuidv4()}`} className={classes.humanNameField}>
        <div className={classes.humanNameTableLabel}>
          {get(nameRecord, 'use', 'N/A')}
        </div>
        <div className={classes.humanNameDetails}>
          <div className={classes.humanNameTableName}>
            {fullNames[index]}
          </div>
          <div className={classes.humanNameTablePeriod}>
            {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')}
            {' to '}
            {has(nameRecord, 'period.end')
              ? moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY')
              : 'Present'}
          </div>
        </div>
      </div>
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
    const patientName = find(get(this.props, 'humanName'), name => name.use === 'usual') || find(get(this.props, 'humanName'), name => name.use === 'official');
    const { classes } = this.props;
    return (
      <div className={classes.humanName}>
        <div className={classes.humanNamePanel}>
          <div className={classes.humanNameLabel}>
            {patientName && patientName.text}
          </div>
          <InfoDropdown>
            {this.menuGenerator(get(this.props, 'humanName'), classes)}
          </InfoDropdown>
        </div>
        {/* <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa icon-info'} title={get(this.props, 'nameDescription')}/> */}
      </div>
    );
  }
}

HumanName.propTypes = {
  classes: PropTypes.object,
  // humanName: PropTypes.array,
  // nameDescription: PropTypes.string,
};

export default withStyles(styles)(HumanName);
