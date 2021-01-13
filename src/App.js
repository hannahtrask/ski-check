import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/list.scss';

const App = () => {
	const url = 'http://localhost:4000/skis/guests';

	/* get all guests */
	const [allGuests, setAllGuests] = useState([]);

	const getGuests = () => {
		axios
			.get(url)
			.then((res) => {
				setAllGuests(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => getGuests(), []);

	/* create a new guest */
	const emptyGuest = {
		lastName: '',
		firstName: '',
		skiOrSnowboard: '',
		length: '',
		slot: '',
	};
	const [formData, setFormData] = useState(emptyGuest);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleCreate = (newGuest) => {
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newGuest),
		}).then(() => {
			getGuests();
		});
	};

	const handleSubmit = (e) => {
		handleCreate(formData);
	};

	console.log(allGuests);
	const guestDisplay = () => (
		<div className='client-container'>
			{allGuests &&
				allGuests.map((guest) => (
					<div className='client'>
						<div className='item' key={guest._id}>
							{guest.lastName}
						</div>
						<div className='item'>{guest.firstName}</div>
						<div className='item'>{guest.skiOrSnowboard}</div>
						<div className='item'>{guest['length']}</div>
						<div className='item' style={{ fontWeight: 'bold' }}>
							{guest.slot}
						</div>
					</div>
				))}
		</div>
	);

	const loading = <h1>loading guest list</h1>;

	return (
		<>
			<div className='container'>
				<h1>Ski Check</h1>
				<div className='form'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={handleChange}
							value={formData.lastName}
						/>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={handleChange}
							value={formData.firstName}
						/>
						<input
							type='text'
							name='skiOrSnowboard'
							placeholder='Brand'
							onChange={handleChange}
							value={formData.skiOrSnowboard}
						/>
						<input
							type='number'
							name='length'
							placeholder='Length (in cm)'
							onChange={handleChange}
							value={formData['length']}
						/>
						<input
							type='text'
							name='slot'
							placeholder='Slot'
							onChange={handleChange}
							value={formData.slot}
						/>
						<input type='submit' value='ADD GUEST' className='submit' />
					</form>
				</div>
				<div className='search'>
					<input type='text' className='search' placeholder='search...' />
				</div>
				<div className='list'>
					{allGuests.length > 0 ? guestDisplay() : loading}
				</div>
			</div>
		</>
	);
};

export default App;
