interface ReasonProps {
	reason: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Reason: React.FC<ReasonProps> = ({ reason, onChangeUpdate }) => {
	return (
		<div className='formInput'>
			<label htmlFor='Reason'>Reason for sparing:</label>
			<textarea id='Reason' value={reason} onChange={onChangeUpdate} />
		</div>
	);
};

export default Reason;
