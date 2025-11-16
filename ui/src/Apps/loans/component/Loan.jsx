import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import { getLoanTypeName, getActualRemainingAmount, getNextPaymentAmount } from '../utils';

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
	},
	account: {
		width: '100%',
		padding: 20,
        marginBottom: 15,
		position: 'relative',
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.9,
			transform: 'translateY(-2px)',
		},
	},
    defaultedAccount: {
        borderLeft: `4px solid ${theme.palette.error.main}`,
    },
	missedLastPayment: {
		borderLeft: `4px solid ${theme.palette.warning.main}`,
	},
	accountDetails: {
		marginBottom: 15,
		paddingBottom: 15,
		borderBottom: `1px solid ${theme.palette.border.divider}`,
	},
	loanTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 12,
	},
	loanInfo: {
		display: 'flex',
		flexDirection: 'column',
		gap: 6,
		'& > div': {
			display: 'flex',
			justifyContent: 'space-between',
			fontSize: 14,
		},
	},
	label: {
		color: '#888',
	},
	value: {
		color: '#ffffff',
		fontWeight: '500',
	},
	accountBalance: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	remainingLabel: {
		fontSize: 14,
		color: '#888',
	},
	remainingAmount: {
		fontSize: 24,
		fontWeight: 'bold',
		color: theme.palette.success.main,
	},

	backIcon: {
		color: 'rgba(48, 81, 140, 0.15)',
		position: 'absolute',
		top: 15,
		right: 15,
		fontSize: 60,
	},
	warning: {
		backgroundColor: 'rgba(251, 191, 36, 0.1)',
		border: '1px solid #fbbf24',
		borderRadius: 8,
		padding: 10,
		marginTop: 10,
		color: '#fbbf24',
		fontSize: 13,
		fontWeight: '500',
	},
	cancelButton: {
		position: 'absolute',
		marginLeft: '5%',
		bottom: '5%',
		color: theme.palette.error.main,
	},
}));

export default ({ loan }) => {
	const classes = useStyles();
	const loanRemainingAmount = getActualRemainingAmount(loan);
	const loanRemainingPayments = loan.TotalPayments - loan.PaidPayments

	const getNextDuePayment = () => {
		if (loan.NextPayment) {
			return <Moment unix date={loan.NextPayment} calendar />;
		} else {
			return 'No Due Payments';
		}
	}

	const getWarning = () => {
		if (loan.Defaulted) {
			return 'This loan has been defaulted because you missed too many payments.';
		} else if (loan.MissedPayments > 0) {
			if (loan.MissedPayments > 1) {
				return `You missed the last ${loan.MissedPayments} payments for this loan.`;
			} else {
				return 'You missed the last payment for this loan.';
			}
		} else {
			return false;
		}
	}

	return (
		<Link to={`/apps/loans/view/${loan._id}`} className={classes.link}>
			<Paper className={`${classes.account} ${(loan.Defaulted || (loan.MissablePayments > 1 && loan.MissedPayments >= (loan.MissablePayments - 1))) ? classes.defaultedAccount : (loan.MissedPayments > 0 && classes.missedLastPayment)}`}>
				<FontAwesomeIcon
                    className={classes.backIcon}
                    icon={['fas', 'hand-holding-dollar']}
                />
				<div className={classes.accountDetails}>
					<div className={classes.loanTitle}>{getLoanTypeName(loan.Type)} Loan</div>
					<div className={classes.loanInfo}>
						<div>
							<span className={classes.label}>Interest Rate</span>
							<span className={classes.value}>{loan.InterestRate}%</span>
						</div>
						<div>
							<span className={classes.label}>Remaining Payments</span>
							<span className={classes.value}>{loanRemainingPayments}</span>
						</div>
						<div>
							<span className={classes.label}>Next Payment Due</span>
							<span className={classes.value}>{getNextDuePayment()}</span>
						</div>
						{(loan.Remaining > 0 && loan.NextPayment) && (
							<div>
								<span className={classes.label}>Next Payment Amount</span>
								<span className={classes.value}>
									${getNextPaymentAmount(loan).toLocaleString('en-US')}
								</span>
							</div>
						)}
					</div>
					{getWarning() && <div className={classes.warning}>
						{getWarning()}
					</div>}
				</div>
				<div className={classes.accountBalance}>
					<span className={classes.remainingLabel}>Remaining Balance</span>
					<span className={classes.remainingAmount}>
						${loanRemainingAmount.toLocaleString('en-US')}
					</span>
				</div>
			</Paper>
		</Link>
	);
};
