import React from 'react';
import PropTypes from 'prop-types';
import { has, isNil, find, get} from 'lodash';
import { StyledSelect } from '../../shared';
import Contacts from '../Contacts';
import { getRelationshipDisplay } from '../CodeableConcepts';

const relationshipHasSystem = (relationship, system) => {
  let hasRelationshipCode = false;
  relationship.forEach(currRelationship => {
    if (has(currRelationship, 'coding')) {
      if (!isNil(find(currRelationship.coding, code => has(code, 'system') && code.system === system))) {
        hasRelationshipCode = true;
      }
    }
  });
  return hasRelationshipCode;
};

const getRelationshipbySystem = (relationship, system ) => {
  let relationshipWithCoding;
  relationship.forEach(currRelationship => {
    if (has(currRelationship, 'coding')) {
      if (!isNil(find(currRelationship.coding, code => has(code, 'system') && code.system === system))) {
        relationshipWithCoding = currRelationship;
      }
    }
  });
  return relationshipWithCoding;
};

const getRelationshipsBySystem = (contacts, system) => contacts
  .filter(contact => {
    if (has(contact, 'relationship')) {
      return relationshipHasSystem(contact.relationship, system);
    }
    return false;
  })
  .map(contact => {
    if (has(contact, 'relationship')) {
      const relationship = getRelationshipbySystem(contact.relationship, system);
      
      if (!isNil(relationship)) {
        return getRelationshipDisplay(relationship);
      }
    }
    return '';
  });

class ContactsSection extends React.PureComponent {
  state = {
    contacts: [],
    selectValues: [],
    placeHolder: 'Select a Relationship',
  }

  componentDidMount() {
    const { contacts } = this.props;
    const selectValues = getRelationshipsBySystem(contacts, 'http://terminology.hl7.org/CodeSystem/v2-0131');
    this.setState({
      contacts,
      selectValues,
    });
  }

  handleChange = event => {
    const { contacts } = this.props;
    const { placeHolder } = this.state;
    let selectedContacts = [];
    if (event.target.value === placeHolder) {
      selectedContacts = contacts;
    } else {
      selectedContacts = contacts.filter(contact => {
        if (has(contact, 'relationship')) {
          const relationship = contact.relationship
            .find(currRelationship => getRelationshipDisplay(currRelationship) === event.target.value);
          return !isNil(relationship);
        }
        
        // if (!isNil(find(contact.relationship[0].coding, code => has(code, 'code') && code.code === event.target.value))) {
        //   return true;
        // }
        return false;
      });
    }

    this.setState({
      contacts: selectedContacts,
    });
  };

  render() {
    const { contacts, selectValues } = this.state;
    return (
      <>
        <StyledSelect
          options={selectValues}
          handleChange={this.handleChange}
          placeHolder="Select a Relationship"
        />
        <Contacts contacts={contacts} />
      </>
    );
  }
}

ContactsSection.propTypes = {
  contacts: PropTypes.array,
};

export default ContactsSection;
