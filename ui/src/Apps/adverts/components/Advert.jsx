import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import { Categories } from '../data';
import { DeleteAdvert } from '../action';

const useStyles = makeStyles((theme) => ({
	convo: {
		background: theme.palette.secondary.dark,
		padding: 15,
		marginBottom: 12,
		borderRadius: 12,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		width: '97.3%',
		margin: '0 auto 12px auto',
		'&:hover': {
			opacity: 0.9,
		},
	},
	title: {
		fontSize: 20,
		color: '#f9a825',
		fontWeight: '600',
		marginBottom: 8,
	},
	desc: {
		fontSize: 14,
		color: '#aaa',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		marginBottom: 10,
	},
	price: {
		marginBottom: 10,
	},
	priceValue: {
		'&::before': {
			content: '"$ "',
			color: '#10b981',
		},
		fontSize: 22,
		color: '#10b981',
		fontWeight: '700',
	},
	noprice: {
		fontSize: 16,
		color: '#888',
		marginBottom: 10,
	},
	categories: {
		display: 'flex',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		gap: 6,
		marginBottom: 12,
	},
	authorPane: {
		borderTop: '1px solid #2a2a2d',
		paddingTop: 12,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	postedTime: {
		fontSize: 12,
		color: '#f9a825',
	},
	author: {
		fontSize: 12,
		color: '#888',
	},
	yours: {
		color: '#f9a825',
		fontSize: 11,
		marginRight: 5,
		fontWeight: '600',
	},
}));

export default connect(null, { DeleteAdvert })((props) => {
	const classes = useStyles();
	const history = useHistory();
	const myId = useSelector((state) => state.data.data.player.Source);
	const cats = Categories.filter((cat) => {
		return props.advert.categories.includes(cat.label);
	});

	const onClick = () => {
		history.push(`/apps/adverts/view/${props.advert.id}`);
	};

	return (
		<Paper className={classes.convo} onClick={onClick} elevation={0}>
			<div className={classes.title}>{props.advert.title}</div>
			<div className={classes.desc}>{props.advert.short}</div>
			
			{props.advert.price != null && props.advert.price !== '' ? (
				<div className={classes.price}>
					<NumberFormat
						className={classes.priceValue}
						value={props.advert.price}
						displayType={'text'}
						thousandSeparator={true}
					/>
				</div>
			) : (
				<div className={classes.noprice}>Price Negotiable</div>
			)}
			
			<div className={classes.categories}>
				{cats.map((cat, i) => {
					return (
						<Chip
							key={`advert-cat-${i}`}
							size="small"
							style={{ backgroundColor: cat.color, color: '#fff', fontWeight: '600' }}
							label={cat.label}
						/>
					);
				})}
			</div>
			
			<div className={classes.authorPane}>
				<Moment
					className={classes.postedTime}
					interval={60000}
					fromNow
					date={+props.advert.time}
				/>
				<div className={classes.author}>
					{props.advert.id === myId && (
						<span className={classes.yours}>(Your Ad)</span>
					)}
					{props.advert.author}
				</div>
			</div>
		</Paper>
	);
});
