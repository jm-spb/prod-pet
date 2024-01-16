import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, VariantButton } from './Button';

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
  children: 'Button',
};

export const Clear = Template.bind({});
Clear.args = {
  variant: VariantButton.CLEAR,
  children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: VariantButton.OUTLINE,
  children: 'Button',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  variant: VariantButton.OUTLINE,
  children: 'Button',
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
