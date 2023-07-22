import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface SpeciesProps {
	speciesName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Species: React.FC<SpeciesProps> = ({ speciesName, onChangeUpdate }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const validateSpeciesName = (value: string): string | undefined => {
		return value.length === undefined
			? 'Species Name is required'
			: value.length < 3
			? 'Species Name must be at least 3 characters'
			: value.length > 23
			? 'Species Name must be less than 23 characters'
			: value.match(/^[a-zA-Z]+$/) === null
			? 'No numbers or special characters allowed'
			: undefined;
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const error = validateSpeciesName(event.target.value);
		setErrorMessage(error);
		event.target.setCustomValidity(error || '');
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor='speciesName'>Species Name:</label>
				<input type='text' id='speciesName' name='species' value={speciesName} onChange={onChange} />
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default Species;
