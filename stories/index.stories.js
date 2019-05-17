import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { get } from 'lodash';
import { select, object, withKnobs } from '@storybook/addon-knobs';
import Contacts from '../components/Contacts';
import { patient as Marion, fhirDescriptions } from '../data/Marion';
import { patientExamples } from '../data/examples';
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
  })
  .add('With Patient Dropdown', () => {
    const theme = createMuiTheme(DefaultTheme);
    const patientOptions = {
      Marion,
      ...patientExamples,
    };
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Patient
            patient={select('Patient', patientOptions, Marion, 'Patient')}
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

storiesOf('Patient - Eve Everywoman', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Contacts', () => {
    const theme = createMuiTheme(DefaultTheme);
    return (
      <div style={{ backgroundColor: '#fff', height: '600px' }}>
        <MuiThemeProvider theme={theme}>
          <Contacts
            contact={object('Patient', patientExamples.PatientPieter.contact)}
          />
        </MuiThemeProvider>
      </div>
    );
  });
