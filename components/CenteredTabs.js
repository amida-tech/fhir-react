import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    this.handleChange = props.handleChange;
  }

  render() {
    const { handleChange } = this;
    const { value, tabs, classes } = this.props;

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
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.number,
  tabs: PropTypes.array,
  handleChange: PropTypes.func,
};

export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(CenteredTabs);
