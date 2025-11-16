import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Moment from 'react-moment';

import { DeleteEmail } from './action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
	convo: {
		background: theme.palette.secondary.dark,
		padding: 15,
		marginBottom: 12,
		borderRadius: 12,
		display: 'flex',
		alignItems: 'center',
		gap: 15,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.9,
		},
	},
	avatarContainer: {
		position: 'relative',
	},
	avatar: {
		color: '#ffffff',
		background: '#6b7280',
		height: 60,
		width: 60,
		fontSize: 24,
		fontWeight: '600',
	},
	avatarUnread: {
		color: '#ffffff',
		background: theme.palette.primary.main,
		height: 60,
		width: 60,
		fontSize: 24,
		fontWeight: '600',
	},
	contentContainer: {
		flex: 1,
		minWidth: 0,
	},
	topRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	sender: {
		fontSize: 16,
		color: '#aaa',
		fontWeight: '500',
	},
	senderUnread: {
		fontSize: 16,
		color: theme.palette.primary.main,
		fontWeight: '600',
	},
	time: {
		fontSize: 12,
		color: '#888',
	},
	subject: {
		fontSize: 18,
		color: '#ffffff',
		fontWeight: '600',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		marginBottom: 4,
	},
	body: {
		fontSize: 14,
		color: '#aaa',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	specialIcon: {
		fontSize: 18,
		color: '#ef4444',
		marginLeft: 8,
	},
}));

export default connect(null, { DeleteEmail })((props) => {
	const classes = useStyles();
	const history = useHistory();

	const onClick = () => {
		history.push(`/apps/email/view/${props.email._id}`);
	};

	useEffect(() => {
		let intrvl = null;
		if (props.email.flags != null && props.email.flags.expires != null) {
			intrvl = setInterval(() => {
				if (props.email.flags.expires < Date.now()) {
					props.DeleteEmail(props.email._id);
				}
			}, 2500);
		}
		return () => {
			clearInterval(intrvl);
		};
	}, []);

	return (
		<Paper className={classes.convo} onClick={onClick} elevation={0}>
			<div className={classes.avatarContainer}>
				<Avatar
					className={
						props.email.unread
							? classes.avatarUnread
							: classes.avatar
					}
				>
					{props.email.sender?.charAt(0)?.toUpperCase() ?? '?'}
				</Avatar>
			</div>
			
			<div className={classes.contentContainer}>
				<div className={classes.topRow}>
					<span
						className={
							props.email.unread
								? classes.senderUnread
								: classes.sender
						}
					>
						{props.email.sender}
					</span>
					<div className={classes.time}>
						<Moment interval={60000} fromNow>
							{+props.email.time}
						</Moment>
					</div>
				</div>
				<div className={classes.subject}>
					{props.email.subject}
					{props.email.flags != null && (
						<FontAwesomeIcon
							className={classes.specialIcon}
							icon={['fas', 'flag']}
						/>
					)}
				</div>
			</div>
		</Paper>
	);
});
