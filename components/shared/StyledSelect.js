import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  find, get, has, isNil,
} from 'lodash';
import { compose } from 'recompose';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import DownArrow from '../../assets/a-icon-arrow-down.png';
import UpArrow from '../../assets/a-icon-arrow-up.png';

function getStyles(value, that) {
  return {
    fontWeight:
      that.state.value.indexOf(value) === -1
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
    backgroundColor: '#ae0000',
  },
});

const Input = withStyles(theme => ({
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

class StyledSelect extends PureComponent {
  state = {
    value: '',
  }

  handleChange = event => {
    if (has(this.props, 'handleChange')) {
      const { handleChange } = this.props;
      handleChange(event);
    }
    this.setState({ value: event.target.value });
  };


  render() {
    const {
      classes,
      options,
      placeHolder,
    } = this.props;

    const { value } = this.state;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.margin}>
          <Select
            displayEmpty
            value={value}
            onChange={this.handleChange}
            input={<Input />}
            renderValue={selected => {
              if (selected.length === 0) {
                return isNil(placeHolder) ? '' : placeHolder;
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
            { placeHolder
              && (
              <MenuItem key={placeHolder} value={placeHolder} style={getStyles(placeHolder, this)}>
                {placeHolder}
              </MenuItem>
              )
            }
            {options.map(option => (
              <MenuItem key={option} value={option} style={getStyles(option, this)}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

StyledSelect.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  placeHolder: PropTypes.string,
  handleChange: PropTypes.func,
};


export default compose(
  withTheme(),
  withStyles(styles),
)(StyledSelect);
