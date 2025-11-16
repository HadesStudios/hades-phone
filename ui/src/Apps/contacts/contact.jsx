import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	Avatar,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';

const useStyles = makeStyles((theme) => ({
	paper: {
		background: theme.palette.secondary.dark,
		borderRadius: 8,
		marginBottom: 15,
		padding: '15px 20px',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: 15,
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
	contactInfo: {
		flex: 1,
	},
	contactName: {
		fontSize: 18,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 4,
	},
	contactNumber: {
		fontSize: 14,
		color: theme.palette.text.alt,
	},
	buttonsContainer: {
		display: 'flex',
		gap: 8,
	},
	actionButton: {
		width: 45,
		height: 45,
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 18,
		color: '#ffffff',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.8,
		},
	},
	callButton: {
		backgroundColor: '#60D6C5',
	},
	smsButton: {
		backgroundColor: '#60D6C5',
	},
	editButton: {
		backgroundColor: '#6b7280',
	},
	deleteButton: {
		backgroundColor: '#6b7280',
	},
}));

export default (props) => {
	const classes = useStyles();
	const history = useHistory();
	const callData = useSelector((state) => state.call.call);

	const callContact = async () => {
		if (callData == null) {
			try {
				let res = await (
					await Nui.send('CreateCall', {
						number: props.contact.number,
						isAnon: false,
					})
				).json();
				if (res) {
					history.push(`/apps/phone/call/${props.contact.number}`);
				} else showAlert('Unable To Start Call');
			} catch (err) {
				console.log(err);
				showAlert('Unable To Start Call');
			}
		}
	};

	const textContact = () => {
		history.push(`/apps/messages/convo/${props.contact.number}`);
	};

	const editContact = () => {
		history.push(`/apps/contacts/edit/${props.contact._id}`);
	};

	return (
		<Paper className={classes.paper}>
			<div className={classes.container}>
				{props.contact.avatar != null && props.contact.avatar !== '' ? (
					<Avatar
						className={props.contact.favorite ? classes.avatarFav : classes.avatar}
						src={props.contact.avatar}
						alt={props.contact.name.charAt(0)}
					/>
				) : (
					<Avatar
						className={props.contact.favorite ? classes.avatarFav : classes.avatar}
						style={{ background: props.contact.color }}
					>
						{props.contact.name.charAt(0)}
					</Avatar>
				)}
				<div className={classes.contactInfo}>
					<div className={classes.contactName}>
						{props.contact.name}
					</div>
					<div className={classes.contactNumber}>
						{props.contact.number}
					</div>
				</div>
				<div className={classes.buttonsContainer}>
					<div
						className={`${classes.actionButton} ${classes.callButton}`}
						onClick={callContact}
					>
						<FontAwesomeIcon icon="phone" />
					</div>
					<div
						className={`${classes.actionButton} ${classes.smsButton}`}
						onClick={textContact}
					>
						<FontAwesomeIcon icon="comment-sms" />
					</div>
					<div
						className={`${classes.actionButton} ${classes.editButton}`}
						onClick={editContact}
					>
						<FontAwesomeIcon icon="user-pen" />
					</div>
					{props.onDelete != null && (
						<div
							className={`${classes.actionButton} ${classes.deleteButton}`}
							onClick={props.onDelete}
						>
							<FontAwesomeIcon icon="user-minus" />
						</div>
					)}
				</div>
			</div>
		</Paper>
	);
};
