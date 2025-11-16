import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
	},
	document: {
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center',
		gap: 15,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.9,
			transform: 'translateX(4px)',
		},
	},
	icon: {
		fontSize: 32,
		color: '#696969',
		minWidth: 40,
		textAlign: 'center',
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 4,
	},
	timestamp: {
		fontSize: 13,
		color: '#888',
	},
}));

export default ({ document }) => {
	const classes = useStyles();

	return (
		<Link to={`/apps/documents/view/${document._id}/v`} className={classes.link}>
			<div className={classes.document}>
				<div className={classes.icon}>
					<FontAwesomeIcon icon={['fas', 'file-lines']} />
				</div>
				<div className={classes.content}>
					<div className={classes.title}>{document.title}</div>
					<div className={classes.timestamp}>
						Last Edited{' '}
						<Moment unix fromNow>
							{document.time}
						</Moment>
					</div>
				</div>
			</div>
		</Link>
	);
};
