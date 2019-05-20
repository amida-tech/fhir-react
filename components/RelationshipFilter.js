import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  find, get, has, isNil,
} from 'lodash';
import { compose } from 'recompose';
import { withStyles, withTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import DownArrow from '../assets/a-icon-arrow-down.png';
import UpArrow from '../assets/a-icon-arrow-up.png';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

function getStyles(relationship, that) {
  return {
    fontWeight:
      that.state.relationship.indexOf(relationship) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  selectMenu: {
    position: 'absolute',
    top: '-30px',
    backgroundColor: '#ae0000',
  },
});

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '10rem',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: theme.typography.body1.fontFamily,
  },
}))(InputBase);

const getRelationshipsBySystem = (contacts, system) => contacts
  .filter(contact => {
    if (has(contact, 'relationship[0].coding')) {
      return !isNil(find(contact.relationship[0].coding, code => has(code, 'system') && code.system === system));
    }
    return false;
  })
  .map(contact => {
    const code = find(contact.relationship[0].coding, currCode => has(currCode, 'system') && currCode.system === system);
    return has(code, 'display') ? code.display : code.code;
  });

class RelationshipFilter extends PureComponent {

  state= {
    relationship: '',
    contactRelationships: [],
    otherRelationships: [],
  }

  componentDidMount() {
    const contacts = get(this.props, 'contact') || [];
    const contactRelationships = getRelationshipsBySystem(contacts, 'http://hl7.org/fhir/ValueSet/patient-contactrelationship');
    const otherRelationships = getRelationshipsBySystem(contacts, 'http://terminology.hl7.org/CodeSystem/v3-RoleCode');

    this.setState({ contactRelationships });

    this.setState({ otherRelationships });
  }

  handleChange = event => {
    this.setState({ relationship: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">

        <FormControl className={classes.margin}>

          <Select
            displayEmpty
            value={get(this.state, 'relationship')}
            onChange={this.handleChange}
            input={<BootstrapInput />}
            renderValue={selected => {
              if (selected.length === 0
                && has(this, 'state.contactRelationships[0]')) {
                return get(this, 'state.contactRelationships[0]');
              }
              return selected;
            }}
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            }}
          >

            {get(this, 'state.contactRelationships').map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

RelationshipFilter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};


export default compose(
  withTheme(),
  withStyles(styles),
)(RelationshipFilter);
