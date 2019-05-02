import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
      <div className='info-dropdown'>
      <button className='hidden-button' onClick={this.toggleShow}>
        {this.state.show ? 
          <i className='fas fa-angle-up fa'/> :
          <i className='fas fa-angle-down fa'/>
        }
      </button>
      {this.state.show ?
        <div className='info-dropdown-more'>{this.props.children}</div> :
        ''
      }      
    </div>
  )}
}

InfoDropdown.propTypes = {
  children: PropTypes.object,
};

export default InfoDropdown;