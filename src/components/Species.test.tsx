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

test('renders Species component with props and updates', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
		text += event.target.value;
	});

	render(<Species speciesName={''} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'Human');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(5);
	expect(text).toBe('Human');
});
