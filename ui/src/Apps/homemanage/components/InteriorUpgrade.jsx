import React, { useEffect, useState } from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAlert } from '../../../hooks';
import { Modal, Confirm } from '../../../components';
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
	},
	items: {
		height: 400,
		overflowY: 'auto',
		overflowX: 'hidden',
		padding: 10,
	},
	interiorItem: {
		padding: 12,
		background: theme.palette.secondary.light,
		borderRadius: 8,
		marginBottom: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	interiorInfo: {
		flex: 1,
	},
	interiorName: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#ffffff',
		marginBottom: 2,
	},
	interiorPrice: {
		fontSize: 13,
		color: '#10b981',
	},
	interiorActions: {
		display: 'flex',
		gap: 4,
	},
}));

const calculatePrice = (currentPrice, price, cost) => {
	if (currentPrice > price) {
		return cost;
	} else {
		return cost + (price - currentPrice);
	}
}

export default ({ property, type, upgrade, setLoading, onRefresh }) => {
	const classes = useStyles();
	const sendAlert = useAlert();

	const [buying, setBuying] = useState(false);
	const [purchase, setPurchase] = useState(null);

    const current = upgrade.levels.find(l => l.id == property?.upgrades?.interior);

	const onConfirmPurchase = (name, int) => {
		setPurchase({
			name,
			int,
		});
	}

	const onPurchase = async (int) => {
		setPurchase(false);
		setLoading(true);
		setBuying(false);

		try {
			let res = await (await Nui.send('PurchasePropertyInterior', { int, id: property.id })).json();

			if (res) {
				sendAlert('Interior Upgraded');
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

	const onPreview = (e, int) => {
		e.stopPropagation();
		Nui.send('PreviewPropertyInterior', { int });
	};

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.upgradeInfo}>
					<div className={classes.upgradeName}>Interior</div>
					<div className={classes.upgradeDetails}>
						{current.name} (${current.price?.toLocaleString('en-US')})
					</div>
				</div>
				<IconButton onClick={() => setBuying(true)} className={classes.upgradeBtn}>
					<FontAwesomeIcon icon={['fas', 'bag-shopping']} />
				</IconButton>
			</div>
            <Modal
				open={buying}
			>
                <List className={classes.items}>
					<p>Upgrading the Interior Will <b>RESET</b> All Placed Furniture!</p>
					<p><i>Money will be taken from your main bank account.</i></p>
					{upgrade.levels.sort((a, b) => a.price - b.price).map(int => {
						return <div key={int.id} className={classes.interiorItem}>
							<div className={classes.interiorInfo}>
								<div className={classes.interiorName}>{int.name}</div>
								<div className={classes.interiorPrice}>
									${calculatePrice(current.price, int.price, 50000).toLocaleString('en-US')}
								</div>
							</div>
							<div className={classes.interiorActions}>
								<IconButton
									onClick={(e) => onPreview(e, int.id)}
									disabled={int.id == current.id}
									size="small"
								>
									<FontAwesomeIcon
										icon={['fas', 'eye']}
									/>
								</IconButton>
								<IconButton
									onClick={(e) => onConfirmPurchase(int.name, int.id)}
									disabled={int.id == current.id}
									size="small"
								>
									<FontAwesomeIcon
										icon={['fas', 'bag-shopping']}
									/>
								</IconButton>
							</div>
						</div>;
					})}
				</List>
			</Modal>
			<Confirm
				title={`Purchase Interior ${purchase?.name}`}
				open={purchase != null}
				confirm="Yes"
				decline="No"
				onConfirm={() => onPurchase(purchase?.int)}
				onDecline={() => setPurchase(null)}
			/>
		</>
	);
};
