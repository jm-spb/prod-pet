import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import LoginForm from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({ loginForm: { username: 'admin', password: '123' } })];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({ loginForm: { username: 'admin', password: '123' } })];

export const WithErrorDark = Template.bind({});
WithErrorDark.args = {};
WithErrorDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({ loginForm: { username: 'john', password: 'abc', error: 'ERROR' } }),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({ loginForm: { isLoading: true } })];
