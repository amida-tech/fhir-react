import React from 'react';
import Patient from '../components/Patient';
import HumanName from '../components/HumanName';
import { patient as Marion, info } from '../data/Marion';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Patient')} />);

storiesOf('Patient', module)
  .add('Hello World', () => (
    <Patient/>
  ));

storiesOf('PatientView', module)
  .add('WHADDUP', () => (
    <HumanName humanName={Marion.name} 
      nameInfo={info.nameInfo}/>
  ));