import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 8,
		'&:not(:last-of-type)': {
			marginBottom: 15,
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftSection: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},
	icon: {
		fontSize: 24,
		color: '#f59e0b',
		marginRight: 12,
	},
	title: {
		fontSize: 18,
		color: theme.palette.primary.main,
		fontWeight: 'bold',
	},
	memberCount: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#ffffff',
		marginRight: 15,
	},
	joinButton: {
		padding: '8px 20px',
		borderRadius: 6,
		fontSize: 14,
		fontWeight: 'bold',
		textTransform: 'none',
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
		'&:disabled': {
			backgroundColor: theme.palette.secondary.light,
			color: theme.palette.text.alt,
		},
	},
}));

export default ({ group, isInGroup, onJoin, disabled }) => {
	const classes = useStyles();
	const player = useSelector((state) => state.data.data.player);

	return (
		<Paper className={classes.wrapper}>
			<div className={classes.leftSection}>
				<FontAwesomeIcon className={classes.icon} icon={['fas', 'crown']} />
				<div className={classes.title}>
					{group.Creator.First} {group.Creator.Last}
				</div>
			</div>
			<div className={classes.memberCount}>
				{group.Members.length + 1} / 5
			</div>
			<Button
				variant="contained"
				className={classes.joinButton}
				disabled={
					isInGroup ||
					group.Members.length >= 4 ||
					disabled ||
					group.Working ||
					Boolean(player.TempJob)
				}
				onClick={() => onJoin(group)}
			>
				JOIN
			</Button>
		</Paper>
	);
};
