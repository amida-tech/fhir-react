import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  infoDropdown: {
    'position': 'relative',
    'padding-left': '5px'
  },
  infoDropdownButton: {
    'color': '#829AB1',
    'margin-right': 0,
    'min-width': 0,
    'padding': 0
  },
  infoDropdownMenuList: {
    'padding': 0,
    'height': '150px',
    'overflow-y': 'auto',
    'z-index': 1
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
          open: false,
      };
      this.handleToggle = this.handleToggle.bind(this);
    }
    
    handleToggle(evt) {
      if (!this.state.open) {
        this.setState({ open: true }, () => {
        document.addEventListener('click', this.handleToggle);
      });
    } else {
      this.setState({ open: false }, () => {
        document.removeEventListener('click', this.handleToggle);
      });
    }
  };
  
  render() {
  return (
      <div className={this.props.classes.infoDropdown}>
      <Button
        className={this.props.classes.infoDropdownButton}
        buttonRef={node => {
          this.anchorEl = node;
        }}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={this.handleToggle}>
          {this.state.open ? 
            <FontAwesomeIcon icon={faCaretUp} className='fas fa-caret-up fa fa-2x'/> :
            <FontAwesomeIcon icon={faCaretDown} className='fas fa-caret-down fa fa-2x'/>
          }
        </Button>
      <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
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