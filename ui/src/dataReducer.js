export const initialState = {
	data: {
		installed: [],
		home: [],
		dock: [],
		externalJobs: ['police', 'ems'],
		player: null,
		playerJobPerms: null,
		JobData: null,
		externalJobs: [],
		onDuty: null,
		player: {
			Source: 1,
			_id: '6088b90c93a7b379e0c83ef2',
			ID: '6088b90c93a7b379e0c83ef2',
			User: '606c22a749c1c980e8289b35',
			SID: 1,
			Phone: '121-195-9016',
			Gender: 0,
			Callsign: 404,
			Job: {
				Workplace: {
					Id: 'dyn8',
					Name: 'Dynasty 8',
				},
				Name: 'Real Estate',
				Grade: {
					Id: 'owner',
					Name: 'Owner',
				},
				Id: 'realestate',
			},
			Origin: 'United States',
			First: 'Testy',
			Last: 'McTest',
			DOB: '1991-01-01T07:59:59.000Z',
			LastPlayed: 1619819253000,
			Keys: {
				'60af7d605716b35d64c6c4a1': true,
			},
			Alias: {
				twitter: {
					avatar: '',
				},
				irc: 'anon6088b',
				redline: 'Test',
			},
			Crypto: {
				ZRM: 100,
				VRM: 10000,
				MEME: 100,
			},
			Animations: {
				expression: 'default',
				walk: 'default',
				emoteBinds: [],
			},
			Apps: {
				home: [
					'redline',
					'blueline',
					'twitter',
					'leoassist',
					'bank',
					'loans',
					'email',
					'irc',
					'adverts',
					'contacts',
					'phone',
					'store',
					'settings',
					'messages',
					'labor',
					'comanager',
					'crypto',
					'dyn8',
					'homemanage',
					'govt',
					'garage',
					'pingem',
					'calculator',
					'documents',
					'cityservices',
				],
				dock: ['contacts', 'phone', 'messages', 'blueline'],
				installed: [
					'redline',
					'blueline',
					'twitter',
					'leoassist',
					'bank',
					'loans',
					'calculator',
					'email',
					'irc',
					'adverts',
					'contacts',
					'phone',
					'store',
					'settings',
					'messages',
					'labor',
					'comanager',
					'crypto',
					'dyn8',
					'homemanage',
					'govt',
					'garage',
					'pingem',
					'documents',
					'cityservices',
				],
			},
			Armor: 100,
			HP: 200,
			PhonePermissions: {
				redline: {
					create: true,
				},
			},
			PhoneSettings: {
				texttone: 'text1.ogg',
				ringtone: 'ringtone1.ogg',
				wallpaper: 'wallpaper',
				colors: {
					accent: '#1a7cc1',
				},
				notifications: true,
				zoom: 105,
				volume: 100,
				appNotifications: [],
			},
			Status: {
				PLAYER_HUNGER: 71,
				PLAYER_THIRST: 72,
			},
			States: ['PHONE_VPN', 'RACE_DONGLE', 'ACCESS_LSUNDERGROUND'],
			Reputations: {
				Racing: 5000,
			},
		},
		playerJobPerms: {
			JOB_FIRE: true,
			JOB_HIRE: true,
			JOB_FLEET_ACCESS: true,
			JOB_MANAGE_EMPLOYEES: true,
			JOB_SUPERVISOR: true,
			JOB_PAY_EMPLOYEES: true,
			JOB_PAY_CUSTOMERS: true,
		},
		JobData: {
			Id: 'realestate',
			Name: 'Real Estate',
			Owner: '6088b90c93a7b379e0c83ef2',
			Upgrades: {
				COMPANY_FLEET: true,
			},
			Workplaces: [
				{
					Name: 'Dynasty 8',
					Id: 'dyn8',
					Grades: [
						{
							Name: 'Intern',
							Id: 'intern',
							Level: 1,
							Permissions: {
								JOB_DOORS: true,
							},
						},
						{
							Name: 'Agent',
							Id: 'agent',
							Level: 2,
							Permissions: {
								JOB_DOORS: true,
								JOB_SELL: true,
							},
						},
					],
				},
			],
		},
		jobPermissions: {
			JOB_FIRE: 'Fire Employees',
			JOB_HIRE: 'Hire Employees',
			JOB_FLEET_ACCESS: 'Access Company Fleet',
			JOB_MANAGE_EMPLOYEES: 'Manage Employees',
			JOB_MANAGEMENT: 'Company Management',
			JOB_PAY_EMPLOYEES: 'Pay Internal',
			JOB_PAY_CUSTOMERS: 'Pay External',
		},
		JobPermissions: {
			realestate: {
				JOB_SELL: true,
			},
		},
		settings: {
			wallpaper: 'wallpaper',
			ringtone: 'ringtone1.ogg',
			texttone: 'text1.ogg',
			colors: {
				accent: '#9a0c1e',
			},
			zoom: 80,
			volume: 100,
			notifications: true,
			appNotifications: {
				messages: true,
			},
		},
		installed: [
			'contacts',
			'phone',
			'messages',
			'store',
			'settings',
			'email',
			'irc',
			'bank',
			'loans',
			'twitter',
			'adverts',
			'redline',
			'blueline',
			'leoassist',
			'comanager',
			'labor',
		],
		home: [
			'comanager',
			'contacts',
			'phone',
			'messages',
			'store',
			'settings',
			'email',
			'irc',
			'bank',
			'loans',
			'twitter',
			'adverts',
			'redline',
			'blueline',
			'leoassist',
			'labor',
		],
		dock: ['contacts', 'phone', 'messages'],
		contacts: [
			{
				_id: 'abc123',
				name: 'Test',
				number: '555-555-5555',
				favorite: true,
				color: '#1a7cc1',
				avatar: 'https://i.pinimg.com/736x/4a/8b/b1/4a8bb1a316a7179eda8ccbea3ab027b2--oregon-ducks-football-football-s.jpg',
			},
			{
				_id: 'abc124',
				name: 'Test 2',
				number: '555-555-5552',
				favorite: false,
				color: '#1a7cc1',
				avatar: 'https://i.pinimg.com/236x/df/19/14/df19146777544b82d08e06d3dd102df4.jpg',
			},
		],
		myDocuments: [
			{
				_id: '5',
				time: 1645020394,
				title: 'Lol',
				content: 'https://i.imgur.com/DApQ1VZ.png <b>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</b>',
				shared: false,
				owner: '6088b90c93a7b379e0c83ef2',
			},
			{
				_id: '6',
				time: 1645020394,
				title: 'Lol 2',
				content: '<p class="ql-align-center"><span class="ql-size-huge">asdasdasdasd</span></p><p><br></p><pre class="ql-syntax" spellcheck="false">asdfsdfsdfsdfsdfsdfs</pre><p><br></p><p><br></p><p>Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. Hello, thjis is a test word sentences yeah bla bla bla. </p>',
				shared: true,
				requestSignature: true,
				signed: [
					{
						ID: '6088b90c93a7b379e0c83ef2',
					}
				]
			},
		],
		messages: [
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 1,
				time: 1583397349801,
				message:
					'This is a fucking dumb thing that I really hope may possibly fucking work but I really dont know fucking hell dumb bitchass whore',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 0,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 1,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 1,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 0,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 1,
				time: 1583397349801,
				message: 'ircinvite=1',
				unread: true,
			},
		],
		calls: [
			{
				owner: '555-555-5555',
				number: '555-555-5555',
				method: 1,
				anonymous: 1,
				time: 1583397349801,
				duration: 122,
				limited: true,
			},
		],
		emails: [
			{
				_id: '1',
				sender: 'chop@mechanics.onion',
				subject: 'Offer Expires Soon',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
					expires: Date.now() + 100000,
					hyperlink: {},
				},
			},
			{
				_id: '2',
				sender: 'fuckyou@suckmyass.com',
				subject:
					'I Want To Fucking Die I Want To Fucking Die I Want To Fucking Die I Want To Fucking Die I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '3',
				sender: 'fuckyou1@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: Date.now(),
			},
			{
				_id: '4',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '5',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '6',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '7',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '8',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '9',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '10',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '11',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '12',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '13',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '14',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '15',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '16',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '17',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '18',
				sender: 'fuckyou@suckmyass.com',
				subject: 'I Want To Fucking Die',
				body: 'Why in the absolute fuck do we do this to ourselves? Like all this bullshit to just entertain randoms on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
		],
		adverts: {
			1: {
				id: 1,
				author: 'Some Name',
				number: '555-555-5551',
				time: 1583397349801,
				title: 'This is a title 😀',
				price: 400,
				short: "This is a short description of what you're offering",
				full: 'This is a much more depthful description of what service you are currently offering.<br />This should support formatting in some manor, maybe see if we can find some sort of WYSIWYG editor?',
				categories: ['Services'],
			},
			2: {
				id: 2,
				author: 'Some Other Name',
				number: '555-555-5552',
				time: 1583397349801,
				price: 400,
				title: 'This is a title 😀',
				short: "This is a short description of what you're offering",
				full: 'This is a much more depthful description of what service you are currently offering.<br />This should support formatting in some manor, maybe see if we can find some sort of WYSIWYG editor?',
				categories: ['Services', 'Want-To-Sell'],
			},
			3: {
				id: 3,
				author: 'Fuck Me',
				number: '555-555-5553',
				time: 1583397349811,
				price: 400,
				title: 'This is a title 😀',
				short: "This is a short description of what you're offering",
				full: 'This is a much more depthful description of what service you are currently offering.<br />This should support formatting in some manor, maybe see if we can find some sort of WYSIWYG editor?',
				categories: ['Help Wanted'],
			},
			4: {
				id: 4,
				author: 'Fuck Me',
				number: '555-555-5553',
				time: 1583397349811,
				price: 400,
				title: 'asdfasdfasdfasdfasdfasdfasdfadfsasdf',
				short: "This is a short description of what you're offering",
				full: 'This is a much more depthful description of what service you are currently offering.<br />This should support formatting in some manor, maybe see if we can find some sort of WYSIWYG editor?',
				categories: [
					'Services',
					'Want-To-Sell',
					'Want-To-Buy',
					'Help Wanted',
				],
			},
		},
		ircChannels: [
			{
				_id: 'random',
				slug: 'random',
				joined: 1618556985000,
			},
			{
				_id: 'random2',
				slug: 'random2',
				joined: 1618556985000,
			},
			{
				_id: 'random3',
				slug: 'random3',
				joined: 1618556985000,
			},
		],
		['irc-random2']: [
			{
				channel: 'random2',
				from: '6071b26d8a91211358bd5e89',
				time: 1618556984000,
				message: 'asdadasd',
			},
			{
				channel: 'random2',
				from: '6071b26d8a91211358bd5e89',
				time: 1618556985000,
				message: 'https://www.youtube.com/watch?v=U71qJgTrNbI',
			},
			{
				channel: 'random2',
				from: '6071b26d8a91211358bd5e89',
				time: 1618556987000,
				message: 'https://i.imgur.com/9rImqHv.jpeg',
			},
			{
				channel: 'random2',
				from: '6071b26d8a91211358bd5e89',
				time: 1618556987000,
				message:
					'asdasdasdadsasd this is a word that I think may to channel',
			},
		],
		bankLoans: {
			creditScore: 750,
			loans: [
				{
					_id: 'loan1',
					Type: 'vehicle',
					VehicleName: '2023 Tesla Model S',
					VIN: 'ABC123XYZ',
					Amount: 85000,
					Remaining: 65000,
					NextPayment: (Date.now() / 1000) + 604800,
					InterestRate: 5.5,
					TotalPayments: 52,
					PaidPayments: 15,
					MissedPayments: 0,
					Defaulted: false,
					MissablePayments: 3,
				},
				{
					_id: 'loan2',
					Type: 'property',
					PropertyName: '1 Grove St',
					PropertyId: 'grove1',
					Amount: 250000,
					Remaining: 180000,
					NextPayment: (Date.now() / 1000) + 259200,
					InterestRate: 4.2,
					TotalPayments: 104,
					PaidPayments: 28,
					MissedPayments: 0,
					Defaulted: false,
					MissablePayments: 3,
				},
			],
		},
		tweets: [],
		bankAccounts: {
			accounts: [],
			transactions: {},
			pendingBills: [],
		},
		loans: [],
		leoAlerts: [],
		tracks: [],
		tracks_pd: [
			{
				_id: 1,
				Name: 'Track Name',
				Distance: '10.1 Miles',
				Type: 'p2p',
				Checkpoints: [],
			},
		],
		jobs: {
			Illegal: {
				Name: 'Illegal',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
				Restricted: {
					state: 'PHONE_VPN',
				},
			},
			Miner: {
				Name: 'Miner',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
			Farmer: {
				Name: 'Farmer',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
			Salvager: {
				Name: 'Salvager',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
		},
		workGroups: [
			{
				_id: 1,
				Creator: {
					ID: 6,
					First: 'Test',
					Last: 'McTest',
				},
				Members: [
					{
						ID: 1,
						First: 'Kek',
						Last: 'W',
					},
					{
						ID: 5,
						First: 'Big',
						Last: 'Oof',
					},
					{
						ID: 6,
						First: 'Small',
						Last: 'Oof',
					},
				],
			},
			{
				_id: 2,
				Creator: {
					ID: 2,
					First: 'Test',
					Last: 'McTest',
				},
				Members: [],
			},
			{
				_id: 3,
				Creator: {
					ID: 3,
					First: 'Test',
					Last: 'McTest',
				},
				Members: [],
			},
		],
		// companyRoster: [
		// 	{
		// 		_id: '123',
		// 		ID: 'id1',
		// 		SID: 1,
		// 		First: 'Test',
		// 		Last: 'Testy',
		// 		Phone: '123-456-7890',
		// 		Licenses: {
		// 			Hunting: {
		// 				Active: false,
		// 			},
		// 			Drivers: {
		// 				Points: 0,
		// 			},
		// 			Fishing: {
		// 				Active: false,
		// 			},
		// 			Weapons: {
		// 				Active: false,
		// 			},
		// 		},
		// 		Callsign: 400,
		// 		Job: {
		// 			Id: 'police',
		// 			Name: 'Police',
		// 			Workplace: {
		// 				Id: 'sasp',
		// 				Name: 'San Andreas State Police',
		// 			},
		// 			Grade: {
		// 				Id: 'colonel',
		// 				Name: 'Colonel',
		// 			},
		// 		},
		// 	},
		// 	{
		// 		_id: 'id2',
		// 		ID: 'id2',
		// 		SID: 2,
		// 		First: 'Test',
		// 		Last: 'Testy',
		// 		Phone: '123-456-7890',
		// 		Licenses: {
		// 			Hunting: {
		// 				Active: false,
		// 			},
		// 			Drivers: {
		// 				Points: 0,
		// 			},
		// 			Fishing: {
		// 				Active: false,
		// 			},
		// 			Weapons: {
		// 				Active: false,
		// 			},
		// 		},
		// 		Callsign: 400,
		// 		Job: {
		// 			Id: 'police',
		// 			Name: 'Police',
		// 			Workplace: {
		// 				Id: 'sasp',
		// 				Name: 'San Andreas State Police',
		// 			},
		// 			Grade: {
		// 				Id: 'trooper',
		// 				Name: 'State Trooper',
		// 				Level: 4,
		// 			},
		// 		},
		// 	},
		// 	{
		// 		_id: '321',
		// 		ID: 'id3',
		// 		SID: 3,
		// 		First: 'Test',
		// 		Last: 'Testy',
		// 		Phone: '123-456-7890',
		// 		Licenses: {
		// 			Hunting: {
		// 				Active: false,
		// 			},
		// 			Drivers: {
		// 				Points: 0,
		// 			},
		// 			Fishing: {
		// 				Active: false,
		// 			},
		// 			Weapons: {
		// 				Active: false,
		// 			},
		// 		},
		// 		Callsign: 404,
		// 		Job: {
		// 			Id: 'police',
		// 			Name: 'Police',
		// 			Workplace: {
		// 				Id: 'lspd',
		// 				Name: 'Los Santos Police Department',
		// 			},
		// 			Grade: {
		// 				Id: 'chief',
		// 				Name: 'Chief',
		// 				Level: 9,
		// 			},
		// 		},
		// 	},
		// ],
		// companyUpgrades: [
		// 	{
		// 		value: 'COMPANY_FLEET',
		// 		label: 'Company Vehicle Fleet',
		// 		price: 50000,
		// 	},
		// ],
		cryptoCoins: [
			{
				Name: 'Vroom',
				Short: 'VRM',
				Price: 1,
				Sellable: false,
			},
			{
				Name: 'Memes',
				Short: 'MEME',
				Price: 150,
				Sellable: true,
				Buyable: true,
			},
			{
				Name: 'Small Weiner Club',
				Short: 'SWC',
				Price: 5000,
				Sellable: false,
				Buyable: true,
			},
		],
		govtServices: [
			{
				_id: 1,
				Label: 'Business Registration',
				Price: 25000,
				Event: 'CreateBusiness',
				Disclaimer:
					'Registering a company will immediately remove you from your current employment. You may not purchase this if you already own a company.<br /><br />You will be able to name your company via the Company Management app after purchasing this service.',
			},
		],
		myProperties: Array(),
		propertyUpgrades: {
			house: {
				storage: {
					name: "Storage",
					levels: [
						{
							name: "Storage Level 1",
						},
						{
							name: "Storage Level 2",
						}
					]
				},
				garage: {
					name: "Garage",
					levels: [
						{
							name: "Garage Level 1",
						},
						{
							name: "Garage Level 2",
						}
					]
				},
				interior: {
					name: "interior",
					levels: [
						{
							id: "house_apartment1",
							name: "Interior Bla Bla",
						},
						{
							id: "house_apartment2",
							name: "Interior Bla 2",
						},
					]
				},
			}
		},
		myVehicles: Array(),
		garages: {
			sa_ave_downtown: {
				label: 'Garage 1',
				coords: {
					x: 0,
					y: 0,
					z: 0,
				},
			},
			impound: {
				label: 'Impound Yard',
				coords: {
					x: 0,
					y: 0,
					z: 0,
				},
			},
		},
	},
};
export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]: action.payload.data,
				},
			};
		case 'RESET_DATA':
			return initialState;
		case 'ADD_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]:
						state.data[action.payload.type] != null
							? Object.prototype.toString.call(
									state.data[action.payload.type],
							  ) == '[object Array]'
								? action.payload.first
									? [
											action.payload.data,
											...state.data[action.payload.type],
									  ]
									: [
											...state.data[action.payload.type],
											action.payload.data,
									  ]
								: action.payload.key
								? {
										...state.data[action.payload.type],
										[action.payload.key]:
											action.payload.data,
								  }
								: {
										...state.data[action.payload.type],
										...action.payload.data,
								  }
							: [action.payload.data],
				},
			};
		case 'UPDATE_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]:
						Object.prototype.toString.call(
							state.data[action.payload.type],
						) == '[object Array]'
							? state.data[action.payload.type].map((data) =>
									data._id == action.payload.id
										? { ...action.payload.data }
										: data,
							  )
							: (state.data[action.payload.type] = action.payload
									.key
									? {
											...state.data[action.payload.type],
											[action.payload.id]: {
												...state.data[
													action.payload.type
												][action.payload.id],
												[action.payload.key]:
													action.payload.data,
											},
									  }
									: {
											...state.data[action.payload.type],
											[action.payload.id]:
												action.payload.data,
									  }),
				},
			};
		case 'REMOVE_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]:
						Object.prototype.toString.call(
							state.data[action.payload.type],
						) == '[object Array]'
							? state.data[action.payload.type].filter((data) => {
									return Object.prototype.toString.call(
										data,
									) == '[object Object]'
										? action.payload.key
											? data[action.payload.key] !=
											  action.payload.id
											: data._id != action.payload.id
										: data != action.payload.id;
							  })
							: (state.data[action.payload.type] = Object.keys(
									state.data[action.payload.type],
							  ).reduce((result, key) => {
									if (key != action.payload.id) {
										result[key] =
											state.data[action.payload.type][
												key
											];
									}
									return result;
							  }, {})),
				},
			};
		default:
			return state;
	}
};
