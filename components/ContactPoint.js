import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import uuidv4 from 'uuid/v4';
import InfoExpansion from './shared/InfoExpansion';
import HumanName from './HumanName';
import Organization from './Organization';
import Period from './Period';
import DataRow from './shared/DataRow';
import * as CodeableConcepts from './CodeableConcepts';

const styles = theme => ({});

class ContactPoint extends React.PureComponent {
  render() {
    const { contactPoint } = this.props;
    return (
      <div>
        <InfoExpansion
          key={`InfoExpansion${uuidv4()}`}
          title={HumanName.preferredName(contactPoint.name) || Organization.preferredDBA(contactPoint.organization)}
          details={Period.periodLabel(contactPoint.period)}
        >
          { contactPoint.relationship && (
            <DataRow
              label={(
                <Typography variant="subtitle2">
                  {'Relationship'}
                </Typography>
              )}
              value={(
                <Typography>
                  {CodeableConcepts.Relationship(contactPoint.relationship)}
                </Typography>
                )}
              details={(
                <Typography>
                  {CodeableConcepts.Relationship(contactPoint.relationship)}
                </Typography>
              )}
            />
          ) }
          { contactPoint.gender && (
            <DataRow
              label={(
                <Typography variant="subtitle2">
                  {'Gender'}
                </Typography>
              )}
              value={(
                <Typography>
                  {contactPoint.gender}
                </Typography>
              )}
            />
          ) }
        </InfoExpansion>
      </div>
    );
  }
}

ContactPoint.propTypes = {
  contactPoint: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(ContactPoint);
