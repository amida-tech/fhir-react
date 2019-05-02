import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compact, find, get, has } from 'lodash';
// import { moment } from 'moment';

class Address extends PureComponent {
    constructor(props) {
        super(props)
        //this.allAddresses = get(this.props, 'address').map(addressRecord => (get(addressRecord, 'prefix', '') + ' ' + get(addressRecord, 'given', '') + ' ' + get(addressRecord, 'family', '') + ' ' + get(addressRecord, 'suffix', '')).trim());
        this.currentAddress = find(get(this.props, 'address'), addressRecord => addressRecord.use === 'home');
    };
    
    addressConcatenator(addressRecord) {
        return (
            <div className='address'>
                {get(addressRecord, 'line').map((line, index) => <span key={'addressRecord' + index}>{line}<br/></span>)}
                <span>
                    {get(addressRecord, 'district')}
                </span>
                <span>
                    {compact([get(addressRecord, 'city'), get(addressRecord, 'state'), get(addressRecord, 'postalCode')]).join(', ')}
                </span>
                <span>
                    {get(addressRecord, 'country')}
                </span>
            </div>
        );
    }
  
    render() {
        return (
            has(this.currentAddress, 'text') ?
                (<div className='address'>
                    {get(this.currentAddress, 'text')}
                </div>) :
                this.addressConcatenator(this.currentAddress)
        );
    }
}

Address.propTypes = {
    address: PropTypes.object,
};
  
export default Address;