/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { get, has } from 'lodash';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  Period: {
    fontFamily: 'Source Sans Pro',
    fontSize: '.9rem',
    color: get(theme, 'palette.primary.main', '#829AB1'),
  },
});

// There are two ways to use Period. The static function allows you to get back a
// string of the text, and the render method returns an object. Use the static
// method if you want it embedded somewhere in an object, and use the render
// if you need a span returned.
class Period extends PureComponent {
  static periodLabel(period) {
    if (!has(period, 'start')) {
      return '';
    }
    return (`${moment(get(period, 'start')).format('MM/DD/YYYY')
    } - ${has(period, 'end')
      ? moment(get(period, 'end')).format('MM/DD/YYYY')
      : 'Present'}`);
  }

  render() {
    const { classes, period, classOverride } = this.props;
    return (
      <span className={classOverride || classes.Period}>
        <Typography>
          {Period.periodLabel(period)}
        </Typography>
      </span>
    );
  }
}

Period.propTypes = {
  classes: PropTypes.object,
  period: PropTypes.object,
  classOverride: PropTypes.object,
};

export default withStyles(styles)(Period);
