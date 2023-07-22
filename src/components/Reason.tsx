import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface ReasonProps {
	reason: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Reason: React.FC<ReasonProps> = ({ reason, onChangeUpdate }) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	const validateReason = (value: string): string | undefined => {
		return value.length === undefined
			? 'Reason is required'
			: value.length < 17
			? 'Reason must be at least 17 characters'
			: value.length > 153
			? 'Reason must be less than 153 characters'
			: undefined;
	};

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const error = validateReason(event.target.value);
		setErrorMessage(error);
		onChangeUpdate(event);
	};

	return (
		<>
			<div className='formInput'>
				<label htmlFor='Reason'>Reason for sparing:</label>
				<textarea id='Reason' name='reason' value={reason} onChange={onChange} />
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default Reason;
