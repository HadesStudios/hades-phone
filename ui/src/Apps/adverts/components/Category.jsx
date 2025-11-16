import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Grid, IconButton, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		marginBottom: 12,
		borderRadius: 12,
		overflow: 'hidden',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.95,
		},
	},
	header: {
		padding: '15px 20px',
		borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		color: '#ffffff',
	},
	body: {
		padding: '15px 20px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	count: {
		fontSize: 18,
		fontWeight: '700',
		color: '#ffffff',
	},
	arrow: {
		color: '#ffffff',
		fontSize: 24,
	},
}));

export default connect()((props) => {
	const classes = useStyles();
	const history = useHistory();
	const adObjs = useSelector((state) => state.data.data.adverts);

	const adverts = Object.keys(adObjs).filter(a => a !== '0').filter((ad) => {
		return adObjs[ad].categories.includes(props.category.label);
	});

	const onClick = () => {
		history.push(`/apps/adverts/category-view/${props.category.label}`);
	}

	return (
		<Zoom in={true} duration={1000}>
			<div
				className={classes.wrapper}
				style={{ backgroundColor: props.category.color }}
				onClick={onClick}
			>
				<div className={classes.header}>
					<div className={classes.title}>{props.category.label}</div>
				</div>
				<div className={classes.body}>
					<div className={classes.count}>
						{adverts.length > 0
							? `${adverts.length} ${adverts.length > 1 ? 'Advertisements' : 'Advertisement'}`
							: 'No Advertisements'}
					</div>
					<FontAwesomeIcon className={classes.arrow} icon={['fas', 'chevron-right']} />
				</div>
			</div>
		</Zoom>
	);
});
