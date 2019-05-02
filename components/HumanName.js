import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfoDropdown from './InfoDropdown';
import { find, get, has, replace } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const styles = {
  humanName: {
    'display': 'flex',
    'flex-direction': 'row',
    'align-items': 'baseline',
    'justify-content': 'space-between'
  },
  humanNamePanel: {
    'display': 'flex',
    'align-items': 'center'
  },
  humanNameField: {
    'display': 'flex',
    'flex-direction': 'column'
  },
  humanNameSpan: {
    'margin': '0 2%',
    'text-transform': 'capitalize'
  },
  divider: {
    'display': 'block',
    'width': '100%',
    'border-top': '1px solid #ccc'
  },
  iconInfo: {
    'color': '#D3D3D3'
  }
};

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
        <div className={this.props.classes.humanName}>
            <div className={this.props.classes.humanNamePanel}>
              <h2>Name: {this.patientName}</h2>
              <InfoDropdown>
                {get(this.props, 'humanName').map((nameRecord, index) => 
                    <ul key={'humanName' + index}>
                  <li className={this.props.classes.humanNameField}>
                    <span className={this.props.classes.humanNameSpan}>
                      {get(nameRecord, 'use', 'N/A')} - {this.fullNames[index]}
                    </span>
                    <span className={this.props.classes.humanNameSpan}>
                      Period: {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {has(nameRecord, 'period.end') ?
                      moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                      'Present'}
                    </span>
                    <span className={this.props.classes.divider}/>
                    </li>
                  </ul>)
                }
              </InfoDropdown>
            </div>
            <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa icon-info'} title={get(this.props, 'nameInfo')}/>
          </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.array,
    nameInfo: PropTypes.string,
}
  
export default withStyles(styles)(HumanName);