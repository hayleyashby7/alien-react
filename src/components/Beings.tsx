import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface BeingsProps {
	beingsNumber: number;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Beings: React.FC<BeingsProps> = ({ beingsNumber, onChangeUpdate }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const validateBeingsNumber = (value: string): string | undefined => {
		return value.length === undefined
			? 'Total number of beings is required'
			: value.match(/^[0-9]+$/) === null
			? 'Only numbers allowed'
			: value.length < 9
			? 'Must be at least 1,000,000,000 beings'
			: undefined;
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const error = validateBeingsNumber(event.target.value);
		setErrorMessage(error);
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor='beingsNumber'>Number of beings:</label>
				<input type='number' id='beingsNumber' value={beingsNumber} onChange={onChange} />
			</div>
			<ErrorMessage message={errorMessage} />
		</>
	);
};

export default Beings;
