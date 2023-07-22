import Input from './Input';

interface SpeciesProps {
	speciesName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Species: React.FC<SpeciesProps> = ({ speciesName, onChangeUpdate }) => {
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

	return <Input name='species' value={speciesName} label='Species Name:' onChangeUpdate={onChangeUpdate} validateInput={validateSpeciesName} />;
};

export default Species;
