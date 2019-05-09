/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import avatar from '../assets/avatar.png';
import CenteredTabs from './CenteredTabs';
import HumanName from './HumanName';


const styles = {
  card: {
    width: 315,
    height: 487,
    background: '#FFFFFF',
    borderRadius: '3px',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '30% 70%',
    alignSelf: 'middle',
    boxShadow: '2px 3px 10px 0px rgba(188, 204, 220)',
  },
  header: {
    width: 250,
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
    '& p': {
      marginTop: 5,
      fontSize: 16,
      fontFamily: 'Source Sans Pro',
      fontWeight: '500',
      color: 'rgb(98, 125, 152)',
    },
  },
  tabsContainer: {
    gridRow: 2,
    zIndex: 0,
  },
};

// Mike Wants Hooks
// Also wants pure
class Patient extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const {
      card, header, avatarContainer, tabsContainer,
    } = classes;
    return (
      
      <div className={card}>
        <div className={header}>
          <div className={avatarContainer}>
            <img src={avatar} height="65" width="65" alt="Avatar" />
            <p>Active</p>
          </div>
          <HumanName
            humanName={get(this.props, 'patient.name')}
            nameInfo={get(this.props, 'info.nameInfo')}
          />
        </div>
        <CenteredTabs className={tabsContainer} />
      </div>
      
    );
  }
}

Patient.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Patient);
