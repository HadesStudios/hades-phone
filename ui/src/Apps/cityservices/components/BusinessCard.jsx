import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
	card: {
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		padding: 15,
		marginBottom: 10,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		display: 'flex',
		alignItems: 'center',
		gap: 15,
		'&:hover': {
			background: theme.palette.secondary.light,
			transform: 'translateX(4px)',
		},
	},
	icon: {
		width: 55,
		height: 55,
		background: theme.palette.primary.main,
		fontSize: 26,
		flexShrink: 0,
	},
	content: {
		flex: 1,
		minWidth: 0,
	},
	businessName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.palette.text.main,
		marginBottom: 2,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	businessType: {
		fontSize: 13,
		color: theme.palette.text.alt,
		textTransform: 'capitalize',
	},
	employeeCount: {
		fontSize: 13,
		color: theme.palette.success.main,
		marginTop: 4,
		display: 'flex',
		alignItems: 'center',
		gap: 5,
	},
	workplaceList: {
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
		marginTop: 4,
	},
	workplaceItem: {
		fontSize: 12,
		display: 'flex',
		alignItems: 'center',
		gap: 5,
	},
}));

const getBusinessIcon = (type, jobId) => {
	const jobIdLower = (jobId && typeof jobId === 'string') ? jobId.toLowerCase() : '';
	
	// Mechanics & Auto Shops
	if (jobIdLower.includes('mechanic') || jobIdLower.includes('auto') || jobIdLower.includes('bennys') || 
	    jobIdLower.includes('ottos') || jobIdLower.includes('hayes') || jobIdLower.includes('harmony') ||
	    jobIdLower.includes('tuner') || jobIdLower.includes('tuna') || jobIdLower.includes('redline')) {
		return 'wrench';
	}
	
	// Restaurants & Food
	if (jobIdLower.includes('burger') || jobIdLower.includes('uwu') || jobIdLower.includes('restaurant') ||
	    jobIdLower.includes('pizza') || jobIdLower.includes('noodle') || jobIdLower.includes('prego') ||
	    jobIdLower.includes('bakery') || jobIdLower.includes('beanmachine')) {
		return 'utensils';
	}
	
	// Bars & Clubs
	if (jobIdLower.includes('bar') || jobIdLower.includes('unicorn') || jobIdLower.includes('bahama') ||
	    jobIdLower.includes('tequila') || jobIdLower.includes('vu') || jobIdLower.includes('golddigger') ||
	    jobIdLower.includes('arcade')) {
		return 'martini-glass';
	}
	
	// Shops & Stores
	if (jobIdLower.includes('shop') || jobIdLower.includes('247') || jobIdLower.includes('store') ||
	    jobIdLower.includes('digitalden') || jobIdLower.includes('pawn')) {
		return 'shop';
	}
	
	// Dealerships
	if (jobIdLower.includes('pdm') || jobIdLower.includes('dealer')) {
		return 'car-building';
	}
	
	// Entertainment
	if (jobIdLower.includes('bowling') || jobIdLower.includes('casino')) {
		return 'dice';
	}
	
	// Real Estate
	if (jobIdLower.includes('realestate') || jobIdLower.includes('sterling') || jobIdLower.includes('lua_holdings')) {
		return 'building';
	}
	
	// Security
	if (jobIdLower.includes('securoserv')) {
		return 'shield-halved';
	}
	
	// Taxi
	if (jobIdLower.includes('taxi') || jobIdLower.includes('cabco')) {
		return 'taxi';
	}
	
	// Records/Music
	if (jobIdLower.includes('rockford') || jobIdLower.includes('records')) {
		return 'record-vinyl';
	}
	
	// Storage
	if (jobIdLower.includes('storage') || jobIdLower.includes('demonetti')) {
		return 'warehouse';
	}
	
	// Weed/Dispensary
	if (jobIdLower.includes('weed') || jobIdLower.includes('sagma')) {
		return 'cannabis';
	}
	
	// Gangs/Organizations
	if (jobIdLower.includes('triad') || jobIdLower.includes('lostmc') || jobIdLower.includes('white')) {
		return 'users';
	}
	
	return 'briefcase';
};

