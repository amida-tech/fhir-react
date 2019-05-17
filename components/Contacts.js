import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import uuidv4 from 'uuid/v4';
import InfoExpansion from './shared/InfoExpansion';
import HumanName from './HumanName';
import Organization from './Organization';
import Period from './Period';
import DataRow from './shared/DataRow';

const styles = {
  Contacts: {

  },
};

const Contacts = ({ contact }) => ({
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.Contacts}>
        {contact.map(entry => (
          <InfoExpansion
            key={`InfoExpansion${uuidv4()}`}
            title={HumanName.preferredName(entry.name) || Organization.preferredDBA(entry.organization)}
            details={Period.periodLabel(entry.period)}
          >
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
  },
});

export default withStyles(styles)(Contacts);
