import { useState } from 'react';
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

	const handleSubmit = () => {
		console.log('Species: ', species);
		console.log('Planet: ', planet);
		console.log('Beings: ', beings);
		console.log('Maths: ', maths);
		console.log('Reason: ', reason);
	};

	return (
		<section className='w12MForm'>
			<W12MHeader />
			<Species speciesName={species} onChangeUpdate={(e) => setSpecies(e.target.value)} />
			<Planet planetName={planet} onChangeUpdate={(e) => setPlanet(e.target.value)} />
			<Beings beingsNumber={beings} onChangeUpdate={(e) => setBeings(parseInt(e.target.value))} />
			<Maths maths={maths} onChangeUpdate={(e) => setMaths(e.target.value)} />
			<Reason reason={reason} onChangeUpdate={(e) => setReason(e.target.value)} />
			<Button onClick={handleSubmit} />
		</section>
	);
};

export default W12MForm;
