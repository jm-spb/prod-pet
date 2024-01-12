import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  children: 'Button',
};

export const Clear = Template.bind({});
Clear.args = {
  label: 'Button',
  variant: 'clear',
  children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Button',
  variant: 'outline',
  children: 'Button',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  label: 'Button',
  variant: 'outline',
  children: 'Button',
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
