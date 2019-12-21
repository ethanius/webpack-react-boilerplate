import React from 'react';
import { storiesOf } from '@storybook/react';
import Image from './index';

// eslint-disable-next-line no-undef
const stories = storiesOf('Image', module);

stories.add('Základní', () => (
	<Image src="https://satyr.io/1200x16:9" />
));
