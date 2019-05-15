/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import { compose } from 'recompose';
import { get } from 'lodash';

const defaultStyles = theme => ({
  infoExpansion: {

  },
  infoExpansionCardTitle: {
    color: get(theme, 'palette.middark', '#486581'),
  },
});

class InfoExpansion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.infoExpansion} />
    );
  }
}

InfoExpansion.propTypes = {
  classes: PropTypes.object,
//   children: PropTypes.array,
};


export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(InfoExpansion);
