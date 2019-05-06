
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { black } from 'ansi-colors';
import avatar from '../assets/avatar.png';
import { rgb } from 'polished';
import { AutoFocusInside } from 'react-focus-lock';
import HumanName from '../components/HumanName';
import { find, get, has } from 'lodash';
import moment from 'moment';


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
    display: "flex",
    "justify-content": "center",
  },
  header: {
    width: 250,
    height: 90,
    "margin-top": 28,
    display: "grid",
    "grid-template-columns": "65px auto",
    "grid-template-rows": "65px auto"
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
  patientNameContainer: {
    position:"relative"
  }
};

const Patient = props => ({

  render() {
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
            <div className = {classes.patientNameContainer} >
            <HumanName humanName={get(props, 'patient.name')} 
                nameInfo={get(props, 'info.nameInfo')}/>
            </div>  
          </div>
        </div>
      </div>
    );
  }
});

export default withStyles(styles)(Patient);