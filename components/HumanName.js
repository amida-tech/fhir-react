import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfoDropdown from './InfoDropdown';
import { find, get, has, replace } from 'lodash';
import moment from 'moment';

class HumanName extends PureComponent {
    constructor(props) {
      super(props)
      this.patientName = find(get(this.props, 'humanName'), name => name.use === 'usual').text || find(get(this.props, 'humanName'), name => name.use === 'official').text;
      this.fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || this.nameConcatenator(nameRecord));
    };
    
    nameConcatenator(nameRecord) {
        return (replace(get(nameRecord, 'prefix', []), /,/g, ' ') + ' ' + 
        replace(get(nameRecord, 'given', []), /,/g, ' ') + ' ' +
        get(nameRecord, 'family', '') + ' ' +
        replace(get(nameRecord, 'suffix', []), /,/g, ' ')).trim();
    }
    
    render() {
      return(
        <div className='humanname'>
          <div className='field'>
            <div className='humanname-panel'>
              <h2>Name: {this.patientName}</h2>
              <InfoDropdown>
                {get(this.props, 'humanName').map((nameRecord, index) => 
                    <ul key={'humanName' + index}>
                  <li className='humanname-field'>
                    <span className='humanname-span capitalize'>
                      {get(nameRecord, 'use', 'N/A')} - {this.fullNames[index]}
                    </span>
                    <span className='humanname-span'>
                      Period: {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {has(nameRecord, 'period.end') ?
                      moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                      'Present'}
                    </span>
                    <span className='divider'/>
                    </li>
                  </ul>)
                }
              </InfoDropdown>
            </div>
            <i className='fas fa-info-circle fa icon-info' title={get(this.props, 'nameInfo')}/>
          </div>
          </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.array,
    nameInfo: PropTypes.string,
}
  
export default HumanName;