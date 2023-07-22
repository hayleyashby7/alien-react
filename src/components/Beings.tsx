import Input from './Input';

interface BeingsProps {
	beingsNumber: number;
	onChangeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Beings: React.FC<BeingsProps> = ({ beingsNumber, onChangeUpdate }) => {
	const validateBeingsNumber = (value: string): string | undefined => {
		return value.length === undefined
			? 'Total number of beings is required'
			: value.match(/^[0-9]+$/) === null
			? 'Only numbers allowed'
			: value.length < 9
			? 'Must be at least 1,000,000,000 beings'
			: undefined;
	};

	return <Input name='beings' value={beingsNumber} label='Total Number of Beings:' onChangeUpdate={onChangeUpdate} validateInput={validateBeingsNumber} />;
};

export default Beings;
