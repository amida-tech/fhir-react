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
    'align-items': 'center',
    'justify-content': 'space-between'
  },
  humanNamePanel: {
    'display': 'flex',
    'align-items': 'center'
  },
  humanNameLabel: {
    'font-family': 'Helvetica',
    'font-size': '1.5em',
    "font-style": "normal",
    "font-weight": 400,
    "color": "rgb(36, 59, 83)",
    "padding-left": "1rem"

  },
  humanNameMenuHeader: {
    'font-family': 'Helvetica',
    'font-size': '1.3em',
    'color': '#243B53',
    'margin-left': '5%',
    'margin-bottom': '3%'
  },
  humanNameField: {
    'display': 'flex',
    'flex-direction': 'row',
    'text-transform': 'capitalize'
  },
  humanNameTableLabel: {
    'font-family': 'Source Sans Pro',
    'font-size': '1em',
    'color': '#486581',
    'margin-left': '15px',
    'min-width': '80px'
  },
  humanNameDetails: {
    'display': 'flex',
    'flex-direction': 'column',
    'text-transform': 'capitalize'
  },
  humanNameTableName: {
    'font-family': 'Helvetica',
    'font-size': '1em',
    'font-weight': 'bold',
    'color': '#243B53'
  },
  humanNameTablePeriod: {
    'font-family': 'Source Sans Pro',
    'font-size': '.9em',
    'color': '#829AB1',
  },
  iconInfo: {
    'color': '#D3D3D3', // Be nice if we could use some preprocessor to render variables real soon.
    'align-self': 'end'
  }
};

class HumanName extends PureComponent {
    nameConcatenator(nameRecord) {
        return (replace(get(nameRecord, 'prefix', []), /,/g, ' ') + ' ' +
        replace(get(nameRecord, 'given', []), /,/g, ' ') + ' ' +
        get(nameRecord, 'family', '') + ' ' +
        replace(get(nameRecord, 'suffix', []), /,/g, ' ')).trim();
    }

    menuGenerator(nameRecords) {
      const fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || this.nameConcatenator(nameRecord));
      const menuList = nameRecords.map((nameRecord, index) =>
        <div key={'humanName' + index} className={this.props.classes.humanNameField}>
          <div className={this.props.classes.humanNameTableLabel}>
            {get(nameRecord, 'use', 'N/A')}
          </div>
          <div className={this.props.classes.humanNameDetails}>
            <div className={this.props.classes.humanNameTableName}>
              {fullNames[index]}
            </div>
            <div className={this.props.classes.humanNameTablePeriod}>
              {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {has(nameRecord, 'period.end') ?
                moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                'Present'}
            </div>
          </div>
        </div>);
        menuList.unshift(
          <div className={this.props.classes.humanNameMenuHeader}
            key='additionalNames'>
            Additional Names
          </div>);
        return menuList;
    }

    render() {
      const patientName = find(get(this.props, 'humanName'), name => name.use === 'usual').text || find(get(this.props, 'humanName'), name => name.use === 'official').text;
      return(
        <div className={this.props.classes.humanName}>
            <div className={this.props.classes.humanNamePanel}>
              <label className={this.props.classes.humanNameLabel}>
                  {patientName}
              </label>
              <InfoDropdown>
                {this.menuGenerator(get(this.props, 'humanName'))}
              </InfoDropdown>
            </div>
            {/* <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa icon-info'} title={get(this.props, 'nameInfo')}/> */}
        </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.array,
    nameInfo: PropTypes.string,
}

export default withStyles(styles)(HumanName);
