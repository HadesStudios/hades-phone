import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Categories } from './data';
import ActionButtons from './ActionButtons';
import Advert from './components/Advert';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		height: '100%',
		background: theme.palette.secondary.main,
	},
	adsWrapper: {
		height: 'calc(100% - 70px)',
		background: theme.palette.secondary.main,
		overflowY: 'auto',
		overflowX: 'hidden',
		padding: '10px 15px',
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#ffffff52',
			borderRadius: 3,
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
	},
	header: {
		padding: '20px',
		height: 70,
		borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#ffffff',
	},
}));

export default connect()((props) => {
	const classes = useStyles();
	const { category } = props.match.params;
	const catData = Categories.filter((cat) => cat.label === category)[0];
	const adverts = useSelector((state) => state.data.data.adverts);

	const [filtered, setFiltered] = useState(Object());

	useEffect(() => {
		let t = Object();
		Object.keys(adverts).filter(a => a !== '0').map((a) => {
			let ad = adverts[a];
			if (ad.categories.includes(category)) t[a] = ad;
		});
		setFiltered(t);
	}, [adverts]);

	return (
		<div className={classes.wrapper}>
			<div
				className={classes.header}
				style={{ backgroundColor: catData.color }}
			>
				<div className={classes.title}>{catData.label}</div>
			</div>
			<div className={classes.adsWrapper}>
				{Object.keys(filtered)
					.filter((a) => a !== '0')
					.sort((a, b) => {
						let aItem = filtered[a];
						let bItem = filtered[b];
						return bItem.time - aItem.time;
					})
					.map((ad, i) => {
						return (
							<Advert
								key={`advert-${i}`}
								advert={filtered[ad]}
								del={props.del}
							/>
						);
					})}
			</div>
			<ActionButtons />
		</div>
	);
});
