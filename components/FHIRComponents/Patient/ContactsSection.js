import React from 'react';
import PropTypes from 'prop-types';
import {
  has,
  isNil,
  find,
  get,
} from 'lodash';
import { withStyles } from '@material-ui/core';
import { StyledSelect } from '../../shared';
import Contacts from '../Contacts';
import { getRelationshipDisplay } from '../CodeableConcepts';
import NoContactData from '../../../assets/contacts-no-data.svg';

const styles = {
  NoContactDataImage: {
    placeSelf: 'center',
    placeContent: 'center',
    display: 'grid',
  },
  SelectRelationship: {
    marginTop: '25rem',
    marginBottom: '.25rem',
    height: 'auto',
  },
  ContactsContainer: {
    placeContent: 'center',
    display: 'grid',
  },
};

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
    let selectValues = [];
    if (!isNil(contacts)) {
      selectValues = getRelationshipsBySystem(contacts, 'http://terminology.hl7.org/CodeSystem/v2-0131');
    }
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
    } else if (!isNil(contacts)) {
      selectedContacts = contacts.filter(contact => {
        if (!isNil(get(contact, 'relationship'))) {
          const relationship = contact.relationship
            .find(currRelationship => getRelationshipDisplay(currRelationship) === event.target.value);
          return !isNil(relationship);
        }
        return false;
      });
    }

    this.setState({
      contacts: selectedContacts,
    });
  };

  render() {
    const { contacts, selectValues } = this.state;
    const { classes } = this.props;
    const {
      ContactsContainer,
    } = classes;
    return (
      <div>
        <StyledSelect
          options={selectValues}
          handleChange={this.handleChange}
          placeHolder="Select a Relationship"
        />
        { (contacts && contacts.length)
          ? <Contacts contacts={contacts} />
          : (
            <div className={ContactsContainer}>
              <img src={NoContactData} />
            </div>
          )
        }
      </div>
    );
  }
}

ContactsSection.propTypes = {
  contacts: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles)(ContactsSection);
