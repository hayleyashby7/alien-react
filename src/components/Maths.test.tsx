import { render, screen } from '@testing-library/react';
import Maths from './Maths';
import { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Maths component', () => {
	// Arrange
	render(
		<Maths
			maths=''
			onChangeUpdate={function (event: ChangeEvent<HTMLSelectElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/What is 2 \+ 2\?/i);
	const select = screen.getByRole('combobox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(select).toBeInTheDocument();
	expect(select).toHaveValue('');
});

test('renders Maths component with valid props', () => {
	// Arrange
	render(
		<Maths
			maths='4'
			onChangeUpdate={function (event: ChangeEvent<HTMLSelectElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/What is 2 \+ 2\?/i);
	const select = screen.getByRole('combobox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(select).toBeInTheDocument();
	expect(select).toHaveValue('4');
});

test('renders Maths component appropriately with invalid props', () => {
	// Arrange
	render(
		<Maths
			maths='8'
			onChangeUpdate={function (event: ChangeEvent<HTMLSelectElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/What is 2 \+ 2\?/i);
	const select = screen.getByRole('combobox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(select).toBeInTheDocument();
	expect(select).toHaveValue('Not 4');
});

test('renders Maths component with props and updates without error if 4 selected', async () => {
	// Arrange
	let option = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLSelectElement>) => {
		option += event.target.value;
	});

	render(<Maths maths='' onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.selectOptions(screen.getByRole('combobox'), '4');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(option).toBe('4');
	expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('renders Maths component with props and updates with error if 4 is not selected', async () => {
	// Arrange
	let option = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLSelectElement>) => {
		option += event.target.value;
	});

	render(<Maths maths='' onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.selectOptions(screen.getByRole('combobox'), 'Not 4');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(option).toBe('Not 4');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('2 + 2 is 4');
});

test('renders Maths component with props and updates with error if no option is selected', async () => {
	// Arrange
	let option = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLSelectElement>) => {
		option += event.target.value;
	});

	render(<Maths maths='' onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.selectOptions(screen.getByRole('combobox'), '');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(option).toBe('');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Answer is required');
});
