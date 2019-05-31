import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import uuidv4 from 'uuid/v4';
import HumanName from './HumanName';
import Organization from './Organization';
import Period from './Period';
import { DataRow, InfoExpansion } from '../shared';
import { Relationship } from './CodeableConcepts';
import Telecom from './Telecom';

const styles = theme => ({

  header: {
    '& h4': {
      color: get(theme, 'palette.primary.light'),
      fontFamily: get(theme, 'typography.body2.fontFamily'),
    },
  },
  subHeader: {
    color: get(theme, 'palette.primary.light'),
  },
  value: {
    '& h5': {
      color: get(theme, 'palette.primary.dark'),
      fontWeight: 500,
      fontFamily: get(theme, 'typography.body1.fontFamily'),
    },
  },
  subtitle: {
    color: get(theme, 'palette.primary.light'),
    fontStyle: 'bold',
  },
});

class Contact extends React.PureComponent {
  render() {
    const { contact, classes } = this.props;
    const { relationship, gender, telecom } = contact;
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
                <div className={classes.header}>
                  <Typography variant="h4">
                    {'Gender'}
                  </Typography>
                </div>
              )}
              value={(
                <div className={classes.value}>
                  <Typography variant="h5">
                    {gender}
                  </Typography>
                </div>
              )}
            />
          ) }
          { telecom && <Telecom telecom={telecom} /> }
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
