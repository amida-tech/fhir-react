import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const styles = {
  infoDropdown: {
    'display': 'block',
    'position': 'relative'
  },
  infoDropdownButton: {
    'background': 'none',
    'border': 'none',
    'outline': 'none'
  },
  infoDropdownMenu: {
    'display': 'block',
    'position': 'absolute',
    'background': 'white',
    'border': '2px solid black',
    'width': '300px',
    'height': '150px',
    'overflow-y': 'auto',
    'right': 0,
    'z-index': 1
  }
};

class InfoDropdown extends PureComponent {
    constructor(props) {
      super(props)
      this.state = { 
          show: false,
      };
      this.toggleShow = this.toggleShow.bind(this);
    }
    
    toggleShow(evt) {
        if (!this.state.show) {
        this.setState({ show: true }, () => {
        document.addEventListener('click', this.toggleShow);
      });
    } else {
      this.setState({ show: false }, () => {
        document.removeEventListener('click', this.toggleShow);
      });
    }
  };
  
  render() {
  return (
      <div className={this.props.classes.infoDropdown}>
      <button className={this.props.classes.infoDropdownButton}
        onClick={this.toggleShow}>
        {this.state.show ? 
          <FontAwesomeIcon icon={faCaretUp} className='fas fa-caret-up fa fa-2x'/> :
          <FontAwesomeIcon icon={faCaretDown} className='fas fa-caret-down fa fa-2x'/>
        }
      </button>
      {this.state.show ?
        <div className={this.props.classes.infoDropdownMenu}>{this.props.children}</div> :
        ''
      }      
    </div>
  )}
}

InfoDropdown.propTypes = {
  children: PropTypes.array,
};

export default withStyles(styles)(InfoDropdown);