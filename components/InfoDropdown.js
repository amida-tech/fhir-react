import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  infoDropdown: {
    'display': 'block',
    'position': 'relative'
  },
  infoDropdownButton: {
    'background': 'none',
    'border': 'none',
    'outline': 'none',
    'color': '#829AB1',
    'margin-left': '100%'
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
  },
  infoDropdownMenuList: {
    'padding': 0
  },
  infoDropdownMenuItem: {
    'border-bottom': '1px solid #ccc',
    '&:last-child': {
      'border-width': 0
    }
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
          <FontAwesomeIcon icon={faCaretUp} className='fas fa-caret-up fa fa-3x'/> :
          <FontAwesomeIcon icon={faCaretDown} className='fas fa-caret-down fa fa-3x'/>
        }
      </button>
      <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
          <Paper>
            <MenuList className={this.props.classes.infoDropdownMenuList}>
              {this.props.children.map((child, index) =>
                <MenuItem key={'menuItem' +index} className={this.props.classes.infoDropdownMenuItem}>
                  {child}
                </MenuItem>)}
            </MenuList>
          </Paper>
        </Grow>)}
      </Popper>
    </div>
  )}
}

//<div className={this.props.classes.infoDropdownMenu}>{this.props.children}</div>

InfoDropdown.propTypes = {
  children: PropTypes.array,
};

export default withStyles(styles)(InfoDropdown);