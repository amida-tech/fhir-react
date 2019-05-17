/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { get, has } from 'lodash';

const defaultStyles = theme => ({
  Organization: {
    color: get(theme, 'palette.primary.main', '#829AB1'),
  },
});

class Organization extends PureComponent {
  static preferredDBA(organization) {
    if (has(organization, 'name')) {
      return organization.name;
    }
    if (has(organization, 'alias[0]')) {
      return organization.alias[0];
    }
    return '';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.Organization} />
    );
  }
}

Organization.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(defaultStyles)(Organization);
