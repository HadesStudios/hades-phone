import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import Nui from '../../../util/Nui';
import { Modal, Loader } from '../../../components';
import { CurrencyFormat } from '../../../util/Parser';
import { useAlert } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
	card: {
		background: theme.palette.secondary.dark,
		padding: 15,
		marginBottom: 12,
		borderRadius: 12,
		display: 'flex',
		alignItems: 'center',
		gap: 15,
	},
	icon: {
		background: '#b0e655',
		height: 55,
		width: 55,
		fontSize: 28,
	},
	contentContainer: {
		flex: 1,
		minWidth: 0,
	},
	coinName: {
		fontSize: 18,
		color: '#ffffff',
		fontWeight: '600',
		marginBottom: 4,
	},
	coinShort: {
		fontSize: 14,
		color: '#b0e655',
		fontWeight: '500',
		marginLeft: 8,
	},
	coinPrice: {
		fontSize: 14,
		color: '#aaa',
	},
	priceValue: {
		color: '#b0e655',
		fontWeight: '600',
	},
	buyButton: {
		width: 40,
		height: 40,
		borderRadius: 8,
		background: '#2a2a2d',
		color: '#ffffff',
		'&:hover': {
			background: '#3a3a3d',
		},
	},
	editorField: {
		marginBottom: 15,
	},
}));

export default ({ coin }) => {
	const classes = useStyles();
	const showAlert = useAlert();
	const player = useSelector((state) => state.data.data.player);

	const [loading, setLoading] = useState(false);
	const [buying, setBuying] = useState(false);

	const startBuying = () => {
		setBuying({
			Price: coin.Price,
			Quantity: 1,
		});
	};

	const onBuy = async (e) => {
		setLoading(true);
		try {
			let res = await (await Nui.send('BuyCrypto', {
				Short: coin.Short,
				Quantity: buying.Quantity,
			})).json();

			if (!res.error) {
				showAlert(`Purchased ${coin.Name}`);
				setBuying(null);
			} else {
				showAlert(`Unable to Buy ${coin.Name}`);
			}
		} catch (err) {
			console.log(err);
			showAlert(`Unable to Buy ${coin.Name}`);
		}
		setBuying(null);
		setLoading(false);
	};

	return (
		<>
			<div className={classes.card}>
				<Avatar className={classes.icon}>
					<FontAwesomeIcon icon={['fab', 'bitcoin']} />
				</Avatar>
				
				<div className={classes.contentContainer}>
					<div className={classes.coinName}>
						{coin.Name}
						<span className={classes.coinShort}>${coin.Short}</span>
					</div>
					{coin.Price > 0 && (
						<div className={classes.coinPrice}>
							Buying Price: <span className={classes.priceValue}>${coin.Price}/coin</span>
						</div>
					)}
				</div>
				
				<IconButton className={classes.buyButton} onClick={startBuying}>
					<FontAwesomeIcon icon={['fas', 'bag-shopping']} />
				</IconButton>
			</div>
			{Boolean(buying) && (
				<Modal
					form
					formStyle={{ position: 'relative' }}
					open={true}
					title={`Buy $${coin.Short}`}
					onClose={() => setBuying(null)}
					onAccept={onBuy}
					closeLang="Cancel"
				>
					<>
						{loading && <Loader static text="Buying" />}
						<TextField
							fullWidth
							label="Price Per Unit"
							disabled={true}
							className={classes.editorField}
							value={CurrencyFormat.format(buying.Price)}
						/>
						<NumberFormat
							fullWidth
							required
							label="Quantity"
							className={classes.editorField}
							value={buying.Quantity}
							disabled={loading}
							onChange={(e) =>
								setBuying({
									...buying,
									Quantity: +e.target.value,
								})
							}
							type="tel"
							isNumericString
							customInput={TextField}
						/>
						<TextField
							fullWidth
							label="You Will Pay"
							disabled={true}
							className={classes.editorField}
							value={CurrencyFormat.format(
								buying.Price * buying.Quantity,
							)}
						/>
					</>
				</Modal>
			)}
		</>
	);
};
