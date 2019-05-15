
import React from 'react';
import HumanName from '../components/HumanName';
import CenteredTabs from './CenteredTabs';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { black } from 'ansi-colors';
import avatar from '../assets/avatar.png';
import { rgb } from 'polished';
import { AutoFocusInside } from 'react-focus-lock';
import { find, get, has } from 'lodash';
import moment from 'moment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';


const styles = {
  background: {
    width: 360,
    height: 550,
    background: "#F0F4F8",
    position:"relative",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "box-shadow": "0px 3px 6px 0px rgba(246, 246, 246, 0.16)"
  },
  card: {
    width: 315,
    height: 487,
    background: "#FFFFFF",
    "box-shadow": "#BCCCDC",
    display: "grid",
    "grid-template-columns": "100%",
    "grid-template-rows": "30% 70%",

  },
  header: {

    width: 250,
    height: 90,
    "justify-self": "center",
    "align-self":"center",
    display: "grid",
    "grid-template-columns": "65px auto",
    "grid-template-rows": "65px auto",
    "grid-row": 1
  },
  avatarContainer: {
    "grid-column": 1,
    "grid-row": "1/ span 2",
    "text-align": "center",
    "& p": {
      "margin-top":5,
      "font-size": 16,
      "font-family": "Source Sans Pro",
      "font-weight": "500",
      "color": "rgb(98, 125, 152)"
    }
  },
  tabsContainer: {
    "grid-row": 2,
    zIndex: 0
  }
};
// Mike Wants Hooks
// Also wants pure
const Patient = props => {
  console.log(props);
  let { classes } = props;
  const patientIdentifier = find(get(props, 'patient.identifier'), identifier => identifier.use === 'official');

  return(
    <div className = {classes.background}>
      <div className = {classes.card}>
        <div className = {classes.header}>
          <div className = {classes.avatarContainer}>
              <img src={avatar} height="65" width = "65" alt="Avatar" />
              <p>Active</p>
          </div>
          <HumanName humanName={get(props, 'patient.name')}
              nameInfo={get(props, 'info.nameInfo')}/>
        </div>
        <CenteredTabs clasName={classes.tabsContainer}/>
      </div>
    </div>
  );
};

export default withStyles(styles)(Patient);
