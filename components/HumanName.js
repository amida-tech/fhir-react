/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  find, get, replace,
} from 'lodash';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import DataRow from './shared/DataRow';
import Period from './Period';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoDropdown from './shared/InfoDropdown';

const styles = theme => ({
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
    color: theme.palette.primary.dark,
    marginLeft: '5%',
    marginBottom: '3%',
  },
  humanNameTableLabel: {
    fontFamily: 'Source Sans Pro',
    fontSize: '1rem',
    color: theme.palette.primary.light,
    marginLeft: '15px',
    minWidth: '80px',
    textTransform: 'capitalize',
  },
  iconInfo: {
    color: '#D3D3D3',
    alignSelf: 'end',
  },
});

class HumanName extends PureComponent {
  static preferredName(humanName) {
    if (humanName === undefined) {
      return '';
    }
    const nameUse = Array.isArray(humanName)
      ? find(humanName, name => name.use === 'usual') || find(humanName, name => name.use === 'official' || humanName[0])
      : humanName;
    return nameUse.text ? nameUse.text : `${nameUse.given.join(' ')} ${nameUse.family}`;
  }

  static nameConcatenator(nameRecord) {
    return (`${replace(get(nameRecord, 'prefix', []), /,/g, ' ')} ${
      replace(get(nameRecord, 'given', []), /,/g, ' ')} ${
      get(nameRecord, 'family', '')} ${
      replace(get(nameRecord, 'suffix', []), /,/g, ' ')}`).trim();
  }

  menuGenerator(nameRecords, classes) {
    const fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || HumanName.nameConcatenator(nameRecord));
    const menuList = nameRecords.map((nameRecord, index) => (
      <DataRow
        key={`humanName${uuidv4()}`}
        label={get(nameRecord, 'use', 'N/A')}
        value={fullNames[index]}
        details={Period.periodLabel(get(nameRecord, 'period'))}
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
            {HumanName.preferredName(get(this.props, 'humanName'))}
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
