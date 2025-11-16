import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Moment from 'react-moment';

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
		color: '#fff',
		height: 60,
		width: 60,
	},
	avatarFav: {
		color: '#fff',
		height: 60,
		width: 60,
		border: '3px solid #f59e0b',
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
	number: {
		fontSize: 18,
		fontWeight: '600',
		color: '#ffffff',
	},
	time: {
		fontSize: 12,
		color: '#888',
	},
	message: {
		fontSize: 14,
		color: '#aaa',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	unread: {
		minWidth: 22,
		height: 22,
		lineHeight: '22px',
		padding: '0 6px',
		position: 'absolute',
		bottom: -2,
		right: -2,
		textAlign: 'center',
		background: '#ef4444',
		color: '#ffffff',
		borderRadius: 11,
		fontSize: 12,
		fontWeight: 'bold',
		border: '2px solid ' + theme.palette.secondary.dark,
	},
}));

export default (props) => {
	const classes = useStyles();
	const history = useHistory();
	const contacts = useSelector((state) => state.data.data.contacts);
	const isContact = contacts.filter(
		(c) => c.number === props.message.number,
	)[0];

	const onClick = () => {
		history.push(`/apps/messages/convo/${props.message.number}`);
	};

	return (
		<Paper className={classes.convo} onClick={onClick} elevation={0}>
			<div className={classes.avatarContainer}>
				{isContact != null ? (
					isContact.avatar != null && isContact.avatar !== '' ? (
						<Avatar
							className={
								isContact.favorite
									? classes.avatarFav
									: classes.avatar
							}
							src={isContact.avatar}
							alt={isContact.name.charAt(0)}
						/>
					) : (
						<Avatar
							className={
								isContact.favorite
									? classes.avatarFav
									: classes.avatar
							}
							style={{ background: isContact.color }}
						>
							{isContact.name.charAt(0)}
						</Avatar>
					)
				) : (
					<Avatar className={classes.avatar}>#</Avatar>
				)}
				{props.unread > 0 && (
					<div className={classes.unread}>{props.unread}</div>
				)}
			</div>
			
			<div className={classes.contentContainer}>
				<div className={classes.topRow}>
					<div className={classes.number}>
						{isContact != null ? isContact.name : props.message.number}
					</div>
					<div className={classes.time}>
						<Moment fromNow>{+props.message.time}</Moment>
					</div>
				</div>
				<div className={classes.message}>
					{props.message.message}
				</div>
			</div>
		</Paper>
	);
};
