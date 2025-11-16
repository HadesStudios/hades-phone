import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../../util/Nui';
import { useAlert } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 20,
		background: theme.palette.secondary.dark,
		borderRadius: 8,
		'&:not(:last-of-type)': {
			marginBottom: 20,
		},
	},
	title: {
		fontSize: 20,
		color: theme.palette.primary.main,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 15,
	},
	progressSection: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 15,
	},
	progressLabel: {
		fontSize: 14,
		color: '#ffffff',
		fontWeight: '500',
		minWidth: 70,
		textAlign: 'center',
	},
	progressBarContainer: {
		flex: 1,
		height: 8,
		backgroundColor: theme.palette.secondary.light,
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressBar: {
		height: '100%',
		backgroundColor: theme.palette.primary.main,
		transition: 'width 0.3s ease',
	},
}));

export default ({ rep, myGroup, disabled }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const showAlert = useAlert();

    const normalise = (value = 500) => {
        const min = rep?.current?.value ?? 0;
        const max = rep?.next?.value ?? 1000;
        return ((value - min) * 100) / (max - min);
    };

	return (
		<Paper className={classes.wrapper}>
			<div className={classes.title}>{rep.label}</div>
			<div className={classes.progressSection}>
				<div className={classes.progressLabel}>
					{rep.current?.label ?? 'No Rank'}
				</div>
				<div className={classes.progressBarContainer}>
					<div 
						className={classes.progressBar} 
						style={{ width: `${normalise(rep.value)}%` }}
					/>
				</div>
				<div className={classes.progressLabel}>
					{rep.next?.label ?? 'Max Rank'}
				</div>
			</div>
		</Paper>
	);
};
