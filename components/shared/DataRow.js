import React from 'react';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { get } from 'lodash';

const defaultStyles = theme => ({
  DataRow: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '100%',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    margin: '1rem',
  },
  DataRowLabel: {
    gridColumn: '1',
    gridRow: '1',
    fontSize: '1rem',
    color: get(theme, 'palette.primary.light'),
    marginLeft: '1rem',
    minWidth: '5rem',
    textTransform: 'capitalize',
  },
  DataRowGroup: {
    gridColumn: '2',
    gridRow: '1',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '50% auto',
    flexDirection: 'column',
    minWidth: '9.0625rem',
    textOverflow: 'clip',
    overflow: 'auto',
    whiteSpace: 'normal',
    textTransform: 'capitalize',
  },
  DataRowValue: {
    gridRow: '1',
    fontFamily: 'Helvetica',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#243B53',
  },
  DataRowDetails: {
    gridRow: '2',
    fontFamily: 'Source Sans Pro',
    fontSize: '.9rem',
    color: get(theme, 'palette.primary.main'),
  },
});

const DataRow = ({
  label, value, details, classes,
}) => (
  <div className={classes.DataRow}>
    <span className={classes.DataRowLabel}>
      {label}
    </span>
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

DataRow.propTypes = {
  label: PropTypes.object,
  value: PropTypes.object,
  details: PropTypes.object,
  classes: PropTypes.object,
};


export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(DataRow);
