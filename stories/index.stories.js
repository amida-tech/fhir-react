import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { get } from 'lodash';
import { select, object, withKnobs } from '@storybook/addon-knobs';
import { patient as Marion, fhirDescriptions } from '../data/Marion';
import {
  Patient, HumanName, Address, Contact,
} from '../components/FHIRComponents';
import {
  StyledSelect,
} from '../components/shared';
import { patientExamples } from '../data/examples';
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
            patient={select('Patient', patientOptions, patientExamples.PatientPieter, 'Patient')}
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

storiesOf('Default Relationship Filter', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Theme', () => {
    const theme = createMuiTheme(DefaultTheme);
    const contacts = [
      'Emergency Contacts',
      'Next of Kin',
      'Insurance Company',
      'Favorite Child',
      'Next Favorite Child',
    ];
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <StyledSelect
            value="PlaceHolder"
            options={contacts}
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
          <Contact
            contact={patientExamples.PatientPieter.contact}
          />
        </MuiThemeProvider>
      </div>
    );
  });
