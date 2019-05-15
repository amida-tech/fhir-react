import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { object, withKnobs } from '@storybook/addon-knobs';
import { Welcome } from '@storybook/react/demo';
import { patient as Marion, info } from '../data/Marion';
import Patient from '../components/Patient';
import storybookTheme from '../themes/xd';
import DefaultTheme from '../themes/default';


storiesOf('Patient', module)
  .addDecorator(withKnobs)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Patient Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Patient
            patient={object('Patient', Marion)}
            info={object('Info', info)}
          />
        </MuiThemeProvider>
      </div>
    );
  });
