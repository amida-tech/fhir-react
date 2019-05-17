/* eslint-disable no-plusplus */

// Codeable Concepts, for now, is a utility library that understand the
// individual CCs and returns either React components, objects or strings
// for their values.
import { compact, get } from 'lodash';

const v20131 = { // English only! There's a German version too!
  C: 'Emergency Contact',
  E: 'Employer',
  F: 'Federal Agency',
  I: 'Insurance Company',
  N: 'Next-of-Kin',
  S: 'State Agency',
  U: 'Unknown',
};

export function Relationship(relationship) {
  if (relationship === undefined || relationship.length === 0) {
    return '';
  }

  if (relationship[0].text !== undefined) {
    return relationship.text;
  }

  const label = [];
  for (let i = 0; i < relationship[0].coding.length; i++) {
    let currentCode;
    if (get(relationship[0], `coding[${i}].display`) !== undefined) { // Display check first.
      currentCode = `${relationship[0].coding[i].display}`;
    } else { // Display failed, check systems.
      switch (relationship[0].coding[i].system) {
        case 'http://terminology.hl7.org/CodeSystem/v2-0131':
          currentCode = `${v20131[relationship[0].coding[i].code]}`;
          break;
        case 'http://snomed.info/sct':
          currentCode = relationship[0].coding[i].code;
          break;
        case 'http://terminology.hl7.org/CodeSystem/v3-RoleCode':
          currentCode = relationship[0].coding[i].code.charAt(0) + relationship[0].coding[i].code.slice(1).toLowerCase();
          break;
        default:
          currentCode = relationship[0].coding[i].code;
      }
    }
    if (relationship[0].coding[i].code.userSelected) {
      return currentCode;
    }
    label.push(currentCode);
  }
  return compact(label).join(', ');
}

export function maritalStatus(codeableConcept) {
  console.log(codeableConcept);
  console.log('Coming soon!');
}
