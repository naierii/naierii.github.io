---
to: <%= absPath %>/<%= component_name %>.stories.tsx
---
import React from 'react';
import { Story, Meta } from '@storybook/react';
import <%= component_name %>, { <%= component_name %>Props } from './<%= component_name %>';

export default {
  title: '<%= category %>/<%= component_name %>',
  component: <%= component_name %>,
  argTypes: {}
} as Meta;

const Template: Story<<%= component_name %>Props> = (args) => <<%= component_name %> {...args} />;

export const Default = Template.bind({});
Default.args = {};
