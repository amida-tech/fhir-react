import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash';
import { compose } from 'recompose';
import { withTheme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import avatar from '../../../assets/avatar.png';
import HumanName from '../HumanName';

const styles = theme => ({
  HeaderContainer: {
    width: '80%',
    height: 90,
    justifySelf: 'center',
    alignSelf: 'center',
    display: 'grid',
    gridTemplateColumns: '65px auto',
    gridTemplateRows: '65px auto',
    gridRow: 1,
  },
  AvatarContainer: {
    gridColumn: 1,
    gridRow: '1',
    textAlign: 'center',
  },
  Avatar: {
    placeSelf: 'center',
  },
  ActiveLabel: {
    marginTop: 5,
    gridColumn: 1,
    gridRow: 2,
    placeSelf: 'center',
    color: theme.palette.primary.main,
  },
});

class Header extends PureComponent {
  render() {
    const { classes, name, photo } = this.props;
    const {
      HeaderContainer,
      AvatarContainer,
      Avatar,
      ActiveLabel,
    } = classes;
    console.log(photo)
    return (
      <>
        <div className={HeaderContainer}>
          <div className={AvatarContainer}>
            { photo && has(photo, 'data') && has(photo, 'contentType')
              ? <img className={Avatar} src={`data:${photo.contentType};base64,${photo.data}`} height="65" width="65" alt="Avatar" />
              : <img className={Avatar} src={avatar} height="65" width="65" alt="Avatar" />
            }
            
           
          </div>
          <Typography variant="subtitle1" className={ActiveLabel}>
              Active
          </Typography>
          <HumanName
            humanName={name}
          />
        </div>
      </>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  photo: PropTypes.object,
  name: PropTypes.array,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Header);
