interface SpeciesProps {
	speciesName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Species: React.FC<SpeciesProps> = ({ speciesName, onChangeUpdate}) => {
	return (
		<div className='formInput'>
			<label htmlFor='speciesName'>Species Name:</label>
			<input type='text' id='speciesName' value={speciesName} onChange={onChangeUpdate} />
		</div>
	);
};

export default Species;
