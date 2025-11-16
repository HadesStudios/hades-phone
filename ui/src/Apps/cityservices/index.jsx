import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Grid, TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nui from '../../util/Nui';
import { useAlert } from '../../hooks';
import { Loader } from '../../components';
import BusinessCard from './components/BusinessCard';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		height: '100%',
		background: theme.palette.secondary.main,
	},
	header: {
		background: '#2196F3',
		fontSize: 20,
		padding: 15,
		lineHeight: '50px',
		height: 78,
	},
	content: {
		height: 'calc(100% - 78px)',
		padding: 15,
		overflowY: 'auto',
		overflowX: 'hidden',
		'&::-webkit-scrollbar': {
			width: 6,
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#ffffff52',
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: theme.palette.primary.main,
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent',
		},
	},
	searchField: {
		marginBottom: 15,
		'& .MuiOutlinedInput-root': {
			borderRadius: 10,
		},
	},
	emptyState: {
		textAlign: 'center',
		padding: 40,
		color: theme.palette.text.alt,
		fontSize: 16,
	},
	refreshBtn: {
		color: '#fff',
		'&:hover': {
			background: 'rgba(255, 255, 255, 0.1)',
		},
	},
	lastUpdated: {
		textAlign: 'center',
		color: theme.palette.text.alt,
		fontSize: 12,
		marginTop: 10,
		opacity: 0.7,
	},
}));

export default () => {
	const classes = useStyles();
	const showAlert = useAlert();
	
	const [businesses, setBusinesses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState('');
	const [lastUpdated, setLastUpdated] = useState(null);

	useEffect(() => {
		fetchBusinesses();
	}, []);

	const fetchBusinesses = async (isRefresh = false) => {
		if (isRefresh) {
			setRefreshing(true);
		} else {
			setLoading(true);
		}
		try {
			let res = await (await Nui.send('CityServices:GetBusinesses')).json();
			if (res && Array.isArray(res)) {
				setBusinesses(res);
				setLastUpdated(new Date());
			} else {
				showAlert('Unable to Load Businesses');
			}
		} catch (err) {
			console.log(err);
			// Dev mode: Show mock data
			if (process.env.NODE_ENV !== 'production') {
				setBusinesses([
					{
						Id: 1,
						Name: "Burger Shot",
						Type: "restaurant",
						Owner: 1001,
						EmployeeCount: 5,
					},
					{
						Id: 2,
						Name: "Los Santos Customs",
						Type: "garage",
						Owner: 1002,
						EmployeeCount: 8,
					},
					{
						Id: 3,
						Name: "Vanilla Unicorn",
						Type: "bar",
						Owner: 1003,
						EmployeeCount: 12,
					},
					{
						Id: 4,
						Name: "24/7 Supermarket",
						Type: "shop",
						Owner: 1004,
						EmployeeCount: 3,
					},
					{
						Id: 5,
						Name: "Pillbox Medical Center",
						Type: "hospital",
						Owner: 1005,
						EmployeeCount: 15,
					},
					{
						Id: 6,
						Name: "Benny's Original Motor Works",
						Type: "garage",
						Owner: 1006,
						EmployeeCount: 6,
					},
				]);
				setLastUpdated(new Date());
			}
		}
		setLoading(false);
		setRefreshing(false);
	};

	const handleRefresh = () => {
		fetchBusinesses(true);
	};

	const filteredBusinesses = businesses.filter((business) =>
		business.Name.toLowerCase().includes(search.toLowerCase())
	);

	const getTimeAgo = (date) => {
		if (!date) return '';
		const seconds = Math.floor((new Date() - date) / 1000);
		if (seconds < 60) return 'Just now';
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		return `${hours}h ago`;
	};

	return (
		<div className={classes.wrapper}>
			<AppBar position="static" className={classes.header}>
				<Grid container alignItems="center">
					<Grid item xs={10}>
						City Services
					</Grid>
					<Grid item xs={2} style={{ textAlign: 'right' }}>
						<Tooltip title="Refresh">
							<IconButton 
								onClick={handleRefresh} 
								className={classes.refreshBtn}
								disabled={refreshing}
							>
								<FontAwesomeIcon 
									icon={['fas', 'arrows-rotate']} 
									spin={refreshing}
								/>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</AppBar>
			<div className={classes.content}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Search businesses..."
					className={classes.searchField}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<FontAwesomeIcon icon={['fas', 'magnifying-glass']} />
							</InputAdornment>
						),
					}}
				/>

				{loading ? (
					<Loader static text="Loading Businesses" />
				) : filteredBusinesses.length > 0 ? (
					<>
						{filteredBusinesses.map((business) => (
							<BusinessCard key={business.Id} business={business} />
						))}
						{lastUpdated && (
							<div className={classes.lastUpdated}>
								Last updated: {getTimeAgo(lastUpdated)}
							</div>
						)}
					</>
				) : (
					<div className={classes.emptyState}>
						{search ? 'No businesses found matching your search' : 'No active businesses'}
					</div>
				)}
			</div>
		</div>
	);
};
