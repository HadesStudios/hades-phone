import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../../util/Nui';
import { useAlert } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 8,
		'&:not(:last-of-type)': {
			marginBottom: 15,
		},
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 10,
	},
	icon: {
		width: 50,
		height: 50,
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
		fontSize: 24,
		color: '#ffffff',
	},
	title: {
		fontSize: 18,
		color: '#ffffff',
		fontWeight: 'bold',
		marginBottom: 2,
	},
	pay: {
		fontSize: 14,
		color: theme.palette.success.main,
		fontWeight: '500',
	},
	description: {
		fontSize: 13,
		color: theme.palette.text.alt,
		fontStyle: 'italic',
		marginBottom: 12,
		lineHeight: 1.4,
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	workers: {
		fontSize: 13,
		color: theme.palette.text.alt,
	},
	duty: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#ffffff',
	},
	startButton: {
		width: '100%',
		padding: '12px',
		borderRadius: 6,
		fontSize: 15,
		fontWeight: 'bold',
		textTransform: 'none',
		backgroundColor: theme.palette.success.main,
		color: '#ffffff',
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
		'&:disabled': {
			backgroundColor: theme.palette.secondary.light,
			color: theme.palette.text.alt,
		},
	},
	quitButton: {
		width: '100%',
		padding: '12px',
		borderRadius: 6,
		fontSize: 15,
		fontWeight: 'bold',
		textTransform: 'none',
		backgroundColor: theme.palette.error.main,
		color: '#ffffff',
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
	},
}));

export default ({ job, myGroup, disabled }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const showAlert = useAlert();
	const player = useSelector((state) => state.data.data.player);

	const onStart = async () => {
		try {
			let res = await (
				await Nui.send('StartLaborJob', {
					job: job.Id,
					isWorkgroup: Boolean(myGroup),
				})
			).json();
			if (res) {
				showAlert(`Started ${job.Name}`);
			} else showAlert('Unable to Start Job');
		} catch (err) {
			console.log(err);
			showAlert('Unable to Start Job');
		}
	};

	const onQuit = async () => {
		try {
			let res = await (await Nui.send('QuitLaborJob', job.Id)).json();
			if (res) {
				showAlert(`Quit ${job.Name}`);
			} else showAlert('Unable to Quit Job');
		} catch (err) {
			console.log(err);
			showAlert('Unable to Quit Job');
		}
	};

	const getJobIcon = () => {
		const jobId = job.Id?.toLowerCase();
		switch (jobId) {
			case 'mining':
				return ['fas', 'gem'];
			case 'hunting':
				return ['fas', 'crosshairs'];
			case 'fishing':
			case 'garbage':
				return ['fas', 'dumpster'];
			case 'farming':
				return ['fas', 'tractor'];
			case 'salvaging':
				return ['fas', 'wrench'];
			case 'house robbery':
			case 'house_robbery':
				return ['fas', 'user-secret'];
			case 'oxy':
			case 'trucking':
				return ['fas', 'truck'];
			case 'weed':
				return ['fas', 'cannabis'];
			case 'coke':
			case 'cocaine':
				return ['fas', 'prescription-bottle'];
		default:
			return ['fas', 'briefcase'];
	}
};

const getJobColor = () => {
	const jobId = job.Id?.toLowerCase();
	switch (jobId) {
		case 'mining':
			return '#16a34a';
		case 'hunting':
			return '#dc2626';
		case 'fishing':
			return '#0891b2';
		case 'garbage':
			return '#6b7280';
		case 'farming':
			return '#16a34a';
		case 'salvaging':
			return '#ea580c';
		case 'house robbery':
		case 'house_robbery':
			return '#7c3aed';
		case 'oxy':
			return '#0ea5e9';
		case 'trucking':
			return '#f59e0b';
		case 'weed':
			return '#22c55e';
		case 'coke':
		case 'cocaine':
			return '#ef4444';
		default:
			return '#6b7280';
	}
};

	const isOnDuty = job.OnDuty.filter((p) => p.Joiner == player.Source).length > 0 ||
		(Boolean(myGroup) && job.OnDuty.filter((p) => p.Joiner == myGroup.Creator.ID).length > 0);

	return (
		<Paper className={classes.wrapper}>
			<div className={classes.header}>
				<div className={classes.icon} style={{ backgroundColor: getJobColor() }}>
					<FontAwesomeIcon icon={getJobIcon()} />
				</div>
				<div>
					<div className={classes.title}>{job.Name}</div>
					{job.Salary > 0 && (
						<div className={classes.pay}>${job.Salary.toLocaleString()}</div>
					)}
				</div>
			</div>
			
			{job.Description && (
				<div className={classes.description}>{job.Description}</div>
			)}
			
			<div className={classes.footer}>
				<span className={classes.workers}>Workers</span>
				<span className={classes.duty}>
					{job.Limit == 0 ? job.OnDuty.length : `${job.OnDuty.length} / ${job.Limit}`}
				</span>
			</div>
			
			{isOnDuty ? (
				<Button
					variant="contained"
					className={classes.quitButton}
					disabled={
						(Boolean(myGroup) && myGroup.Creator.ID != player.Source) ||
						disabled
					}
					onClick={onQuit}
				>
					Quit
				</Button>
			) : (
				<Button
					variant="contained"
					className={classes.startButton}
					disabled={
						(Boolean(myGroup) && myGroup.Creator.ID != player.Source) ||
						Boolean(player.TempJob) ||
						disabled
					}
					onClick={onStart}
				>
					Start
				</Button>
			)}
		</Paper>
	);
};
