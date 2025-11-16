import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Avatar, IconButton, Paper, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDismisser, useMyApps } from '../../hooks';
import Nui from '../../util/Nui';
import DOMPurify from 'dompurify';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 15,
		background: '#1a1a1d',
		borderRadius: 12,
		marginBottom: 12,
		border: '1px solid #2a2a2d',
		transition: 'opacity 0.2s ease',
		cursor: 'pointer',
		'&:hover': {
			opacity: 0.9,
		},
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	headerLeft: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},
	appIcon: {
		height: 45,
		width: 45,
		borderRadius: 10,
		marginRight: 12,
		'& svg': {
			height: '60%',
			width: '60%',
		}
	},
	appIconfa: {
		height: 'fit-content',
		width: 'fit-content',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto',
	},
	headerInfo: {
		flex: 1,
	},
	appName: {
		fontSize: 14,
		color: '#ffffff',
		fontWeight: '600',
		textTransform: 'uppercase',
		marginBottom: 2,
	},
	time: {
		fontSize: 12,
		color: '#888',
	},
	content: {
		cursor: 'inherit',
	},
	notifTitle: {
		fontSize: 16,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 6,
		display: 'block',
	},
	notifDescrip: {
		fontSize: 14,
		color: '#aaa',
		lineHeight: 1.4,
		display: 'block',
	},
	actionBtns: {
		display: 'flex',
		gap: 8,
	},
	actionView: {
		color: '#60D6C5',
		fontSize: 20,
		padding: 8,
		'&:hover': {
			backgroundColor: 'rgba(96, 214, 197, 0.1)',
		},
	},
	actionAccept: {
		color: '#10b981',
		fontSize: 20,
		padding: 8,
		'&:hover': {
			backgroundColor: 'rgba(16, 185, 129, 0.1)',
		},
	},
	actionCancel: {
		color: '#ef4444',
		fontSize: 20,
		padding: 8,
		'&:hover': {
			backgroundColor: 'rgba(239, 68, 68, 0.1)',
		},
	},
}));

export default ({ id, notification }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const dismisser = useDismisser();
	const phoneOpen = useSelector((state) => state.phone.visible);
	const apps = useMyApps();
	const location = useLocation();
	const history = useHistory();
	let app =
		typeof notification.app === 'object'
			? notification.app
			: apps[notification.app];

	const [showIcons, setShowIcons] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);

		if (notification.duration != -1) {
			let i = setInterval(() => {
				if (Date.now() > notification.time + notification.duration) {
					setShow(false);
					clearInterval(i);
				}
			}, 1000);

			return () => {
				clearInterval(i);
			};
		}
	}, []);

	useEffect(() => {
		if (notification.collapsed) return;
		if (notification.duration == -1) {
			let t = setTimeout(() => {
				dispatch({
					type: 'NOTIF_COLLAPSE',
					payload: { id: notification._id },
				});
			}, 5000);

			return () => {
				clearTimeout(t);
			};
		}
	}, [notification]);

	const onClick = () => {
		if (notification.duration != -1) {
			setShow(false);
		} else {
			dispatch({
				type: 'NOTIF_COLLAPSE',
				payload: { id: notification._id },
			});
		}
	};

	const onView = () => {
		if (notification.duration != -1) setShow(false);

		if (notification.action?.view === 'USE_SHARE') {
			dispatch({
				type: 'USE_SHARE',
				payload: {},
			});
		} else {
			history.push(`/apps/${app.name}/${notification.action?.view}`);
		}
	};

	const onAccept = () => {
		setShow(false);
		Nui.send('AcceptPopup', {
			event: notification.action?.accept,
			data: notification.data,
		});
	};

	const onCancel = () => {
		setShow(false);
		Nui.send('CancelPopup', {
			event: notification.action?.cancel,
			data: notification.data,
		});
	};

	const onAnimEnd = () => {
		dismisser(notification._id);
	};

	const hasActions = Boolean(notification.action?.view) || Boolean(notification.action?.accept) || Boolean(notification.action?.cancel);

	const onWrapperClick = (e) => {
		// Don't dismiss if clicking on an action button
		if (e.target.closest('button')) {
			return;
		}
		onClick();
	};

	if (!Boolean(app)) return null;
	return (
		<Collapse
			collapsedSize={0}
			in={show}
			onEntered={() => setShowIcons(true)}
			onExiting={() => setShowIcons(false)}
			onExited={onAnimEnd}
		>
			<Paper 
				elevation={20} 
				className={classes.wrapper}
				onClick={onWrapperClick}
			>
				<div className={classes.header}>
					<div className={classes.headerLeft}>
						<Avatar
							variant="rounded"
							className={classes.appIcon}
							style={{ background: `${app.color}` }}
						>
							<FontAwesomeIcon
								className={classes.appIconfa}
								icon={app.icon}
							/>
						</Avatar>
						<div className={classes.headerInfo}>
							<div className={classes.appName}>{app.label}</div>
							<Moment className={classes.time} date={notification.time} fromNow />
						</div>
					</div>
					
					{phoneOpen && showIcons && (Boolean(notification.action?.view) || Boolean(notification.action?.accept) || Boolean(notification.action?.cancel)) && (
						<div className={classes.actionBtns}>
							{Boolean(notification.action?.view) && (
								<IconButton onClick={onView} className={classes.actionView}>
									<FontAwesomeIcon icon={['fas', 'eye']} />
								</IconButton>
							)}
							{Boolean(notification.action?.accept) && (
								<IconButton onClick={onAccept} className={classes.actionAccept}>
									<FontAwesomeIcon icon={['fas', 'circle-check']} />
								</IconButton>
							)}
							{Boolean(notification.action?.cancel) && (
								<IconButton onClick={onCancel} className={classes.actionCancel}>
									<FontAwesomeIcon icon={['fas', 'circle-xmark']} />
								</IconButton>
							)}
						</div>
					)}
				</div>
				
				<div className={classes.content}>
					<span className={classes.notifTitle}>{notification.title}</span>
					<span className={classes.notifDescrip}>
						{DOMPurify.sanitize(notification.description, {ALLOWED_TAGS: []})}
					</span>
				</div>
			</Paper>
		</Collapse>
	);
};
