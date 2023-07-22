import { render, screen } from '@testing-library/react';
import Button from './Button';
import { MouseEvent } from 'react';
import userEvent from '@testing-library/user-event';

test('renders Button component', () => {
	// Arrange
	render(
		<Button
			onClick={function (event: MouseEvent<HTMLButtonElement>): void {
				throw new Error('Function not implemented.');
			}}
		/>
	);

	// Act
	const button = screen.getByRole('button');

	// Assert
	expect(button).toBeInTheDocument();
});
test('renders Button component with handler prop called on click', async () => {
	// Arrange
	let text = '';

	const mockOnClick = jest.fn((event: MouseEvent<HTMLButtonElement>) => {
		text += event.currentTarget.value;
	});

	render(<Button onClick={mockOnClick} />);

	// Act
	await userEvent.click(screen.getByRole('button'));

	// Assert
	expect(mockOnClick).toHaveBeenCalledTimes(1);
	expect(text).toBe('Submit');
});
