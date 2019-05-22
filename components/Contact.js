import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { withStyles } from '@material-ui/core/styles';
import ContactPoint from './ContactPoint';


const defaultStyles = {
  ContactPoint: {

  },
};

class Contact extends PureComponent {
  render() {
    const { classes, contact } = this.props;
    return (
      <div className={classes.ContactPoint}>
        {contact && contact.map(contactPoint => (
          <ContactPoint
            key={`contactPoint${uuidv4()}`}
            contactPoint={contactPoint}
          />
        ))}
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object,
  contact: PropTypes.array,
};

export default withStyles(defaultStyles)(Contact);
