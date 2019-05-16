import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { get } from 'lodash';
import { object, withKnobs } from '@storybook/addon-knobs';
import { patient as Marion, fhirDescriptions } from '../data/Marion';
import { Patient, HumanName, Address } from '../components';
import storybookTheme from '../themes/xd';
import DefaultTheme from '../themes/default';

storiesOf('Patient', module)
  .addDecorator(withKnobs)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Patient
            patient={object('Patient', Marion)}
            info={object('fhirDescriptions', fhirDescriptions)}
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
            humanName={object('name', get(Marion, 'name'))}
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
            address={object('address', get(Marion, 'address'))}
            patient={object('Patient', Marion)}
            info={object('fhirDescriptions', fhirDescriptions)}
          />
        </MuiThemeProvider>
      </div>
    );
  });

