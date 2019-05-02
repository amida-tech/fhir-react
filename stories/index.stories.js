import React from 'react';
import Patient from '../components/Patient';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Patient')} />);

storiesOf('Patient', module)
  .add('Hello World', () => (
    <Patient/>
  ));
