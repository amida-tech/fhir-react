import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const tabsTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    button: {
      fontFamily: 'Source Sans Pro',
      textTransform: 'capitalize',
    },
  },
  palette: {
    primary: {
      main: '#829AB1',
    },
    // error: will use the default color
  },
});

const styles = theme => ({
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
    return (
      <MuiThemeProvider theme={tabsTheme}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Overview" />
          <Tab label="Contacts" />
        </Tabs>
      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(CenteredTabs);
