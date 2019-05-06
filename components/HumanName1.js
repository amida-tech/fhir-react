import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import arrow from '../assets/downdrop_arrow.png';
const styles = {
  humanNameContainer: {
    "& p": {
      "margin-top":0,
      right:0,
      position:"absolute",
      "font-family": "Helvetica",
      "font-style": "normal",
      "font-size": 24,
      "font-weight": 400,
      "color": "rgb(36, 59, 83)"
    }
  }
}

const expand = () => {
  
}

const HumanName = props => ({

  render() {
    
    let { classes } = props;

    return(
      <div className = {classes.humanNameContainer}>
        <p>Jane Doe</p>
        <img/>
      </div>
    );
  }
})

export default withStyles(styles)(HumanName);