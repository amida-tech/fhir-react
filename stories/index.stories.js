import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { patient as Marion, info } from '../data/Marion';
// import patientExamples from '../data/HL7-Examples/patient-examples-general.json';
import DataRow from '../components/shared/DataRow';
import Patient from '../components/Patient';
import InfoExpansion from '../components/shared/InfoExpansion';
import storybookTheme from '../themes/xd';
import DefaultTheme from '../themes/default';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Patient')} />);

storiesOf('Patient', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Default Patient Theme', () => {
    const theme = createMuiTheme(DefaultTheme);

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

storiesOf('Patient - Eve Everywoman', module)
  .addParameters({ options: { theme: storybookTheme }, viewport: { defaultViewport: 'iphone6' } })
  .add('Contacts', () => {
    const theme = createMuiTheme(DefaultTheme);
    return (
      <div style={{ backgroundColor: '#fff', height: '600px' }}>
        <MuiThemeProvider theme={theme}>
          <InfoExpansion
            title="Rico Suave"
            details="05/12/1982 - Present"
          >
            <DataRow
              label="Relationship"
              value="Brother"
            />
            <DataRow
              label="Relationship"
              value="Dancer"
              details="11/20/1977 - 12/14/2017"
            />
          </InfoExpansion>
          <InfoExpansion
            title="Seymour Butts"
            details="05/12/1982 - 09/12/2009"
          >
            <DataRow
              label="Relationship"
              value="Father"
            />
          </InfoExpansion>
        </MuiThemeProvider>
      </div>
    );
  });
