import { screen, fireEvent } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('renders without error', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('does not have "collapsed" class by default', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });

  test('toggles "collapsed" class when button is clicked', () => {
    renderWithTranslation(<Sidebar />);
    const sidebar = screen.getByTestId('sidebar');
    const button = screen.getByText('TOGGLE');
    fireEvent.click(button);
    expect(sidebar).toHaveClass('collapsed');
    fireEvent.click(button);
    expect(sidebar).not.toHaveClass('collapsed');
  });

  test('renders ThemeSwitcher component', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  test('renders LangSwitcher component', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });
});
