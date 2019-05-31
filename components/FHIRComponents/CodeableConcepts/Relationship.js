// Codeable Concepts, for now, is a utility library that understand the
// individual CCs and returns either React components, objects or strings
// for their values.
import { compact, get } from 'lodash';
import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import uuidv4 from 'uuid/v4';
import { DataRow } from '../../shared';

const v20131 = { // English only! There's a German version too!
  C: 'Emergency Contact',
  E: 'Employer',
  F: 'Federal Agency',
  I: 'Insurance Company',
  N: 'Next-of-Kin',
  S: 'State Agency',
  U: 'Unknown',
};

const getRelationshipDisplay = relCodeableConcept => {
  if (relCodeableConcept === undefined || relCodeableConcept.length === 0) {
    return '';
  }
  if (relCodeableConcept.text !== undefined) {
    return relCodeableConcept.text;
  }

  console.log("relCodeableConcepter")
  console.log(relCodeableConcept)
  const label = [];
  relCodeableConcept.coding.forEach(code => {
    if (code.display !== undefined) { // Display check first.
      label.push(`${code.display}`);
    } else { // Display failed, check systems.
      switch (code.system) {
        case 'http://terminology.hl7.org/CodeSystem/v2-0131':
          label.push(`${v20131[code.code]}`);
          break;
        case 'http://snomed.info/sct':
          label.push(code.code);
          break;
        case 'http://terminology.hl7.org/CodeSystem/v3-RoleCode':
          label.push(code.code.charAt(0) + code.code.slice(1).toLowerCase());
          break;
        default:
          label.push(code.code);
      }
    }
  });
  return compact(label).join(', ');
};

const styles = theme => ({
  header: {
    '& h4': {
      color: get(theme, 'palette.primary.light'),
      fontFamily: get(theme, 'typography.body2.fontFamily'),
    },
  },
  value: {
    '& h5': {
      color: get(theme, 'palette.primary.dark'),
      fontWeight: 500,
      fontFamily: get(theme, 'typography.body1.fontFamily'),
    },
  },
});

const Relationship = ({ relationship, classes }) => (
  <div>
    { relationship && (
    <DataRow
      label={(
        <div className={classes.header}>
          <Typography variant="h4">
            {'Relationship'}
          </Typography>
        </div>
      )}
      value={(
        <div className={classes.value}>
          {relationship.map(coding => (
            <Typography variant="h5" key={`relationship_${uuidv4()}`}>
              {getRelationshipDisplay(coding)}
              <br />
            </Typography>
          ))}
        </div>
        )}
    />
    )}
  </div>
);


Relationship.propTypes = {
  relationship: PropTypes.array,
  classes: PropTypes.object,
};

export {
  getRelationshipDisplay,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Relationship);
