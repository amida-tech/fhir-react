/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import { compose } from 'recompose';
import { CenteredTabs } from '../../shared';
import OverviewSection from './OverviewSection';
import ContactsSection from './ContactsSection';
import Header from './Header';

const styles = {
  PatientCard: {
    minHeight: 600,
    inWidth: 200,
    maxWidth: 400,
    background: '#FFFFFF',
    borderRadius: '3px',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '30% 48px 70%',
    alignSelf: 'middle',
    boxShadow: '2px 3px 10px 0px rgba(188, 204, 220)',
    overflowY: 'scroll',
  },
  PatientContentContainer: {
    display: 'grid',
    gridRow: 3,
  },
};


class Patient extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 1,
    };
  }

  handleTabSelect = (event, value) => {
    this.setState({ tabValue: value });
  }

  render() {
    const { classes, patient } = this.props;
    const { tabValue } = this.state;
    const {
      PatientCard,
      PatientContentContainer,
    } = classes;
    const { contact, name, photo } = patient;
    const tabLabels = [
      'Overview',
      'Contacts',
    ];

    const tabContent = [
      (
        <OverviewSection
          {...patient}
        />
      ),
      (
        <ContactsSection
          contacts={contact}
        />
      ),
    ];

    return (
      <div className={PatientCard}>
        <Header
          name={name}
          photo={photo && photo[0]}
        />
        <CenteredTabs
          tabLabels={tabLabels}
          value={tabValue}
          handleChange={this.handleTabSelect}
        />
        <div className={PatientContentContainer}>
          { tabContent[tabValue] }
        </div>
      </div>
    );
  }
}

Patient.propTypes = {
  classes: PropTypes.object,
  patient: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Patient);
