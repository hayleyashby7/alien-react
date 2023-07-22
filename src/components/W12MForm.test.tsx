import { render, screen } from '@testing-library/react';
import W12MForm from './W12MForm';
import userEvent from '@testing-library/user-event';

test('renders W12MForm component', () => {
	// Arrange
	render(<W12MForm />);

	// Act
	const header = screen.getByText(/Each species may only submit ONE W-12-M form./i);
	const speciesLabel = screen.getByText(/Species Name:/i);
	const speciesInput = screen.getByRole('textbox', { name: /species name/i });
	const planetLabel = screen.getByText(/Planet Name:/i);
	const planetInput = screen.getByRole('textbox', { name: /planet/i });
	const beingsLabel = screen.getByText(/Number of beings:/i);
	const beingsInput = screen.getByRole('spinbutton', { name: /number of beings/i });
	const mathsLabel = screen.getByText(/What is 2 \+ 2\?/i);
	const mathsInput = screen.getByRole('combobox');
	const reasonLabel = screen.getByText(/Reason for sparing:/i);
	const reasonInput = screen.getByRole('textbox', { name: /reason for sparing/i });
	const button = screen.getByRole('button', { name: /submit/i });

	// Assert
	expect(header).toBeInTheDocument();
	expect(speciesLabel).toBeInTheDocument();
	expect(speciesInput).toBeInTheDocument();
	expect(planetLabel).toBeInTheDocument();
	expect(planetInput).toBeInTheDocument();
	expect(beingsLabel).toBeInTheDocument();
	expect(beingsInput).toBeInTheDocument();
	expect(mathsLabel).toBeInTheDocument();
	expect(mathsInput).toBeInTheDocument();
	expect(reasonLabel).toBeInTheDocument();
	expect(reasonInput).toBeInTheDocument();
	expect(button).toBeInTheDocument();
});

test('correct data submitted by W12MForm', async () => {
	// Arrange
	render(<W12MForm />);
	const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

	// Act
	await userEvent.type(screen.getByRole('textbox', { name: /species name/i }), 'Human');
	await userEvent.type(screen.getByRole('textbox', { name: /planet/i }), 'Earth');
	await userEvent.type(screen.getByRole('spinbutton', { name: /number of beings/i }), '1000000000');
	await userEvent.selectOptions(screen.getByRole('combobox'), '4');
	await userEvent.type(screen.getByRole('textbox', { name: /reason for sparing/i }), 'I am human and I want to live');
	await userEvent.click(screen.getByRole('button', { name: /submit/i }));

	// Assert
	expect(consoleSpy).toHaveBeenCalledTimes(1);
	expect(consoleSpy).toHaveBeenCalledWith({
		species: 'Human',
		planet: 'Earth',
		beings: '1000000000',
		maths: '4',
		reason: 'I am human and I want to live',
	});
});
