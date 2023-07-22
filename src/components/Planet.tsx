import Input from './Input';

interface PlanetProps {
	planetName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Planet: React.FC<PlanetProps> = ({ planetName, onChangeUpdate }) => {
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

	return <Input name='planet' value={planetName} label='Planet Name:' onChangeUpdate={onChangeUpdate} validateInput={validatePlanetName} />;
};

export default Planet;
