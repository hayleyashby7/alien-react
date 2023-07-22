import { render, screen } from '@testing-library/react';
import Reason from './Reason';
import { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Reason component', () => {
	// Arrange
	render(
		<Reason
			reason={''}
			onChangeUpdate={function (event: ChangeEvent<HTMLTextAreaElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Reason for sparing:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('');
});

test('renders Reason component with props', () => {
	// Arrange
	render(
		<Reason
			reason={'Here, for whatever reason, is the world. And here it stays. With me on it'}
			onChangeUpdate={function (event: ChangeEvent<HTMLTextAreaElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const label = screen.getByText(/Reason for sparing:/i);
	const input = screen.getByRole('textbox');

	// Assert
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveValue('Here, for whatever reason, is the world. And here it stays. With me on it');
});

test('renders Reason component with props and updates without error if reason is valid length', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLTextAreaElement>) => {
		text += event.target.value;
	});

	render(<Reason reason={'Here, for whatever reason, is the world. And here it stays. With me on i'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 't');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('Here, for whatever reason, is the world. And here it stays. With me on it');
	expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('renders Reason component with props and updates with error if reason too short', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLTextAreaElement>) => {
		text += event.target.value;
	});

	render(<Reason reason={'Her'} onChangeUpdate={mockOnChangeUpdate} />);

	// Act
	await userEvent.type(screen.getByRole('textbox'), 'e');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe('Here');
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Reason must be at least 17 characters');
});

test('renders Reason component with props and updates with error if reason too long', async () => {
	// Arrange
	let text = '';

	const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLTextAreaElement>) => {
		text += event.target.value;
	});

	render(
		<Reason
			reason={
				'Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it'
			}
			onChangeUpdate={mockOnChangeUpdate}
		/>
	);

	// Act
	await userEvent.type(screen.getByRole('textbox'), '.');

	// Assert
	expect(mockOnChangeUpdate).toHaveBeenCalledTimes(1);
	expect(text).toBe(
		'Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it. Here, for whatever reason, is the world. And here it stays. With me on it.'
	);
	expect(screen.getByRole('alert')).toBeInTheDocument();
	expect(screen.getByRole('alert')).toHaveTextContent('Reason must be less than 153 characters');
});
