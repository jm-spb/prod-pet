import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextVariant } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'Description',
};

export const Dark = Template.bind({});
Dark.args = {
  title: 'Title',
  text: 'Description',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitle = Template.bind({});
onlyTitle.args = {
  title: 'Title',
};

export const onlyText = Template.bind({});
onlyText.args = {
  text: 'Description',
};

export const Error = Template.bind({});
Error.args = {
  variant: TextVariant.ERROR,
  title: 'Error',
  text: 'Description',
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  variant: TextVariant.ERROR,
  title: 'Error',
  text: 'Description',
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
