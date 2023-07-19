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

test('renders Beings component with props and updates', async () => {
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
});
