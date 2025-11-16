import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Employee from './Employee';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		marginBottom: 20,
	},
	workplaceTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#888',
		marginBottom: 10,
		paddingLeft: 5,
	},
}));

export default ({ jobData, playerJob, workplace, onEmployeeClick }) => {
	const classes = useStyles();
	const roster = useSelector((state) => state.com.roster);

	let filtered = Array();
	if (Boolean(roster) && roster[jobData.Id]) {
		if (workplace) {
			filtered = roster[jobData.Id].filter((p) => p.JobData.Workplace?.Id == workplace.Id);
		} else {
			filtered = roster[jobData.Id];
		}
	};

	if (filtered.length == 0) return null;
	return (
		<div className={classes.wrapper}>
			{workplace && <div className={classes.workplaceTitle}>{workplace.Name}</div>}
			{filtered
				.sort((a, b) => b.JobData.Grade.Level - a.JobData.Grade.Level)
				.map((person) => {
					return (
						<Employee
							key={person.SID}
							jobData={jobData}
							playerJob={playerJob}
							employee={person}
							onClick={onEmployeeClick}
						/>
					);
				})}
		</div>
	);
};
