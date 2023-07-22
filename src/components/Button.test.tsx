import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button component', () => {
	// Arrange
	render(<Button />);

	// Act
	const button = screen.getByRole('button');

	// Assert
	expect(button).toBeInTheDocument();
});
