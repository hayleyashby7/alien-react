import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface MathsProps {
	maths: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Maths: React.FC<MathsProps> = ({ maths, onChangeUpdate }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	// Validate maths prop
	if (maths !== '4' && maths !== '') maths = 'Not 4';

	const validateMathsInput = (value: string): string | undefined => {
		return value.length === undefined || value === '' ? 'Answer is required' : value !== '4' ? '2 + 2 is 4' : undefined;
	};

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		const error = validateMathsInput(event.target.value);
		setErrorMessage(error);
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor='maths'>What is 2 + 2?</label>
				<select id='maths' value={maths} onChange={onChange}>
					<option value=''>Choose answer</option>
					<option value='4'>4</option>
					<option value='Not 4'>Not 4</option>
				</select>
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default Maths;
