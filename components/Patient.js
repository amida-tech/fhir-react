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
  background: {
    width: 360,
    height: 550,
    background: '#F0F4F8',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 3px 6px 0px rgba(246, 246, 246, 0.16)',
  },
  card: {
    width: 315,
    height: 487,
    background: '#FFFFFF',
    boxShadow: '#BCCCDC',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '30% 70%',

  },
  header: {

    width: 250,
    height: 90,
    'justify-self': 'center',
    'align-self': 'center',
    display: 'grid',
    'grid-template-columns': '65px auto',
    'grid-template-rows': '65px auto',
    'grid-row': 1,
  },
  avatarContainer: {
    'grid-column': 1,
    'grid-row': '1/ span 2',
    'text-align': 'center',
    '& p': {
      'margin-top': 5,
      'font-size': 16,
      'font-family': 'Source Sans Pro',
      'font-weight': '500',
      color: 'rgb(98, 125, 152)',
    },
  },
  tabsContainer: {
    'grid-row': 2,
    zIndex: 0,
  },
};

// Mike Wants Hooks
// Also wants pure
class Patient extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const {
      background, card, header, avatarContainer, tabsContainer,
    } = classes;
    return (
      <div className={background}>
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
      </div>
    );
  }
}

Patient.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Patient);
