/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  infoDropdown: {
    position: 'relative',
    display: 'grid',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  infoDropdownButton: {
    color: '#829AB1',
    marginRight: 0,
    minWidth: 0,
    padding: 0,
  },
  infoDropdownMenuList: {
    padding: 0,
    height: '250px',
    overflowY: 'auto',
    '&:first-child': {
      padding: '3% 0 0 0',
    },
    '&> *:hover': {
      'background-color': '#fff',
    },
  },
  infoDropdownMenuItem: {
    padding: '25px 10px',
    '&:first-child': {
      'border-bottom': '1px solid #ccc',
    },
    '&:last-child': {
      borderWidth: 0,
    },
  },
};

class InfoDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { open } = this.state;
    if (!open) {
      this.setState({ open: true }, () => {
        document.addEventListener('click', this.handleToggle);
      });
    } else {
      this.setState({ open: false }, () => {
        document.removeEventListener('click', this.handleToggle);
      });
    }
  }

  render() {
    const { open } = this.state;
    const { classes, children } = this.props;
    return (
      <div className={classes.infoDropdown}>
        <Button
          className={classes.infoDropdownButton}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {open
            ? <FontAwesomeIcon icon={faChevronUp} className="fas fa-chevron-up fa fa-2x" />
            : <FontAwesomeIcon icon={faChevronDown} className="fas fa-chevron-down fa fa-2x" />
          }
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          placement="bottom-end"
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <MenuList className={classes.infoDropdownMenuList}>
                  {children.map(child => (
                    <MenuItem key={`menuItem${uuidv4()}`} className={classes.infoDropdownMenuItem}>
                      {child}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

InfoDropdown.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
};

export default withStyles(styles)(InfoDropdown);
