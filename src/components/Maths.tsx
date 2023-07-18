interface MathsProps {
	maths: string;
	onChangeUpdate: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Maths: React.FC<MathsProps> = ({ maths, onChangeUpdate }) => {
	return (
		<div className='formInput'>
			<label htmlFor='maths'>What is 2 + 2?</label>
			<select id='maths' value={maths} onChange={onChangeUpdate}>
				<option value='4'>4</option>
				<option value='Not 4'>Not 4</option>
			</select>
		</div>
	);
};

export default Maths;
