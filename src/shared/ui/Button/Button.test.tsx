import { render, screen } from '@testing-library/react';
import { Button, VariantButton } from 'shared/ui/Button/Button';

describe('Button', () => {
  test('test render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
  test('test clear variant', () => {
    render(<Button variant={VariantButton.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
});
