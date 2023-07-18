interface PlanetProps {
	planetName: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Planet: React.FC<PlanetProps> = ({ planetName, onChangeUpdate }) => {
	return (
		<div className='formInput'>
			<label htmlFor='planetName'>Planet Name:</label>
			<input type='text' id='planetName' value={planetName} onChange={onChangeUpdate} />
		</div>
	);
};

export default Planet;
