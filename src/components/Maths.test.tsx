import { render, screen } from '@testing-library/react';
import Maths from './Maths';
import { ChangeEvent } from 'react';

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