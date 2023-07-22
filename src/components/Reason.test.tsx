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

test('renders Reason component with props and updates', async () => {
    // Arrange
    let text = '';

    const mockOnChangeUpdate = jest.fn((event: ChangeEvent<HTMLTextAreaElement>) => {
        text += event.target.value;
    });

    render(<Reason reason={''} onChangeUpdate={mockOnChangeUpdate} />);

    // Act
    await userEvent.type(screen.getByRole('textbox'), 'Here, for whatever reason, is the world. And here it stays. With me on it');

    // Assert
    expect(mockOnChangeUpdate).toHaveBeenCalledTimes(73);
    expect(text).toBe('Here, for whatever reason, is the world. And here it stays. With me on it');
});
