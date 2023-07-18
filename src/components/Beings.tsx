import React from 'react';

interface BeingsProps {
	beingsNumber: number;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Beings: React.FC<BeingsProps> = ({ beingsNumber, onChangeUpdate }) => {
	return (
		<div className='formInput'>
			<label htmlFor='beingsNumber'>Number of beings:</label>
			<input type='number' id='beingsNumber' value={beingsNumber} onChange={onChangeUpdate} />
		</div>
	);
};

export default Beings;
