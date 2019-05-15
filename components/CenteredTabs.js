import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { compose } from 'recompose';


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
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { state, handleChange } = this;
    const { value } = state;

    return (
      <>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Overview" />
          <Tab label="Contacts" />
        </Tabs>
      </>
    );
  }
}


export default compose(
  withTheme(),
  withStyles(defaultStyles),
)(CenteredTabs);
