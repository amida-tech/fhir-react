import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { patient as Marion, fhirDescriptions } from '../data/Marion';
import { Patient, HumanName, Address, Contacts } from '../components';
import { get } from 'lodash';
import storybookTheme from '../themes/xd';
import DefaultTheme from '../themes/default';

storiesOf('Patient', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <div>
        <MuiThemeProvider theme={theme}>   
          <Patient
            patient={Marion}
            fhirDescriptions={fhirDescriptions}
          />
        </MuiThemeProvider>
      </div>
    );
  });


storiesOf('Default HumanName', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <HumanName
            humanName={get(Marion, 'name')}
          />
        </MuiThemeProvider>
      </div>
    );
  });

storiesOf('Default Address', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Address
            address={get(Marion, 'address')}
          />
        </MuiThemeProvider>
      </div>
    );
  });
