import { screen, fireEvent } from '@testing-library/react';
import { componentRender } from 'shared/lib/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('renders without error', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('does not have "collapsed" class by default', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });

  test('toggles "collapsed" class when button is clicked', () => {
    componentRender(<Sidebar />);
    const sidebar = screen.getByTestId('sidebar');
    const button = screen.getByText('<');
    fireEvent.click(button);
    expect(sidebar).toHaveClass('collapsed');
    fireEvent.click(button);
    expect(sidebar).not.toHaveClass('collapsed');
  });

  test('renders ThemeSwitcher component', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  test('renders LangSwitcher component', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });
});
