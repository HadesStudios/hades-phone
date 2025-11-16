import React from 'react';
import { Grid, IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import Nui from '../../../util/Nui';
import { useAlert } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		marginBottom: 10,
		transition: 'all 0.2s ease',
		cursor: 'pointer',
		'&:hover': {
			background: theme.palette.secondary.light,
			transform: 'translateX(4px)',
		},
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	code: {
		borderRadius: 6,
		background: theme.palette.warning.main,
		padding: '4px 8px',
		marginRight: 8,
		fontSize: 13,
		fontWeight: 'bold',
		color: '#000',
	},
	detailRow: {
		padding: '4px 0',
		fontSize: 13,
		color: theme.palette.text.alt,
		display: 'flex',
		alignItems: 'center',
	},
	detailIcon: {
		marginRight: 8,
		fontSize: 14,
	},
	pinBtn: {
		background: theme.palette.primary.main,
		color: '#fff',
		'&:hover': {
			background: theme.palette.primary.dark,
		},
	},
}));

export default ({ alert }) => {
	const classes = useStyles();
	const showAlert = useAlert();

	const onClick = async () => {
		try {
			let res = await (await Nui.send('LEOPin', alert.location)).json();
			showAlert(res ? 'Location Pinned' : 'Unable to Pin Location');
		} catch (err) {
			console.log(err);
			showAlert('Unable to Pin Location');
		}
	};

	return (
		<div className={classes.wrapper}>
			<Grid container alignItems="center" spacing={1}>
				<Grid item xs={10}>
					<div className={classes.title}>
						<span className={classes.code}>{alert.code}</span>
						{alert.title}
					</div>
					{alert.location.street1 != null && (
						<div className={classes.detailRow}>
							<FontAwesomeIcon
								className={classes.detailIcon}
								icon={['fas', 'location-dot']}
							/>
							{alert.location.street1}, {alert.location.area}
						</div>
					)}
					<div className={classes.detailRow}>
						<FontAwesomeIcon
							className={classes.detailIcon}
							icon={['fas', 'clock']}
						/>
						<Moment date={alert.time} fromNow interval={60000} />
					</div>
				</Grid>
				<Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
					<IconButton onClick={onClick} className={classes.pinBtn} size="small">
						<FontAwesomeIcon icon={['fas', 'location-crosshairs']} />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
};
