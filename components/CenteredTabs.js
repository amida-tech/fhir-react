import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { compose } from 'recompose';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.tertiary.main,
  },
  tabsIndicator: {
    backgroundColor: theme.palette.secondary.main,
  },
  tabRoot: {
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
    opacity: 1,
  },
  tabSelected: {
    color: theme.palette.primary.dark,
  },
  tabRippleChild: {
    backgroundColor: theme.palette.tertiary.light,
  },
});

class CenteredTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { state, handleChange } = this;
    const { value } = state;
    const { classes } = this.props;

    return (
      <>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          centered
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            label="Overview"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            TouchRippleProps={{ classes: { child: classes.tabRippleChild } }}
          />
          <Tab
            label="Contacts"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            TouchRippleProps={{ classes: { child: classes.tabRippleChild } }}
          />
        </Tabs>
      </>
    );
  }
}
CenteredTabs.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.object.isRequired,
    tabsRoot: PropTypes.object.isRequired,
    tabsIndicator: PropTypes.object.isRequired,
    tabRoot: PropTypes.object.isRequired,
    tabSelected: PropTypes.object.isRequired,
    tabRippleChild: PropTypes.object.isRequired,
  }).isRequired,
};


export default compose(
  withTheme(),
  withStyles(styles),
)(CenteredTabs);
