import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import uuidv4 from 'uuid/v4';
import * as CodeableConcepts from '../util/CodeableConcepts';
import InfoExpansion from './shared/InfoExpansion';
import HumanName from './HumanName';
import Organization from './Organization';
import Period from './Period';
import DataRow from './shared/DataRow';

const defaultStyles = {
  Contacts: {

  },
};

class Contacts extends PureComponent {
  render() {
    const { classes, contact } = this.props;
    return (
      <div className={classes.Contacts}>
        {contact && contact.map(entry => (
          <InfoExpansion
            key={`InfoExpansion${uuidv4()}`}
            title={HumanName.preferredName(entry.name) || Organization.preferredDBA(entry.organization)}
            details={Period.periodLabel(entry.period)}
          >
            { entry.relationship && (
              <DataRow
                label="Relationship"
                value={CodeableConcepts.Relationship(entry.relationship)}
              />
            ) }
            { entry.gender && (
              <DataRow
                label="Gender"
                value={entry.gender}
              />
            ) }
          </InfoExpansion>
        ))}
      </div>
    );
  }
}

Contacts.propTypes = {
  classes: PropTypes.object,
  contact: PropTypes.array,
};

export default withStyles(defaultStyles)(Contacts);
