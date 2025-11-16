import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Alert, AppBar, Button, Grid, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import Nui from '../../util/Nui';
import { useAlert, useMyStates } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		height: '100%',
		background:
			'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7) ), url(https://preview.redd.it/b0nxku2svi581.png?width=1080&crop=smart&auto=webp&s=cb84e5228005c25a13b891baa6dd70ba89eb7f8c)',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	},
	content: {
		position: 'absolute',
		width: '80%',
		height: 'fit-content',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto',
		padding: 25,
		background: theme.palette.secondary.dark,
		borderRadius: 16,
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
	},
	alert: {
		backgroundColor: '#8E1467',
		marginBottom: 15,
		borderRadius: 8,
	},
	primary: {
		backgroundColor: '#8E1467',
		borderRadius: 10,
		padding: '12px 24px',
		fontSize: 16,
		fontWeight: 'bold',
		transition: 'all 0.2s ease',
		'&:hover': {
			backgroundColor: '#a01878',
			transform: 'translateY(-2px)',
			boxShadow: '0 4px 12px rgba(142, 20, 103, 0.4)',
		},
	},
	secondary: {
		borderRadius: 10,
		padding: '12px 24px',
		fontSize: 16,
		fontWeight: 'bold',
		borderWidth: 2,
		transition: 'all 0.2s ease',
		'&:hover': {
			transform: 'translateY(-2px)',
			borderWidth: 2,
		},
	},
	editorField: {
		marginBottom: 20,
		'& .MuiOutlinedInput-root': {
			borderRadius: 10,
		},
	},
	icon: {
		marginRight: 8,
	},
}));

export default (props) => {
	const classes = useStyles();
	const hasState = useMyStates();
	const showAlert = useAlert();

	const [target, setTarget] = useState('');

	const onChange = (e) => {
		setTarget(+e.target.value);
	};

	const onPing = async () => {
		try {
			let res = await (
				await Nui.send('PingEm:Send', {
					target,
					type: false,
				})
			).json();
			if (res) {
				showAlert('Sent Ping');
			} else showAlert('Unable To Send Ping');
		} catch (err) {
			showAlert('Unable To Send Ping');
		}
	};

	const onAnonPing = async () => {
		try {
			let res = await (
				await Nui.send('PingEm:Send', {
					target,
					type: true,
				})
			).json();
			if (res) {
				showAlert('Sent Ping');
			} else showAlert('Unable To Send Ping');
		} catch (err) {
			showAlert('Unable To Send Ping');
		}
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<NumberFormat
					fullWidth
					required
					label="Target State ID"
					name="target"
					className={classes.editorField}
					type="tel"
					isNumericString
					customInput={TextField}
					value={target}
					onChange={onChange}
				/>
				<Button
					fullWidth
					className={classes.primary}
					variant="contained"
					onClick={onPing}
				>
					Send Ping
				</Button>
				{hasState('PHONE_VPN') && (
					<Button
						style={{ marginTop: 15 }}
						fullWidth
						className={classes.secondary}
						variant="outlined"
						color="warning"
						onClick={onAnonPing}
					>
						<FontAwesomeIcon
							className={classes.icon}
							icon={['fas', 'user-secret']}
						/>
						Send Anonymous Ping
					</Button>
				)}
			</div>
		</div>
	);
};
