/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  find, get, replace, isNil,
} from 'lodash';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DataRow, InfoDropDown } from '../shared';
import Period from './Period';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
    fontStyle: 'normal',
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 400,
    color: theme.palette.primary.dark,
    paddingLeft: '1rem',
  },
  humanNameMenuHeader: {
    color: theme.palette.primary.dark,
    fontFamily: theme.typography.body1.fontFamily,
    marginLeft: '5%',
  },
  humanNameUse: {
    color: theme.palette.primary.light,
    marginLeft: '.9375rem',
    minWidth: '5rem',
  },
  humanNamePeriod: {
    color: theme.palette.primary.light,
  },
  humanNameName: {
    color: theme.palette.primary.dark,
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
    if (isNil(get(this.props, 'humanName'))) {
      return (
        <>
        </>
      );
    }
    const fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || HumanName.nameConcatenator(nameRecord));
    const menuList = nameRecords.map((nameRecord, index) => (
      <DataRow
        key={`humanName${uuidv4()}`}
        label={(
          <Typography variant="h4">
            <div className={classes.humanNameUse}>
              {get(nameRecord, 'use', 'N/A')}
            </div>
          </Typography>
        )}
        value={(
          <Typography variant="h4">
            <div className={classes.humanNameName}>
              {fullNames[index]}
            </div>
          </Typography>
        )}
        details={(
          <Typography variant="subtitle2">
            <div className={classes.humanNamePeriod}>
              {Period.periodLabel(get(nameRecord, 'period'))}
            </div>
          </Typography>
        )}
      />

    ));
    menuList.unshift(
      <Typography variant="h3" key="additionalNames">
        <div
          className={classes.humanNameMenuHeader}
        >
          Additional Names
        </div>
      </Typography>,
    );
    return menuList;
  }

  render() {
    const { classes } = this.props;
    const { humanName } = this.props;
    return (
      <div className={classes.humanName}>
        <div className={classes.humanNamePanel}>
          <Typography variant="h2">
            <div className={classes.humanNameLabel}>
              {HumanName.preferredName(humanName)}
            </div>
          </Typography>
          <InfoDropDown>
            {this.menuGenerator(humanName, classes)}
          </InfoDropDown>
        </div>
      </div>
    );
  }
}

HumanName.propTypes = {
  classes: PropTypes.object,
  humanName: PropTypes.array,
};

export default withStyles(styles)(HumanName);
