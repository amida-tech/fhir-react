import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import {
  compact, get, has,
} from 'lodash';
import { compose } from 'recompose';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DataRow from '../shared/DataRow';

const styles = theme => ({
  header: {
    color: get(theme, 'palette.primary.light'),
    fontFamily: get(theme, 'typography.body2.fontFamily'),
  },
  subHeader: {
    color: get(theme, 'palette.primary.light'),
    marginLeft: '1rem',
  },
  value: {
    color: get(theme, 'palette.primary.dark'),
    fontWeight: 500,
    fontFamily: get(theme, 'typography.body1.fontFamily'),
  },
});

class Address extends PureComponent {
  constructor(props) {
    super(props);

    this.currentAddress = get(this.props, 'address');
  }

  getAddress = address => (
    has(address, 'text')
      ? (
        <>
          {get(address, 'text')}
        </>
      )
      : this.addressConcatenator(address)
  );

  /* eslint-disable-next-line class-methods-use-this */
  addressConcatenator(addressRecord) {
    return (
      <>
        {has(addressRecord, 'line') && get(addressRecord, 'line').map(line => (
          <span key={`addressRecord${uuidv4()}`}>
            {line}
            <br />
          </span>
        ))}
        <span>
          {get(addressRecord, 'district')}
        </span>
        <span>
          {compact([get(addressRecord, 'city'), get(addressRecord, 'state'), get(addressRecord, 'postalCode')]).join(', ')}
          <br />
        </span>
        <span>
          {get(addressRecord, 'country')}
        </span>
      </>
    );
  }

  render() {
    const { classes, address } = this.props;

    return (
      (has(address, 'use')
        ? (
          <>
            <DataRow
              label={(
                <Typography className={classes.header} variant="h4">
                  Address
                </Typography>
              )}
            />
            <DataRow
              label={(
                <Typography className={classes.subHeader} variant="h4">
                  {get(address, 'use')}
                </Typography>
              )}
              value={(
                <Typography className={classes.value} variant="h5">
                  {this.getAddress(address)}
                </Typography>
              )}
            />
          </>
        ) : (
          <>
            <DataRow
              label={(
                <div className={classes.header}>
                  <Typography variant="h4">
                    Address
                  </Typography>
                </div>
              )}
              value={(
                <Typography className={classes.value} variant="h5">
                  {this.getAddress(address)}
                </Typography>
              )}
            />
          </>
        )
      )
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object,
  address: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Address);
