import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { get } from 'lodash';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { compose } from 'recompose';
import PropTypes from 'prop-types';


const defaultStyles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class CenteredTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.tabIndx,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    const { state, handleChange } = this;
    const { value } = state;
    const { tabs, classes } = this.props;

    return (
      <div className={classes.CenteredTabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          { tabs.map(tab => (<Tab label={tab.label} />)) }
        </Tabs>
        {tabs.length && tabs[get(this, 'state.tabsIndx')]}
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object,
  tabIndx: PropTypes.number,
  tabs: PropTypes.array,
};

export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(CenteredTabs);
