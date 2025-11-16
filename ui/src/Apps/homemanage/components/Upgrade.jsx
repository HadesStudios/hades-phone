import React, { useEffect, useState } from 'react';
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAlert } from '../../../hooks';
import { Modal } from '../../../components';
import Nui from '../../../util/Nui';

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
	upgradeInfo: {
		flex: 1,
	},
	upgradeName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 4,
	},
	upgradeDetails: {
		fontSize: 14,
		color: '#888',
	},
	upgradeBtn: {
		color: theme.palette.primary.main,
		'&:hover': {
			color: theme.palette.primary.light,
		},
		'&:disabled': {
			color: '#444',
		},
	},
}));

export default ({ property, type, upgrade, setLoading, onRefresh }) => {
	const classes = useStyles();
	const sendAlert = useAlert();

	const [buying, setBuying] = useState(false);

    const current = upgrade.levels?.[(property?.upgrades?.[type] ?? 1) - 1];
    const next = upgrade.levels?.[(property?.upgrades?.[type] ?? 1)];

	const onPurchase = async () => {
        setLoading(true);
        setBuying(false);
		try {
			let res = await (await Nui.send('PurchasePropertyUpgrade', { upgrade: type, id: property.id })).json();

			if (res) {
                sendAlert('Upgrade Purchased');
				onRefresh();
			} else {
				sendAlert('Unable to Purchase Upgrade');
			}
		} catch (err) {
			console.log(err);
			sendAlert('Unable to Purchase Upgrade');
		}
        setLoading(false);
	};

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.upgradeInfo}>
					<div className={classes.upgradeName}>{current.name}</div>
					<div className={classes.upgradeDetails}>
						{current.info}{next ? '' : ' - Max Upgrade Reached'}
					</div>
				</div>
				<IconButton onClick={() => setBuying(true)} disabled={!next} className={classes.upgradeBtn}>
					<FontAwesomeIcon icon={['fas', 'turn-up']} />
				</IconButton>
			</div>
            <Modal
                form
				open={buying}
				title={`Purchase ${next?.name}?`}
				onAccept={onPurchase}
                submitLang="Purchase"
				onClose={() => setBuying(false)}
			>
                <p>{next?.name} - {next?.info}</p>
				<p>Upgrade Cost: ${next?.price?.toLocaleString("en-US")}</p>
				<p><i>Money will be taken from your main bank account.</i></p>
				<p>
					Are you sure you want to upgrade? Purchases may not be refunded.
				</p>
			</Modal>
		</>
	);
};
