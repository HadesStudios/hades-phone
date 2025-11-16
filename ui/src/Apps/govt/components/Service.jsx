import React, { useState } from 'react';
import {
	Tooltip,
	IconButton,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CurrencyFormat } from '../../../util/Parser';

const useStyles = makeStyles((theme) => ({
	card: {
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		padding: 15,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		transition: 'all 0.2s ease',
		cursor: 'pointer',
		'&:hover': {
			background: theme.palette.secondary.light,
			transform: 'translateX(4px)',
		},
		'&.disabled': {
			opacity: 0.5,
			cursor: 'not-allowed',
		},
	},
	content: {
		flex: 1,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.palette.text.main,
		marginBottom: 4,
	},
	price: {
		fontSize: 14,
		color: theme.palette.success.main,
		fontWeight: 'bold',
	},
	purchaseBtn: {
		background: theme.palette.primary.main,
		color: '#fff',
		'&:hover': {
			background: theme.palette.primary.dark,
		},
		'&:disabled': {
			background: theme.palette.secondary.light,
			color: theme.palette.text.alt,
		},
	},
}));

export default ({ service, onSelect }) => {
	const classes = useStyles();

	return (
		<div className={`${classes.card} ${service.Disabled ? 'disabled' : ''}`}>
			<div className={classes.content}>
				<div className={classes.label}>{service.Label}</div>
				<div className={classes.price}>{CurrencyFormat.format(service.Price)}</div>
			</div>
			<Tooltip title={service.Disabled ? 'Not Available' : `Purchase ${service.Label}`}>
				<span>
					<IconButton 
						disabled={Boolean(service.Disabled)} 
						onClick={() => !service.Disabled && onSelect(service)}
						className={classes.purchaseBtn}
						size="small"
					>
						<FontAwesomeIcon icon={['fas', 'cart-shopping']} />
					</IconButton>
				</span>
			</Tooltip>
		</div>
	);
};
