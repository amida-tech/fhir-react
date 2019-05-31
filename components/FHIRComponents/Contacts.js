import React from 'react';
import {
  withStyles, withTheme,
} from '@material-ui/core/styles';
import uuidv4 from 'uuid/v4';
import { compose } from 'recompose';
import { has, get } from 'lodash';
import Contact from './Contact';

class Contacts extends React.PureComponent {
  render() {
    return (
      <>
        {
          has(this.props, 'contacts')
          && get(this.props, 'contacts').map(currContact => (
            <Contact
              key={`contact_${uuidv4()}`}
              contact={currContact}
            />
          ))
        }
      </>
    );
  }
}

export default compose(
  withTheme(),
  withStyles({}),
)(Contacts);
