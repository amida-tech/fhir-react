
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  background: {
    width: 360,
    height: 550,
    background: "#F0F4F8"
  },
  card: {
    width: 315,
    height: 487,
    background: "#FFFFFF"
  }
};

const Patient = props => ({

  render() {
    let { classes } = props;
    return(
      <div className = {classes.background}>
        <div className = {classes.card}></div>
      </div>
    );
  }
});

export default withStyles(styles)(Patient);