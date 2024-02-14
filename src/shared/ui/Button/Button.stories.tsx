import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonVariant } from './Button';

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
  variant: ButtonVariant.CLEAR,
  children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: ButtonVariant.OUTLINE,
  children: 'Button',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
  variant: ButtonVariant.OUTLINE,
  size: ButtonSize.L,
  children: 'Button',
};

export const OutlineSizeXl = Template.bind({});
OutlineSizeXl.args = {
  variant: ButtonVariant.OUTLINE,
  size: ButtonSize.XL,
  children: 'Button',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  variant: ButtonVariant.OUTLINE,
  children: 'Button',
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Background = Template.bind({});
Background.args = {
  variant: ButtonVariant.BACKGROUND,
  children: 'Button',
};

export const BackgroundDark = Template.bind({});
BackgroundDark.args = {
  variant: ButtonVariant.BACKGROUND,
  children: 'Button',
};

BackgroundDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundContent = Template.bind({});
BackgroundContent.args = {
  variant: ButtonVariant.BACKGROUND_CONTENT,
  children: 'Button',
};

export const BackgroundContentDark = Template.bind({});
Background.args = {
  variant: ButtonVariant.BACKGROUND_CONTENT,
  children: 'Button',
};

Background.decorators = [ThemeDecorator(Theme.DARK)];

export const Square = Template.bind({});
Square.args = {
  variant: ButtonVariant.BACKGROUND_CONTENT,
  children: '>',
  square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  variant: ButtonVariant.BACKGROUND_CONTENT,
  children: '>',
  square: true,
  size: ButtonSize.L,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  variant: ButtonVariant.BACKGROUND_CONTENT,
  children: '>',
  square: true,
  size: ButtonSize.XL,
};
