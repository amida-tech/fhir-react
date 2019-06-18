import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { get } from 'lodash';
import { select, object, withKnobs } from '@storybook/addon-knobs';
import { patient as Marion, fhirDescriptions } from '../data/Marion';
import Annotation__Note__DrSteveBerule from '../data/Annotation/DrSteveBerule'
import {
  Patient, HumanName, Address, Contacts, Note
} from '../components/FHIRComponents';
import {
  StyledSelect,
} from '../components/shared';
import { patientExamples } from '../data/examples';
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
            patient={select('Patient', patientOptions, patientExamples.PatientPieter, 'Patient')}
            fhirDescriptions={fhirDescriptions}
          />
        </MuiThemeProvider>
      </div>
    );
  })
  .add('No Contacts Data', () => {
    const theme = createMuiTheme(DefaultTheme);
    const { PatientLink2 } = patientExamples;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Patient
            patient={object(Patient, PatientLink2)}
            fhirDescriptions={fhirDescriptions}
          />
        </MuiThemeProvider>
      </div>
    );
  });

storiesOf('Note', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Dr. Steve Berule', () => {
    const theme = createMuiTheme(DefaultTheme);

    return (
      <MuiThemeProvider theme={theme}>
        <Note note={Annotation__Note__DrSteveBerule} />
      </MuiThemeProvider>
    )
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
            address={object('address', get(Marion, 'address[0]'))}
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
            placeHolder="PlaceHolder"
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
          <Contacts
            contacts={patientExamples.PatientPieter.contact}
          />
        </MuiThemeProvider>
      </div>
    );
  });
