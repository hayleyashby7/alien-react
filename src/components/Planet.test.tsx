import { render, screen } from '@testing-library/react';
import Planet from './Planet';
import { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Planet component', () => {
	// Arrange
	render(
		<Planet
			planetName={''}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Planet Name:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('');
});

test('renders Planet component with props', () => {
	// Arrange
	render(
		<Planet
			planetName={'Earth'}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Planet Name:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('Earth');
});

test('renders Planet component with props and updates', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Planet planetName={''} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'Earth');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(5);
	expect(text).toBe('Earth');
});

test('renders Planet component with props and updates with error if too few characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Planet planetName={''} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'E');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('E');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Planet Name must be at least 2 characters');
});

test('renders Planet component with props and updates with error if too many characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Planet planetName={'abcdefghijklmnopqrstuvwxyz1234567891011121314151617'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'E');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('abcdefghijklmnopqrstuvwxyz1234567891011121314151617E');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Planet Name must be less than 49 characters');
});

test('renders Planet component with props and updates with error if special characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Planet planetName={'Earth'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), '!');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('Earth!');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('No special characters allowed');
});
