import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	AppBar,
	Grid,
	List,
	ListItem,
	ListItemText,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components';
import Nui from '../../util/Nui';
import Truncate from 'react-truncate';
import { useAlert, useJobPermissions } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		height: '100%',
		background: theme.palette.secondary.main,
	},
	header: {
		background: theme.palette.primary.main,
		fontSize: 20,
		padding: 15,
		lineHeight: '45px',
		height: 78,
	},
	content: {
		height: '93.75%',
		overflowY: 'auto',
		overflowX: 'hidden',
		padding: 15,
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
	tabPanel: {},
	phoneTab: {
		minWidth: '33.333%',
	},
	alert: {
		width: 'fit-content',
		margin: 'auto',
	},
	emptyMsg: {
		width: '100%',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: '25%',
	},
	companyCard: {
		padding: 20,
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		marginBottom: 15,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		'&:hover': {
			opacity: 0.9,
			transform: 'translateX(4px)',
		},
	},
	companyName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 8,
	},
	companyRole: {
		fontSize: 14,
		color: '#888',
	},
}));

export default (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const sendAlert = useAlert();
	const history = useHistory();
	const hasPerm = useJobPermissions();
	const rosters = useSelector((state) => state.com.roster);
	const rostersRefreshed = useSelector((state) => state.com.rosterUpdated);
	const externalJobs = useSelector((state) => state.data.data.externalJobs);
	const player = useSelector((state) => state.data.data.player);
	const [loading, setLoading] = useState(false);

	const manageJob = (jobId) => {
		history.push(`/apps/comanager/view/${jobId}`);
		dispatch({
			type: 'SET_COM_TAB',
			payload: { tab: 0 },
		});
	};

	const fetchRoster = useMemo(() => throttle(async () => {
		setLoading(true);
		try {
			let res = await (await Nui.send('FetchRoster', {})).json();

			// let res = {
			// 	rosterData: {
			// 		police: [
			// 			{
			// 				SID: 2,
			// 				First: 'Bob',
			// 				Last: 'Smith',
			// 				Phone: '555-555-5555',
			// 				JobData: {
			// 					Workplace: {
			// 						Id: 'lspd',
			// 						Name: 'Los Santos Police Department',
			// 					},
			// 					Name: 'Police',
			// 					Grade: {
			// 						Id: 'dchief',
			// 						Name: 'Dep. Chief',
			// 						Level: 8,
			// 					},
			// 					Id: 'police',
			// 				},
			// 			}
			// 		]
			// 	},
			// }

			if (res && res.rosterData) {
				dispatch({
					type: 'UPDATE_ROSTERS',
					payload: {
						roster: res.rosterData,
					},
				});
			} else throw res;
		} catch (err) {
			console.log(err);
			sendAlert('Unable to Load Roster\'s');
			dispatch({
				type: 'UPDATE_ROSTERS',
				payload: {
					roster: false,
				},
			});
		}

		setLoading(false);
	}, 5000), []);

	useEffect(() => {
		const jobs = player.Jobs || (player.Job ? [player.Job] : []);
		if (jobs.length > 0) {
			if (!rosters || (Date.now() - rostersRefreshed) >= 180000) {
				fetchRoster();
			}
		}
    }, []);

	return (
		<div className={classes.wrapper}>
			<AppBar position="static" className={classes.header}>
				<Grid container>
					<Grid item xs={7}>
						<Truncate lines={1}>Company Manager</Truncate>
					</Grid>
				</Grid>
			</AppBar>
			{loading ?
				<Loader static text="Loading" />
			: <>
				<div className={classes.content}>
					{(() => {
						const jobs = player.Jobs || (player.Job ? [player.Job] : []);
						if (jobs.length > 0) {
							return jobs.map((job) => {
								if (!externalJobs.includes(job.Id)) {
									return (
										<div
											key={`job-${job.Id}`}
											onClick={() => manageJob(job.Id)}
											className={classes.companyCard}
										>
											<div className={classes.companyName}>
												{job.Workplace ? job.Workplace?.Name : job.Name}
											</div>
											<div className={classes.companyRole}>
												Employed as {job.Grade.Name}
											</div>
										</div>
									);
								}
							});
						} else {
							return <div className={classes.emptyMsg}>You're Not Employed at a Company</div>;
						}
					})()}
				</div>
			</>
			}
		</div>
	);
};
