import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import uuidv4 from 'uuid/v4';
import Organization from './Organization';
import HumanName from './HumanName';
import Reference from './Reference';
import Period from './Period';
import { DataRow, InfoExpansion } from '../shared';
import { Relationship } from './CodeableConcepts';
import Telecom from './Telecom';
import Address from './Address';

const styles = theme => ({

  header: {
    color: get(theme, 'palette.primary.light'),
    fontFamily: get(theme, 'typography.body2.fontFamily'),
  },
  subHeader: {
    color: get(theme, 'palette.primary.light'),
    marginLeft: '1rem',
  },
  value: {
    color: get(theme, 'palette.primary.dark'),
    fontWeight: 500,
    fontFamily: get(theme, 'typography.body1.fontFamily'),
  },
  subtitle: {
    color: get(theme, 'palette.primary.light'),
    fontStyle: 'bold',
  },
});

class Contact extends React.PureComponent {

  render() {
    const { contact, classes } = this.props;
    const {
      relationship,
      gender,
      telecom,
      address,
      organization,
    } = contact;

    return (
      <div className={classes.root}>
        <InfoExpansion
          key={`InfoExpansion${uuidv4()}`}
          title={HumanName.preferredName(contact.name) || Organization.preferredDBA(contact.organization)}
          details={Period.periodLabel(contact.period)}
        >
          { relationship && <Relationship relationship={relationship} /> }
          { gender && (
            <DataRow
              label={(
                <Typography className={classes.header} variant="h4">
                  {'Gender'}
                </Typography>
              )}
              value={(
                <Typography className={classes.value} variant="h5">
                  {gender}
                </Typography>
              )}
            />
          ) }
          { telecom && <Telecom telecom={telecom} /> }
          { address && <Address address={address} />}
          { organization && <Reference reference={organization} label="Organization" />}
        </InfoExpansion>
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object,
  classes: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Contact);
