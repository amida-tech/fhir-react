import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withTheme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import avatar from '../../../assets/avatar.png';
import HumanName from '../HumanName';

const styles = theme => ({
  header: {
    width: '80%',
    height: 90,
    justifySelf: 'center',
    alignSelf: 'center',
    display: 'grid',
    gridTemplateColumns: '65px auto',
    gridTemplateRows: '65px auto',
    gridRow: 1,
  },
  avatarContainer: {
    gridColumn: 1,
    gridRow: '1/ span 2',
    textAlign: 'center',
  },
  activeLabel: {
    marginTop: 5,
    color: theme.palette.primary.main,
  },
});

class Header extends React.PureComponent {
  render() {
    const { classes, name } = this.props;
    const {
      header,
      avatarContainer,
      activeLabel,
    } = classes;
    return (
      <>
        <div className={header}>
          <div className={avatarContainer}>
            <img src={avatar} height="65" width="65" alt="Avatar" />
            <Typography variant="subtitle1" className={activeLabel}>
              Active
            </Typography>
          </div>
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
  name: PropTypes.array,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Header);
