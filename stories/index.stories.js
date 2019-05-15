import React from 'react';
import Patient from '../components/Patient';
import HumanName from '../components/HumanName';
import { patient as Marion, info } from '../data/Marion';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { object, withKnobs } from '@storybook/addon-knobs';

import { Button, Welcome } from '@storybook/react/demo';
import { themes } from '@storybook/theming';
import xd from '../themes/xd';

addDecorator(withKnobs)

storiesOf('Patient', module)
  .addParameters({ options: { theme: xd } })
  .add('Hello World', () => (
    <div>
      <Patient
        patient={object('Patient', Marion)}
        info={info}
      />
    </div>
  ));

storiesOf('TALES OF SUSPENSE AND HUMAN NAMES', module)
  .add('Because Riley made me change it', () => (
    <HumanName humanName={object('Name', Marion.name)}
      nameInfo={info.nameInfo}/>
  ));
