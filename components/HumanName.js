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
  humanNameLabel: {

    'font-family': 'Helvetica',
    'font-size': '22px',
    "font-style": "normal",
    "font-weight": 400,
    "color": "rgb(36, 59, 83)",
    "& p": {
      "margin-top":0,
      right:0,
    }
  },
  humanNameField: {
    'display': 'flex',
    'flex-direction': 'column',
    'text-transform': 'capitalize'
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
              <label className={this.props.classes.humanNameLabel}>
                <p>
                  {this.patientName}
                </p>
              </label>
              <InfoDropdown>
                {get(this.props, 'humanName').map((nameRecord, index) => 
                    <div key={'humanName' + index} className={this.props.classes.humanNameField}>
                      <div>
                        { get(nameRecord, 'use', 'N/A')} - {this.fullNames[index] }
                      </div>
                      <div>
                        Period: {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {has(nameRecord, 'period.end') ?
                        moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                        'Present'}
                      </div>
                      <div className={this.props.classes.divider}/>
                  </div>)
                }
              </InfoDropdown>
            </div>
            {/* <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa-1x fa icon-info'} title={get(this.props, 'nameInfo')}/> */}
        </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.array,
    nameInfo: PropTypes.string,
}
  
export default withStyles(styles)(HumanName);