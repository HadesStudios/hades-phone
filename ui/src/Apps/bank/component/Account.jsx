import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAccountName, getAccountType } from '../utils';

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
	},
	account: {
		width: '99.5%',
		margin: '0 auto 15px auto',
		padding: 20,
		position: 'relative',
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		overflow: 'hidden',
		'&:hover': {
			opacity: 0.9,
		},
	},
	accountHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 15,
	},
	accountTitle: {
		fontSize: 20,
		color: theme.palette.primary.main,
		fontWeight: '600',
		marginBottom: 8,
	},
	accountDetails: {
		flex: 1,
	},
	accountInfo: {
		fontSize: 13,
		color: '#888',
		marginBottom: 4,
	},
	accountBalance: {
		marginTop: 15,
		paddingTop: 15,
		borderTop: '1px solid #2a2a2d',
	},
	balanceLabel: {
		fontSize: 14,
		color: '#888',
		marginBottom: 6,
	},
	balanceAmount: {
		fontSize: 28,
		color: '#10b981',
		fontWeight: '700',
	},
	backIcon: {
		color: 'rgba(255, 255, 255, 0.05)',
		position: 'absolute',
		top: 10,
		right: 15,
		fontSize: 60,
	},
}));

export default ({ acc }) => {
	const classes = useStyles();
	const accountName = getAccountName(acc);
	const accountType = getAccountType(acc);

	return (
		<Link to={`/apps/bank/view/${acc.Account}`} className={classes.link}>
			<Paper className={classes.account} elevation={0}>
				<div className={classes.accountHeader}>
					<div className={classes.accountDetails}>
						<div className={classes.accountTitle}>{accountName}</div>
						<div className={classes.accountInfo}>Account Number: {acc.Account}</div>
						<div className={classes.accountInfo}>Account Type: {accountType}</div>
					</div>
				</div>
				<div className={classes.accountBalance}>
					<div className={classes.balanceLabel}>Balance:</div>
					<div className={classes.balanceAmount}>
						{acc.Permissions?.BALANCE ? `$${acc.Balance.toLocaleString('en-US')}` : '???'}
					</div>
				</div>
				{acc.Type === 'personal_savings' ? (
					<FontAwesomeIcon
						className={classes.backIcon}
						icon={['fas', 'piggy-bank']}
					/>
				) : (
					<FontAwesomeIcon
						className={classes.backIcon}
						icon={['fas', 'bank']}
					/>
				)}
			</Paper>
		</Link>
	);
};
