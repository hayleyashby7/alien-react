import { render, screen } from '@testing-library/react';
import Species from './Species';
import { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Species component', () => {
	// Arrange
	render(
		<Species
			speciesName={''}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Species Name:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('');
});

test('renders Species component with props', () => {
	// Arrange
	render(
		<Species
			speciesName={'Human'}
			onChangeUpdate={function (event: ChangeEvent<HTMLInputElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Species Name:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('Human');
});

test('renders Species component with props and updates without error if valid species name', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Species speciesName={'Huma'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'n');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('Human');
	expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('renders Species component with props and updates with error if too few characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Species speciesName={''} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'H');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('H');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Species Name must be at least 3 characters');
});

test('renders Species component with props and updates with error if too many characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Species speciesName={'abcdefghijklmnopqrstuvwxy'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'z');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('abcdefghijklmnopqrstuvwxyz');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Species Name must be less than 23 characters');
});

test('renders Species component with props and updates with error if invalid characters', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Species speciesName={'Human'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), '1');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('Human1');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('No numbers or special characters allowed');
});
