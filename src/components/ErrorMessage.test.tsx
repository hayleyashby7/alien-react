import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders ErrorMessage component', () => {
	render(<ErrorMessage message='Error: test' />);
	const errorMessageElement = screen.getByText(/Error: test/i);
	expect(errorMessageElement).toBeInTheDocument();
});