const getBusinessType = (type, jobId) => {
	// Try type first
	if (type && type !== 'Company') {
		return type;
	}
	
	// Fallback: check job ID for known patterns
	const jobIdLower = (jobId && typeof jobId === 'string') ? jobId.toLowerCase() : '';
	
	// Mechanics & Auto Shops
	if (jobIdLower.includes('mechanic') || jobIdLower.includes('auto') || jobIdLower.includes('bennys') || 
	    jobIdLower.includes('ottos') || jobIdLower.includes('hayes') || jobIdLower.includes('harmony') ||
	    jobIdLower.includes('tuner') || jobIdLower.includes('tuna') || jobIdLower.includes('redline')) {
		return 'Mechanic';
	}
	
	// Restaurants & Food
	if (jobIdLower.includes('burger') || jobIdLower.includes('uwu') || jobIdLower.includes('restaurant') ||
	    jobIdLower.includes('pizza') || jobIdLower.includes('noodle') || jobIdLower.includes('prego') ||
	    jobIdLower.includes('bakery') || jobIdLower.includes('beanmachine')) {
		return 'Restaurant';
	}
	
	// Bars & Clubs
	if (jobIdLower.includes('bar') || jobIdLower.includes('unicorn') || jobIdLower.includes('bahama') ||
	    jobIdLower.includes('tequila') || jobIdLower.includes('vu') || jobIdLower.includes('golddigger') ||
	    jobIdLower.includes('arcade')) {
		return 'Bar';
	}
	
	// Shops & Stores
	if (jobIdLower.includes('shop') || jobIdLower.includes('247') || jobIdLower.includes('store') ||
	    jobIdLower.includes('digitalden') || jobIdLower.includes('pawn')) {
		return 'Shop';
	}
	
	// Dealerships
	if (jobIdLower.includes('pdm') || jobIdLower.includes('dealer')) {
		return 'Dealership';
	}
	
	// Entertainment
	if (jobIdLower.includes('bowling')) {
		return 'Bowling';
	}
	if (jobIdLower.includes('casino')) {
		return 'Casino';
	}
	
	// Real Estate
	if (jobIdLower.includes('realestate') || jobIdLower.includes('sterling') || jobIdLower.includes('lua_holdings')) {
		return 'Real Estate';
	}
	
	// Security
	if (jobIdLower.includes('securoserv')) {
		return 'Security';
	}
	
	// Taxi
	if (jobIdLower.includes('taxi') || jobIdLower.includes('cabco')) {
		return 'Taxi';
	}
	
	// Records/Music
	if (jobIdLower.includes('rockford') || jobIdLower.includes('records')) {
		return 'Music';
	}
	
	// Storage
	if (jobIdLower.includes('storage') || jobIdLower.includes('demonetti')) {
		return 'Storage';
	}
	
	// Weed/Dispensary
	if (jobIdLower.includes('weed') || jobIdLower.includes('sagma')) {
		return 'Dispensary';
	}
	
	// Gangs/Organizations
	if (jobIdLower.includes('triad') || jobIdLower.includes('lostmc') || jobIdLower.includes('white')) {
		return 'Organization';
	}
	
	return 'Business';
};

const getWorkplaceName = (workplaceId) => {
	const names = {
		lspd: 'Officer',
		lscso: 'Deputy',
		sasp: 'Trooper',
	};
	return names[workplaceId] || 'Employee';
};

const getWorkplaceColor = (workplaceId) => {
	const colors = {
		lspd: '#4A90E2',  // Blue
		lscso: '#8B6F47',  // Brown
		sasp: '#9E9E9E',  // Grey
	};
	return colors[workplaceId] || '#4CAF50';
};

export default ({ business }) => {
	const classes = useStyles();

	// Check if this is police with workplaces
	const hasWorkplaces = business.Id === 'police' && business.Workplaces && Object.keys(business.Workplaces).length > 0;

	return (
		<div className={classes.card}>
			<Avatar className={classes.icon}>
				<FontAwesomeIcon icon={['fas', getBusinessIcon(business.Type, business.Id)]} />
			</Avatar>
			<div className={classes.content}>
				<div className={classes.businessName}>{business.Name}</div>
				<div className={classes.businessType}>
					{getBusinessType(business.Type, business.Id)}
				</div>
				{hasWorkplaces ? (
					<div className={classes.workplaceList}>
						{Object.entries(business.Workplaces).map(([workplaceId, count]) => (
							<div key={workplaceId} className={classes.workplaceItem} style={{ color: getWorkplaceColor(workplaceId) }}>
								<FontAwesomeIcon icon={['fas', 'shield']} />
								<span>{count} {count === 1 ? getWorkplaceName(workplaceId) : getWorkplaceName(workplaceId) + 's'}</span>
							</div>
						))}
					</div>
				) : business.EmployeeCount !== undefined && (
					<div className={classes.employeeCount}>
						<FontAwesomeIcon icon={['fas', 'users']} />
						<span>{business.EmployeeCount} {business.EmployeeCount === 1 ? 'Employee' : 'Employees'}</span>
					</div>
				)}
			</div>
		</div>
	);
};
