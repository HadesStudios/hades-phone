import React, { useState } from 'react';
import {
	IconButton,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Confirm } from '../../../components';
import Nui from '../../../util/Nui';
import { useAlert } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		padding: 15,
		background: theme.palette.secondary.dark,
		borderRadius: 12,
		marginBottom: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	keyInfo: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 4,
	},
	role: {
		fontSize: 14,
		color: '#ef4444',
		fontWeight: '600',
	},
	roleHolder: {
		color: '#888',
	},
	actions: {
		display: 'flex',
		gap: 8,
	},
	actionBtn: {
		color: theme.palette.primary.main,
		'&:hover': {
			color: theme.palette.primary.light,
		},
	},
	deleteBtn: {
		color: theme.palette.error.main,
		'&:hover': {
			color: theme.palette.error.light,
		},
	},
}));

export default ({ property, data, canRevoke, onRefresh, onUpdate }) => {
	const classes = useStyles();
	const showAlert = useAlert();

	const [deleting, setDeleting] = useState(false);

	const onDelete = async (e) => {
		try {
			let res = await (
				await Nui.send('Home:RevokeDigiKey', {
					id: property.id,
					target: data.Char,
				})
			).json();

			if (!res.error) {
				showAlert('DigiKey Has Been Revoked');
				setDeleting(false);
				onRefresh();
			} else {
				switch (res.code) {
					case 1:
						showAlert('Error Occured');
						break;
					case 2:
						showAlert('Invalid Property');
						break;
					case 3:
						showAlert('Not Allowed');
						break;
					case 4:
						showAlert('Invalid Target Player');
						break;
					case 5:
						showAlert('Invalid Target Character');
						break;
					case 6:
						showAlert("Person Doesn't Have A DigiKey For Property");
						break;
					case 7:
						showAlert('Error Occured Revoking DigiKey');
						break;
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (<>
		<div className={classes.wrapper}>
			<div className={classes.keyInfo}>
				<div className={classes.name}>{`${data.First} ${data.Last}`}</div>
				<div className={data.Owner ? classes.role : classes.roleHolder}>
					{data.Owner ? 'Owner' : 'Key Holder'}
				</div>
			</div>
			{canRevoke && (
				<div className={classes.actions}>
					<IconButton onClick={onUpdate} className={classes.actionBtn}>
						<FontAwesomeIcon icon={['fas', 'pen-to-square']} />
					</IconButton>
					<IconButton onClick={() => setDeleting(true)} className={classes.deleteBtn}>
						<FontAwesomeIcon icon={['fas', 'trash']} />
					</IconButton>
				</div>
			)}
		</div>
		{canRevoke && (
			<Confirm
				title="Revoke DigiKey?"
				open={deleting}
				confirm="Yes"
				decline="No"
				onConfirm={onDelete}
				onDecline={() => setDeleting(false)}
			>
				<p>
					Removing the DigiKey will revoke access to this property
					and shared assets for this person. Are you sure?
				</p>
			</Confirm>
		)}
	</>);
};
