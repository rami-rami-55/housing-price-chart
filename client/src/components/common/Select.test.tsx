import { render, screen } from '@testing-library/react';
import { CustomSelect } from './Select';

describe('CustomSelect', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  test('renders with placeholder', () => {
    render(<CustomSelect placeholder="Test Placeholder" options={mockOptions} />);
    expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<CustomSelect placeholder="Test Placeholder" options={mockOptions} />);
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });
});