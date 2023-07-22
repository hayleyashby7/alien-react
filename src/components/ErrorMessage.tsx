interface ErrorMessageProps {
	message: string | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	return (
		<p role='alert' className='errorMessage'>
			{message}
		</p>
	);
};

export default ErrorMessage;
