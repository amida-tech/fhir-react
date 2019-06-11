import React, { PureComponent } from 'react';
import uuidv4 from 'uuid/v4';
import {
  get, has,
} from 'lodash';
import Address from './Address';

class Addresses extends PureComponent {
  render() {
    console.log("why")
    console.log(this.props.addresses)
    return (
      <>
        {
          has(this.props, 'addresses')
          && get(this.props, 'addresses').map(currAddress => (
            <Address
              key={`address_${uuidv4()}`}
              address={currAddress}
            />
          ))
        }
      </>
    );
  }
}

export default Addresses;
