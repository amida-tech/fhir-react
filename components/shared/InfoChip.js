import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withTheme, withStyles } from '@material-ui/core';

const style = theme => ({
  ContactChip: {
    backgroundColor: theme.palette.tertiary.light,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    borderRadius: '5px',
    color: theme.palette.primary.light,
    margin: '1rem',
  },
});

const InfoChip = ({ classes, children }) => (
  <div className={classes.ContactChip}>
    {children}
  </div>
);

InfoChip.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default compose(
  withTheme(),
  withStyles(style),
)(InfoChip);
