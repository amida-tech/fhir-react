/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { compose } from 'recompose';
import { get } from 'lodash';

const defaultStyles = theme => ({
  infoExpansionCard: {
    backgroundColor: get(theme, 'palette.tertiary.main', '#F0F4F8'),
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
    borderRadius: '5px',
    color: get(theme, 'palette.middark', '#486581'),
    margin: '1em',
  },
  infoExpansionCardTitle: {
    fontFamily: 'Helvetica',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  infoExpansionCardDetails: {
    fontFamily: 'Source Sans Pro',
    fontSize: '.9rem',
  },
  infoExpansionButton: {
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

  // The infoExpansionCardInfo display is nigh identical to the one used to the right of Data Row. If used again, extrapolate.
  render() {
    const {
      classes, title, details, children,
    } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.infoExpansion}>
        <div className={classes.infoExpansionCard}>
          <div className={classes.infoExpansionCardSubject}>
            <div className={classes.infoExpansionCardTitle}>
              {title}
            </div>
            <div className={classes.infoExpansionCardDetails}>
              {details}
            </div>
          </div>
          <Button
            className={classes.infoExpansionButton}
            onClick={this.handleToggle}
          >
            {open
              ? <FontAwesomeIcon icon={faChevronUp} className="fas fa-chevron-up fa fa-2x" />
              : <FontAwesomeIcon icon={faChevronDown} className="fas fa-chevron-down fa fa-2x" />
                }
          </Button>
        </div>
        {open && children}
      </div>
    );
  }
}

InfoExpansion.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  details: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(InfoExpansion);
