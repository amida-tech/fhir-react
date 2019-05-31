import React, { PureComponent } from 'react';
import uuidv4 from 'uuid/v4';
import {
  compact, find, get, has,
} from 'lodash';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  patient: {

  },
  patientTop: {
    'margin-bottom': '5%',
  },
};

class Address extends PureComponent {
  constructor(props) {
    super(props);
    // this.allAddresses = get(this.props, 'address').map(addressRecord => (get(addressRecord, 'prefix', '') + ' ' + get(addressRecord, 'given', '') + ' ' + get(addressRecord, 'family', '') + ' ' + get(addressRecord, 'suffix', '')).trim());

    this.currentAddress = find(get(this.props, 'address'), addressRecord => addressRecord.use === 'home');
  }

  /* eslint-disable-next-line class-methods-use-this */
  addressConcatenator(addressRecord) {
    return (
      <div className="address">
        {get(addressRecord, 'line').map(line => (
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
      </div>
    );
  }

  render() {
    return (
      has(this.currentAddress, 'text')
        ? (
          <div className="address">
            {get(this.currentAddress, 'text')}
          </div>
        )
        : this.addressConcatenator(this.currentAddress)
    );
  }
}

export default withStyles(styles)(Address);
