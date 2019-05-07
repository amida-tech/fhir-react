import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// import Overview from './Overview';
// import Contacts from './Contacts';


// const theme = createMuiTheme({
//   inkBar: {
//     backgroundColor: 'yellow'
//   },
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: 'yellow'
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     }
//   }
// });

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    button: {
      fontFamily: "Source Sans Pro",
      textTransform: "capitalize"
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#829AB1',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    }
  })
};

class CenteredTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
      
    return (
      <MuiThemeProvider theme={theme}>
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

// CenteredTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// }

export default withStyles(styles)(CenteredTabs);