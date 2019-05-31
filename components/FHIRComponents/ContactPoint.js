import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { has, get } from 'lodash';
import { DataRow } from '../shared';
import Period from './Period';

const styles = theme => ({
  subHeading: {
    '& h4': {
      color: get(theme, 'palette.primary.light'),
      marginLeft: '1rem',
      fontFamily: get(theme, 'typography.body2.fontFamily'),
    },
  },
  value: {
    '& h5': {
      textTransform: 'none',
      color: get(theme, 'palette.primary.dark'),
      fontWeight: 500,
      fontFamily: get(theme, 'typography.body1.fontFamily'),
    },
  },
  subTitle: {
    fontFamily: get(theme, 'typography.body1.fontFamily'),
    color: get(theme, 'palette.primary.light'),
  },
});

class ContactPoint extends React.PureComponent {
  render() {
    const { contactPoint, classes } = this.props;
    const { value, use, period } = contactPoint;
    return (
      <>
        <DataRow
          label={(
            use && (
            <div className={classes.subHeading}>
              <Typography variant="h4">
                {use}
              </Typography>
            </div>
            )
          )}
          value={(
            <>
              { value && (
              <div className={classes.value}>
                <Typography variant="h5">
                  {value}
                </Typography>
              </div>
              )}
              {has(period, 'start') && (
                <Typography variant="subtitle2" className={classes.subTitle}>
                  {Period.periodLabel(period)}
                </Typography>
              )}
            </>
          )}
        />
      </>
    );
  }
}

ContactPoint.propTypes = {
  contactPoint: PropTypes.object,
  classes: PropTypes.object,
};


export default compose(
  withTheme(),
  withStyles(styles),
)(ContactPoint);
