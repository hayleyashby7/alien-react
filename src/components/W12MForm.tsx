import { FormEvent, useState } from 'react';
import W12MHeader from './W12MHeader';
import Species from './Species';
import Planet from './Planet';
import Beings from './Beings';
import Maths from './Maths';
import Reason from './Reason';
import Button from './Button';

const W12MForm = () => {
	const [species, setSpecies] = useState('');
	const [planet, setPlanet] = useState('');
	const [beings, setBeings] = useState(0);
	const [maths, setMaths] = useState('');
	const [reason, setReason] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
	};

	return (
		<form className='w12MForm' onSubmit={handleSubmit}>
			<W12MHeader />
			<Species speciesName={species} onChangeUpdate={(e) => setSpecies(e.target.value)} />
			<Planet planetName={planet} onChangeUpdate={(e) => setPlanet(e.target.value)} />
			<Beings beingsNumber={beings} onChangeUpdate={(e) => setBeings(parseInt(e.target.value))} />
			<Maths maths={maths} onChangeUpdate={(e) => setMaths(e.target.value)} />
			<Reason reason={reason} onChangeUpdate={(e) => setReason(e.target.value)} />
			<Button />
		</form>
	);
};

export default W12MForm;
