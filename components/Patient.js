/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { get } from 'lodash';
import avatar from '../assets/avatar.png';
import CenteredTabs from './CenteredTabs';
import HumanName from './HumanName';
import Overview from './Overview';
import Contacts from './Contacts';

const defaultStyles = theme => ({
  card: {
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
  tabsContainer: {
    gridRow: 2,
    zIndex: 0,
  },
});

class Patient extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const {
      card, header, avatarContainer, tabsContainer, activeLabel,
    } = classes;
    const tabs = [
      {
        component: (<Overview />),
        label: 'Overview',
      },
      {
        component: (
          <div>
            <Contacts
              contact={get(this.props, 'patient.contact')}
            />
            ????
          </div>
        ),
        label: 'Contacts',
      },
    ];

    return (
      <div className={card}>
        <div className={header}>
          <div className={avatarContainer}>
            <img src={avatar} height="65" width="65" alt="Avatar" />
            <Typography variant="subtitle1" className={activeLabel}>
              Active
            </Typography>
          </div>
          <HumanName
            humanName={get(this.props, 'patient.name')}
            nameDescription={get(this.props, 'fhirDescriptions.nameDescription')}
          />
        </div>
        <CenteredTabs className={tabsContainer} tabs={tabs} value={value} handleChange={this.handleChange} />
        {tabs.length && tabs[get(this, 'state.value')].component}
      </div>
    );
  }
}

Patient.propTypes = {
  classes: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(Patient);
