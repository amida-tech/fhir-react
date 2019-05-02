import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Address extends PureComponent {
    constructor(props) {
        super(props)
        //this.allAddresses = _.get(this.props, 'address').map(addressRecord => (_.get(addressRecord, 'prefix', '') + ' ' + _.get(addressRecord, 'given', '') + ' ' + _.get(addressRecord, 'family', '') + ' ' + _.get(addressRecord, 'suffix', '')).trim());
        this.currentAddress = _.find(_.get(this.props, 'address'), addressRecord => addressRecord.use === 'home');
    };
    
    addressConcatenator(addressRecord) {
        return (
            <div className='address'>
                {_.get(addressRecord, 'line').map((line, index) => <span key={'addressRecord' + index}>{line}<br/></span>)}
                <span>
                    {_.get(addressRecord, 'district')}
                </span>
                <span>
                    {_.compact([_.get(addressRecord, 'city'), _.get(addressRecord, 'state'), _.get(addressRecord, 'postalCode')]).join(', ')}
                </span>
                <span>
                    {_.get(addressRecord, 'country')}
                </span>
            </div>
        );
    }
  
    render() {
        return (
            _.has(this.currentAddress, 'text') ?
                (<div className='address'>
                    {_.get(this.currentAddress, 'text')}
                </div>) :
                this.addressConcatenator(this.currentAddress)
        );
    }
}

Address.propTypes = {
    address: PropTypes.object,
};
  
export default Address;