import { render, screen } from '@testing-library/react';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';

describe('Button', () => {
  test('renders with default props', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('renders with clear variant', () => {
    render(<Button variant={ButtonVariant.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
  });

  test('renders with custom className', () => {
    const className = 'custom-class';
    render(<Button className={className}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass(className);
  });

  test('calls onClick function when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>TEST</Button>);
    screen.getByText('TEST').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('passes other props to the button element', () => {
    const dataTestId = 'test-button';
    render(<Button data-testid={dataTestId}>TEST</Button>);
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
