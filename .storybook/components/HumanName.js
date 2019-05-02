import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HumanName extends PureComponent {
    constructor(props) {
      super(props)
      this.patientName = _.find(_.get(this.props, 'humanName'), name => name.use === 'usual').text || _.find(_.get(this.props, 'humanName'), name => name.use === 'official').text;
      this.fullNames = _.get(this.props, 'humanName').map(nameRecord => nameRecord.text || this.nameConcatenator(nameRecord));
    };
    
    nameConcatenator(nameRecord) {
        return (_.replace(_.get(nameRecord, 'prefix', []), /,/g, ' ') + ' ' + 
        _.replace(_.get(nameRecord, 'given', []), /,/g, ' ') + ' ' +
        _.get(nameRecord, 'family', '') + ' ' +
        _.replace(_.get(nameRecord, 'suffix', []), /,/g, ' ')).trim();
    }
    
    render() {
      return(
        <div className='humanname'>
          <div className='field'>
            <div className='humanname-panel'>
              <h2>Name: {this.patientName}</h2>
              <InfoDropdown>
                {_.get(this.props, 'humanName').map((nameRecord, index) => 
                    <ul key={'humanName' + index}>
                  <li className='humanname-field'>
                    <span className='humanname-span capitalize'>
                      {_.get(nameRecord, 'use', 'N/A')} - {this.fullNames[index]}
                    </span>
                    <span className='humanname-span'>
                      Period: {moment(_.get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {_.has(nameRecord, 'period.end') ?
                      moment(_.get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                      'Present'}
                    </span>
                    <span className='divider'/>
                    </li>
                  </ul>)
                }
              </InfoDropdown>
            </div>
            <i className='fas fa-info-circle fa icon-info' title={_.get(this.props, 'nameInfo')}/>
          </div>
          </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.object,
};
  
export default HumanName;