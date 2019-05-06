import React from 'react';
import Patient from '../components/Patient';
import HumanName from '../components/HumanName';
import { patient as Marion, info } from '../data/Marion';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { themes } from '@storybook/theming';
import xd from '../themes/xd';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Patient')} />);

storiesOf('Patient', module)
.addParameters({ options: { theme: xd } })
  .add('Hello World', () => (
    <div>
      <Patient patient={Marion} 
      nameInfo={info.nameInfo}/>  
    </div>
    
  ));

storiesOf('PatientView', module)
  .add('Because Riley made me change it', () => (
    <HumanName humanName={Marion.name} 
      nameInfo={info.nameInfo}/>
  ));