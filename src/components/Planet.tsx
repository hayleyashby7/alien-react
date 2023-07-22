import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface PlanetProps {
	planetName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Planet: React.FC<PlanetProps> = ({ planetName, onChangeUpdate }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const validatePlanetName = (value: string): string | undefined => {
		return value.length === undefined
			? 'Planet Name is required'
			: value.length < 2
			? 'Planet Name must be at least 2 characters'
			: value.length > 49
			? 'Planet Name must be less than 49 characters'
			: value.match(/^[a-zA-Z0-9]+$/) === null
			? 'No special characters allowed'
			: undefined;
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const error = validatePlanetName(event.target.value);
		setErrorMessage(error);
		event.target.setCustomValidity(error || '');
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor='planetName'>Planet Name:</label>
				<input type='text' id='planetName' name='planet' value={planetName} onChange={onChange} />
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default Planet;
