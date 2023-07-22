import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface InputProps {
	name: string;
	value: string | number;
	label: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
	validateInput: (value: string) => string | undefined;
}

const Input: React.FC<InputProps> = ({ name, value, label, onChangeUpdate, validateInput }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [inputType, setInputType] = useState(typeof value === 'number' ? 'number' : 'text');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const error = validateInput(event.target.value);
		setErrorMessage(error);
		event.target.setCustomValidity(error || '');
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor={name}>{label}</label>
				<input type={inputType} id={name} name={name} value={value} onChange={onChange} />
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default Input;
