import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { patient as Marion, info } from '../data/Marion';
import Patient from '../components/Patient';
import xd from '../themes/xd';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Patient')} />);

storiesOf('Patient', module)
  .addParameters({ options: { theme: xd }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Patient Theme', () => {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#829AB1',
        },
      },
      typography: {
        useNextVariants: true,
        subtitle1: {
          fontFamily: 'Source Sans Pro',
          fontWeight: '500',
          fontSize: '14pt',
        },
        button: {
          fontFamily: 'Source Sans Pro',
          textTransform: 'capitalize',
        },
      },
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Patient
            patient={Marion}
            info={info}
          />
        </MuiThemeProvider>
      </div>
    );
  });
