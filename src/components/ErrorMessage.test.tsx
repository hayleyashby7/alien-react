import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders ErrorMessage component with message prop', () => {
	// Arrange
	render(<ErrorMessage message='Error: test' />);

	// Act
	const errorMessageElement = screen.getByRole('alert');

	// Assert
	expect(errorMessageElement).toBeInTheDocument();
	expect(errorMessageElement).toHaveTextContent('Error: test');
});

test('renders ErrorMessage component with undefined message prop', () => {
	//Arrange
	render(<ErrorMessage message={undefined} />);

	// Act
	const errorMessageElement = screen.getByRole('alert');

	// Assert
	expect(errorMessageElement).toBeInTheDocument();
	expect(errorMessageElement).toHaveTextContent('');
});
