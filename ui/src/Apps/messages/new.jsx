import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	TextField,
	Avatar,
	Grid,
	InputAdornment,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InputMask from 'react-input-mask';

import { useAlert } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		height: '100%',
		background: theme.palette.secondary.main,
		overflow: 'hidden',
	},
	newNumber: {
		padding: '20px',
		backgroundColor: theme.palette.secondary.dark,
	},
	searchField: {
		width: '100%',
		'& .MuiOutlinedInput-root': {
			borderRadius: 12,
			backgroundColor: theme.palette.secondary.light,
		},
	},
	divider: {
		display: 'flex',
		alignItems: 'center',
		padding: '15px 20px',
		gap: 10,
		'&::before, &::after': {
			content: '""',
			flex: 1,
			height: 1,
			backgroundColor: theme.palette.primary.main,
		},
	},
	dividerText: {
		color: theme.palette.primary.main,
		fontSize: 14,
		fontWeight: 'bold',
	},
	contactsList: {
		height: 'calc(100% - 90px)',
		padding: '0 20px 20px 20px',
		overflow: 'hidden',
	},
	contactWrapper: {
		width: '100%',
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center',
		gap: 12,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.9,
			transform: 'translateX(5px)',
		},
	},
	avatar: {
		color: '#fff',
		height: 50,
		width: 50,
		fontSize: 20,
		fontWeight: 'bold',
	},
	avatarFav: {
		color: '#fff',
		height: 50,
		width: 50,
		fontSize: 20,
		fontWeight: 'bold',
		border: '3px solid #fbbf24',
		boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)',
	},
	contactData: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffffff',
	},
	number: {
		fontSize: 14,
		color: '#888',
	},
	noContacts: {
		width: '100%',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.palette.error.main,
	},
	contactsFilter: {
		marginBottom: 15,
	},
	contactsBody: {
		height: 'calc(100% - 70px)',
		overflowY: 'auto',
		overflowX: 'hidden',
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#ffffff52',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: theme.palette.primary.main,
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
	},
}));

export default (props) => {
	const showAlert = useAlert();
	const history = useHistory();
	const contacts = useSelector((state) => state.data.data.contacts);
	const classes = useStyles();

	const [filteredContacts, setFilteredContacts] = useState(contacts);
	const [rawNumber, setRawNumber] = useState('');
	const [searchVal, setSearchVal] = useState('');

	useEffect(() => {
		setFilteredContacts(
			contacts.filter((c) =>
				c.name.toUpperCase().includes(searchVal.toUpperCase()),
			),
		);
	}, [searchVal]);

	const onSearchChange = (e) => {
		setSearchVal(e.target.value);
	};

	const onRawChange = (e) => {
		setRawNumber(e.target.value);
	};

	const onContactClick = (contact) => {
		history.push(`/apps/messages/convo/${contact.number}`);
	};

	const sendMessageToRaw = () => {
		let r = /([0-9]){3}\-([0-9]){3}\-([0-9]){4}/gm.exec(rawNumber);

		if (r != null) {
			history.push(`/apps/messages/convo/${rawNumber}`);
		} else {
			showAlert('Not A Valid Number');
		}
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.newNumber}>
				<InputMask
					mask="999-999-9999"
					value={rawNumber}
					onChange={onRawChange}
				>
					{() => (
						<TextField
							className={classes.searchField}
							label="Enter Number"
							name="number"
							type="text"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={sendMessageToRaw}
										>
											<FontAwesomeIcon
												icon={[
													'fas',
													'paper-plane-top',
												]}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
							InputLabelProps={{
								style: { fontSize: 16 },
							}}
						/>
					)}
				</InputMask>
			</div>
			<div className={classes.divider}>
				<span className={classes.dividerText}>OR</span>
			</div>
			<div className={classes.contactsList}>
				{contacts.length > 0 ? (
					<div style={{ height: '100%' }}>
						<div className={classes.contactsFilter}>
							<TextField
								className={classes.searchField}
								label="Search Contacts"
								name="number"
								type="text"
								variant="outlined"
								value={searchVal}
								onChange={onSearchChange}
								style={{ marginTop: 5 }}
								InputLabelProps={{
									style: { fontSize: 16 },
								}}
							/>
						</div>
						<div className={classes.contactsBody}>
							{filteredContacts
								.filter((c) => c.favorite)
								.sort((a, b) => {
									if (
										a.name.toLowerCase() >
										b.name.toLowerCase()
									)
										return 1;
									else if (
										b.name.toLowerCase() >
										a.name.toLowerCase()
									)
										return -1;
									else return 0;
								})
								.map((contact) => {
									return (
										<div
											key={contact._id}
											className={classes.contactWrapper}
											onClick={() =>
												onContactClick(contact)
											}
										>
											{contact.avatar != null &&
											contact.avatar !== '' ? (
												<Avatar
													className={
														classes.avatarFav
													}
													src={contact.avatar}
													alt={contact.name.charAt(
														0,
													)}
												/>
											) : (
												<Avatar
													className={
														classes.avatarFav
													}
													style={{
														background:
															contact.color,
													}}
												>
													{contact.name.charAt(0)}
												</Avatar>
											)}
											<div
												className={
													classes.contactData
												}
											>
												<div
													className={classes.name}
												>
													{contact.name}
												</div>
												<div
													className={
														classes.number
													}
												>
													{contact.number}
												</div>
											</div>
										</div>
									);
								})}
							{filteredContacts
								.filter((c) => !c.favorite)
								.sort((a, b) => {
									if (a.name > b.name) return 1;
									else if (b.name > a.name) return -1;
									else return 0;
								})
								.map((contact) => {
									return (
										<div
											key={contact._id}
											className={classes.contactWrapper}
											onClick={() =>
												onContactClick(contact)
											}
										>
											{contact.avatar != null &&
											contact.avatar !== '' ? (
												<Avatar
													className={
														classes.avatar
													}
													src={contact.avatar}
													alt={contact.name.charAt(
														0,
													)}
												/>
											) : (
												<Avatar
													className={
														classes.avatar
													}
													style={{
														background:
															contact.color,
													}}
												>
													{contact.name.charAt(0)}
												</Avatar>
											)}
											<div
												className={
													classes.contactData
												}
											>
												<div
													className={classes.name}
												>
													{contact.name}
												</div>
												<div
													className={
														classes.number
													}
												>
													{contact.number}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				) : (
					<div className={classes.noContacts}>
						You Have No Contacts
					</div>
				)}
			</div>
		</div>
	);
};
