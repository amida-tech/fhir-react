import React from 'react';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import { compose } from 'recompose';
import { get } from 'lodash';

const defaultStyles = theme => ({
  DataRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    margin: '1em',
  },
  DataRowLabel: {
    fontFamily: 'Source Sans Pro',
    fontSize: '1rem',
    color: '#486581',
    marginLeft: '15px',
    minWidth: '80px',
    textTransform: 'capitalize',
  },
  DataRowGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '145px',
    textOverflow: 'clip',
    overflow: 'auto',
    whiteSpace: 'normal',
    textTransform: 'capitalize',
  },
  DataRowValue: {
    fontFamily: 'Helvetica',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#243B53',
  },
  DataRowDetails: {
    fontFamily: 'Source Sans Pro',
    fontSize: '.9rem',
    color: get(theme, 'palette.primary.main', '#829AB1'),
  },
});

const DataRow = ({ label, value, details }) => ({
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.DataRow}>
        <span className={classes.DataRowLabel}>
          {label}
        </span>
        <span className={classes.DataRowDetails} />
        <div className={classes.DataRowGroup}>
          <span className={classes.DataRowValue}>
            {value}
          </span>
          <span className={classes.DataRowDetails}>
            {details}
          </span>
        </div>
      </div>
    );
  },
});

export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(DataRow);
