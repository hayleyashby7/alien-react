import { render, screen } from '@testing-library/react';
import Beings from './Beings';
import { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Beings component', () => {
	// Arrange
	render(
		<Beings
			beingsNumber={0}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Number of beings:/i);
	const input = screen.getByRole('spinbutton');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue(0);
});

test('renders Beings component with props', () => {
	// Arrange
	render(
		<Beings
			beingsNumber={100}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Number of beings:/i);
	const input = screen.getByRole('spinbutton');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue(100);
});

test('renders Beings component with props and updates without error if valid number', async () => {
	// Arrange
	let number = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		number += event.target.value;
	});

	render(<Beings beingsNumber={1000000000} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('spinbutton'), '8');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(number).toBe('10000000008');
	expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('renders Beings component with props and updates with error if number too low', async () => {
	// Arrange
	let number = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		number += event.target.value;
	});

	render(<Beings beingsNumber={0} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('spinbutton'), '8');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(number).toBe('8');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Must be at least 1,000,000,000 beings');
});

test('renders Beings component with props and updates with error if non-number value entered', async () => {
	// Arrange
	let number = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		number += event.target.value;
	});

	render(<Beings beingsNumber={100000000000} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('spinbutton'), 'undefinedproblematicentry');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalled();
	expect(number).toBe('');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Only numbers allowed');
});
