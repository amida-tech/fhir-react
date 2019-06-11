import React from 'react';
import PropTypes from 'prop-types';
import { get, has } from 'lodash';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import DataRow from '../shared/DataRow';


const styles = theme => ({
  header: {
    color: get(theme, 'palette.primary.light'),
    fontFamily: get(theme, 'typography.body2.fontFamily'),
  },
  value: {
    color: get(theme, 'palette.primary.dark'),
    fontWeight: 500,
    fontFamily: get(theme, 'typography.body1.fontFamily'),
  },
});

class Reference extends React.PureComponent {
  render() {
    const { classes, reference, label } = this.props;
    return (
      <div>
        <DataRow
          label={(
            <Typography className={classes.header} variant="h4">
              {label}
            </Typography>
          )}
          value={(
            has(reference, 'display')
              ? (
                <Typography className={classes.value} variant="h5">
                  {get(reference, 'display')}
                </Typography>
              ) : (
                <Typography className={classes.value} variant="h5">
                  {get(reference, 'reference')}
                </Typography>
              )
          )}
        />
      </div>
    );
  }
}

Reference.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  reference: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Reference);
