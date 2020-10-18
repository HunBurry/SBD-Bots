module.exports = {
	name: 'loadout',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        kenetics = [
            "Cerberus+1", "Monte Carlo", "SUROS Regime", "Sweet Business", "Wish-Ender", "Bastion", "Witherhoard", "Ace of Spades", 
            "Crimson", "Lumina", "Malfeasance", "Sturm", "The Last Word", "Thorn", "Arbalest", "Bad Juju", "Outbreak Perfected", 
            "Vigilance Wing", "MIDA Multi-Tool", "The Jade Rabbit", "The Chaperone", "Rat King", "Traveler's Chosen", "Izanagi's Burden", 
            "The Huckleberry", "BrayTech Werewolf", "BrayTech Winter Wolf", "Breakneck", "Duty Bound", "Ether Doctor", "False Promises", 
            "Foregone Conclusion", "Gahlran's Right Hand", "Ghost Primus", "Guiding Star", "Halfdan-D", "Halfdan-D", "Hazard of the Cast", 
            "Horror Story", "Loquitor IV", "Origin Story", "Orimund's Anvil", "Pluperfect", "Scathelocke", "Seventh Seraph Carbine", 
            "Steelfeather Repeater", "The Doubt", "The Forward Path", "The Forward Path", "The Last Breath",
            "Tigerspite", "Accrued Redemption", "No Turning Back", "The Spiteful Fang", "Whispering Slab", "The Militia's Birthright", 
            "The Mountaintop", "Agamid", "Austringer", "Bad News", "Bad News XF4354", "Better Devils", "Better Devils", "Crimil's Dagger", 
            "Crimil's Dagger", "D.F.A.", "Dire Promise", "Dire Promise", "Duke Mk. 44", "Home for the Lost", "Judgment", "Living Memory", 
            "Loud Lullaby", "Midnight Coup", "Pribina-D", "Pribina-D", "Rose", "Service Revolver", "Service Revolver", 
            "Seventh Seraph Officer Revolver", "Spare Rations", "Ten Paces", "The Old Fashioned", "The Old Fashioned", "The Steady Hand", 
            "True Prophecy", "True Prophecy", "Warden's Law", "West of Sunfall 7", "Autumn Wind", "Battle Scar", "Blast Furnace", "Bygones", 
            "Chattering Bone", "Cold Denial", "Disrespectful Stare", "Eternal Slumber", "Eystein-D", "Eystein-D", "Go Figure",
            "Legal Action II", "Lincoln Green", "Machina Dei 4", "Magnum Shepherd", "Nightshade", "Nightshade", "Redrix's Broadsword", 
            "Redrix's Claymore", "Relentless", "Sacred Provenance", "The Marine", "The Time-Worn Spire", "Three Graves", "Call to Serve", 
            "Does Not Compute", "Does Not Compute", "Frontier Justice", "Garden Progeny 1", "Good Counsel IX", "Haunted Earth", "Imperative", 
            "Nameless Midnight", "Nameless Midnight", "Niflheim Frost", "Night Watch", "Patron of Lost Causes", "Purpose", 
            "Randy's Throwing Knife", "Song of Justice VI", "Talons of the Eagle", "Telemachus-C", "The Dream", "The Guiding Sight", 
            "The Scholar", "Transfiguration", "Wrong Side of Right", "Astral Horizon", "Baligant", "Baligant XU7743", "Blasphemer", 
            "Dust Rock Blues", "Hawthorne's Field-Forged Shotgun", "Hawthorne's Field-Forged Shotgun", "Imperial Decree", "One Small Step", 
            "Parcel of Stardust", "Perfect Paradox", "Perfect Paradox", "Threat Level", "Toil and Trouble",
            "Allied Demand", "Athelflad-D", "Breachlight", "Buzzard", "Controlling Vision", "Enigma's Draw", "Enigma's Draw", 
            "Last of the Legion", "Lonesome", "Minimum Distance", "Peace by Consensus", "Smuggler's Word", "Spoiler Alert", 
            "Vertical Orbit QSm", "Alone as a god", "Bite of the Fox", "Dreaded Venture", "Eye of Sol", "Long Shadow", "Revoker", 
            "Shepherd's Watch", "Show of Force XF4865", "Silicon Neuroma", "The Frigid Jackal", "The Supremacy", "Tranquility", 
            "Adjudicator", "Antiope-D", "Antiope-D", "Atalanta-D", "Atalanta-D XG1992", "Beidenhander", "Cold Front", "Escape Velocity", 
            "Escape Velocity", "Exit Strategy", "Hard Truths", "Imminent Storm", "Motion to Suppress", "Multimach CCX", "New City", "Pillager", 
            "The Conqueror 2", "The Showrunner", "Trackless Waste", "Cuboid ARu", "Cuboid ARu", "Lionheart", "Rebuke AX-GL", "Ros Lysis II",
            "Azimuth DSu", "Azimuth DSu", "Ballyhoo Mk.27", "Ballyhoo Mk.27", "Guseva-C", "Bayesian MSu", "Bayesian MSu", "Nanty Narker", 
            "Psi Cirrus II", "Psi Cirrus II", "Armillary PSu", "Armillary PSu", "Trax Dynia", "Trax Lysis II", "Trax Lysis II", 
            "Badlands Mk.24", "Botheration Mk.28", "Roderic-C", "Roderic-C", "Aachen-LR2", "Philippis-B", "Philippis-B", "Protostar CSu", 
            "Protostar CSu", "Sondok-C", "Cydonia-AR1", "Home Again", "SUROS Throwback", "Mos Ultima II", "One Earth", "Picayune Mk. 33", 
            "Psi Ferox II", "Psi Termina II", "Standing Tall", "Triumph DX-PR", "Fare-Thee-Well", "Inverness-SR2", "Trax Arda II", 
            "Khvostov 7G-02", "Origin Story", "Pariah", "Headstrong", "Lost and Found", "Thistle and Yew", 
            "Traveler's Chosen", "Traveler's Chosen (Damaged)"
        ]

        energy = [
            "Hard Light", "Tommy's Matchbook", "Le Monarque", "Trinity Ghoul", "Jötunn", "Merciless", "Telesto", 
            "Fighting Lion", "Eriana's Vow", "Sunshot", "Graviton Lance", "Polaris Lance", "Skyburner's Oath", "Symmetry", 
            "Lord of Wolves", "The Fourth Horseman", "Devil's Ruin", "Borealis", "Riskrunner", "Tarrabah", "Coldheart", "Divinity", 
            "Prometheus Lens", "Ruinous Effigy", "Wavesplitter", "Age-Old Bond", "Arc Logic", "Dark Decider", "Galliard-42", 
            "Galliard-42 XN7568", "Gnawing Hunger", "Hollow Earth", "Jiangshi AR4", "Kibou AR3", "Martyr's Make", "Medley-45", "Misfit", 
            "Null Calamity 9", "Perseverance", "Positive Outlook", "Prosecutor", "Reckless Oracle", "Restoration VIII", 
            "Solemn Hymn", "The Number", "The Ringing Nail", "The Summoner", "Uriel's Gift", "Uriel's Gift", "Valakadyn",
            "Arsenic Bite-4b", "Hush", "Point of the Stag", "Subtle Calamity", "The Vow", "Tyranny of Heaven", "Cartesian Coordinate", 
            "Conjecture TSc", "Critical Sass", "Dream Breaker", "Elatha FR4", "Elatha FR4", "Erentil FR4", "Erentil FR4", "Exile's Curse", 
            "Gallant Charge", "Hollow Words", "Loaded Question", "Main Ingredient", "Main Ingredient", "Nox Echo III", "Nox Veneris II", 
            "Proelium FR3", "Proelium FR3", "Shock and Awe", "Techeun Force", "Tempered Dynamo", "The Emperor's Envy", "The Epicurean", 
            "The Wizened Rebuke", "The Wizened Rebuke", "Timelines' Vertex", "Timelines' Vertex", "Zealot's Reward", "Flash and Thunder", 
            "Martyr's Retribution", "Orewing's Maul", "Orewing's Maul", "Truthteller", "Truthteller", "A Cold Sweat", "Ancient Gospel", 
            "Annual Skate", "Daedalus Code", "Finite Impactor", "IKELOS_HC_v1.0.1", "IKELOS_HC_v1.0.2", "Imset HC4", "Jack Queen King 3",
            "Kindled Orchid", "Luna's Howl", "Minuet-42", "Nation of Beasts", "Nature of the Beast", "Nature of the Beast", "Not Forgotten", 
            "Older Sister III", "Optative", "Shattered Peace", "The Defiant", "Thin Line", "Trust", "Waking Vigil", "Adhortative", 
            "Agenda 5", "Agrona PR4", "Cadenza-43", "Claws of the Wolf", "Darkest Before", "Heart of Time", "Horror's Least", "Impromptu-49", 
            "Inaugural Address", "Infinite Paths 8", "Infinite Paths 8", "Jian 7 Rifle", "Jian 7 Rifle", "Jorum's Claw", "Last Perdition", 
            "Last Perdition", "Nergal PR4", "Outlast", "Premonition", "Requiem-45", "Right Side of Wrong", "Swift Ride", "Swift Ride XE8375", 
            "Adverse Possession IX", "Black Scorpion-4sr", "Black Scorpion-4sr", "BrayTech RWP Mk. II", "Calusea Noblesse", 
            "Conspirator", "Contingency Plan", "Distant Relation", "Eternal Blazon", "Frostmire's Hex", "Manannan SR4",
            "Metronome-52", "Motion to Compel", "No Feelings", "Oxygen SR3", "Pleiades Corrector", "Seven-Six-Five", "Tango-45", 
            "Tango-45 XK5094", "The Cut and Run", "The End", "Tone Patrol", "Vacuna SR4", "Vouchsafe", "A Sudden Death", "Badlander", 
            "Basilisk", "Deadpan Delivery", "Emperor's Courtesy", "Felwinter's Lie", "First In, Last Out", "First In, Last Out", 
            "Good Bone Structure", "Good Bone Structure", "Gravity Slingshot", "Gunnora's Axe", "Gunnora's Axe", "IKELOS_SG_v1.0.1", 
            "IKELOS_SG_v1.0.2", "Last Man Standing", "Mindbender's Ambition", "Motion to Vacate", "Prophet of Doom", "Python", 
            "Quitclaim Shotgun III", "Retold Tale", "Retrofuturist", "Seventh Seraph CQC-12", "Somerled-D", "The Deicide", "Unification VII", 
            "Wishbringer", "Wishbringer", "Zenith of Your Kind", "18 Kelvins", "A Swift Verdict", "Anonymous Autumn", "Dead Man Walking", 
            "Dead Man Walking XX7463", "Death by Scorn", "Drang", "Drang (Baroque)", "Eleventh Hour", "Etana SI4", "Eulogy SI4", 
            "Interregnum XVI", "Last Hope", "Last Hope", "Seventh Seraph SI-2", "Swift Solstice", "The Fool's Remedy", "The Fool's Remedy", 
            "The Last Dance", "The Last Dance", "The Rattler", "The Vision", "Timecard", "Translation Theory", "Traveler's Judgment 5",
            "Traveler's Judgment 5", "Urchin-3si", "Vestian Dynasty", "A Single Clap", "Anniella", "Apostate", "Archimedes Truth", 
            "Belfry Bounty", "Beloved", "Copperhead-4sn", "Distant Tumulus", "Distant Tumulus", "Elegy-49", "Elegy-49", "Eye of Foresight", 
            "Fate Cries Foul", "Gentleman Vagabond", "IKELOS_SR_v1.0.1", "IKELOS_SR_v1.0.2", "Maestro-46", "Maxim XI", "Occluded Finality", 
            "Omniscient Eye", "Persuader", "Persuader", "Show of Force", "Sole Survivor", "Tatara Gaze", "The Domino", "The Long Goodbye", 
            "The Long Walk", "The Mornin' Comes", "Trophy Hunter", "Twilight Oath", "Veleda-D", "Widow's Bite", "Widow's Bite", "Bad Reputation", 
            "Breath of the Dragon", "Bug-Out Bag", "CALUS Mini-Tool", "Death Adder", "Death Adder", "Every Waking Moment", "Foggy Notion", 
            "IKELOS_SMG_v1.0.1", "IKELOS_SMG_v1.0.2", "MIDA Mini-Tool", "Mob Justice", "Out of Options", "Phosphorus MG4", "Radiant Stardust",
            "Red Mamba", "Resonance-42", "Royal Dispensation II", "Seventh Seraph VY-7", "Sol Pariah 6", "Stochastic Variable", "Subjunctive", 
            "The Hero's Burden", "The Hero's Burden", "The Quickstep", "The Recluse", "Refrain-23", "Refrain-23", "Sand Wasp-3au", 
            "Sand Wasp-3au", "Yellowjacket-3au", "Nox Cordis II", "Nox Cordis II", "Nox Lumen II", "Nox Lumen II", "Parsec TSu", "Parsec TSu",
            "Harsh Language", "Allegro-34", "Allegro-34", "Lamia HC2", "Lamia HC2", "Presto-48", "Agrona PR2", "Agrona PR2",
            "Encore-25", "Encore-25", "Black Tiger-2sr", "Black Tiger-2sr", "Madrugada SR2", "Madrugada SR2", "Sonata-48", "Badlands Mk.24", 
            "Botheration Mk.28", "Fussed Dark Mk.21", "Fussed Dark Mk.21", "Requiem-43", "Dissonance-34", "Dissonance-34", "Requiem SI2", 
            "Requiem SI2", "Vinegaroon-2si", "Vinegaroon-2si", "Aachen-LR2", "Damietta-LR2", "Damietta-LR2", "Tongeren-LR3", "Tongeren-LR3", 
            "Furina-2mg", "Furina-2mg", "Harmony-21", "Harmony-21", "Whip Scorpion-3mg", "Jiangshi AR1", "Equinox Tsu", "Nox Calyx II", 
            "Nox Reve II", "Resilient People", "Minuet-12", "Cadenza-11", "Sea Scorpion-1sr", "Ded Acumen II", "Ded Nemoris II", 
            "Hand in Hand", "Recital-17", "Victoire SI2", "Luna Nullis II", "Trondheim-LR2", "Troubadour", "Daystar SMG2", "Forte-15", 
            "Stay Away", "Helios HC1", "Stubborn Oak", "Spiderbite-1si", "The Last Dance", "Dead Zone Rifle", "Etude-12", "Sorrow MG2"
        ]

        power = [
            "Leviathan's Breath", "One Thousand Voices", "Anarchy", "The Colony", "The Prospector", "Sleeper Simulant", "The Queenbreaker", 
            "Heir Apparent", "Thunderlord", "Xenophage", "Deathbringer", "The Wardcliff Coil", "Truth", "Two-Tailed Fox", "Legend of Acrius", 
            "Legend of Acrius", "Tractor Cannon", "D.A.R.C.I.", "Whisper of the Worm", "Black Talon", "Worldline Zero", "Crown-Splitter", 
            "Throne-Cleaver", "Goldtusk", "Quickfang", "Death's Razor", "Eternity's Edge", "Acantha-D", "Acantha-D XK8434", "Berenger's Memory", 
            "Berenger's Memory", "Bushwhacker", "Courageous Surrender", "Doomsday", "Edge Transit", "I Am Alive", "Interference VI", "Interference VI", 
            "Love and Death", "Memory Interdict", "Orthrus", "Outrageous Fortune", "Play of the Game", "Play of the Game", "Sunrise GL4", 
            "Swarm of the Raven", "Terran Wind", "The Day's Fury", "The Permanent Truth", "Through Fire and Flood",
            "Wendigo GL3", "Wicked Sister", "Crooked Fang-4fr", "Crooked Fang-4fr", "Dead-Ender", "Komodo-4FR", "Line in the Sand", 
            "Man o' War", "Tarantula", "21% Delirium", "A Fine Memorial", "Avalanche", "Bane of Sorrow", "Edgewise", "Fixed Odds", 
            "Hammerhead", "Seventh Seraph SAW", "Temporal Clause", "Apex Predator", "Bad Omens", "Bellowing Giant", "Blue Shift", 
            "BrayTech Osprey", "Broadsword Launcher", "Classical-42", "Countess SA/2", "Curtain Call", "Heretic", "Hoosegow", "Hoosegow", 
            "Hoosegow XE5837", "Morrigan-D", "Mos Epoch III", "Mos Epoch III", "Pentatonic-48", "Pit Launcher", "Pyroclastic Flow", 
            "Roar of the Bear", "Scipio-D", "Shining Sphere", "Shining Sphere", "Sins of the Past", "Sleepless", "The Button", "Tiebreaker", 
            "Tomorrow's Answer", "Zenobia-D", "Zenobia-D", "Abide the Return", "Complex Solution",
            "Double-Edged Answer", "Falling Guillotine", "Future Safe 10", "Hagakure", "Honor's Edge", "Honor's Edge", "It Stared Back", 
            "Just in Case", "Negative Space", "Negative Space", "Night Terror", "Steel Sybil Z-14", "Steel Sybil Z-14", "Stryker's Sure-Hand", 
            "Temptation's Hook", "Traitor's Fate", "Unspoken Promise", "Zephyr", "Plemusa-B", "Plemusa-B", "Stampede Mk.32", "Stampede Mk.32", 
            "King Cobra-4fr", "Cup-Bearer SA/2", "Cup-Bearer SA/2", "Reginar-B", "Reginar-B", "Weaver-C", "Future Imperfect", "Future Imperfect", 
            "Rest for the Wicked", "Rest for the Wicked", "Gareth-C", "Hadrian-A", "Para Torus I", "Penumbra GSm", "Butler RS/2", "Nasreddin", "Traitor's Fate"
        ]

        kinR = Math.floor(Math.random() * kenetics.length);
        kinIQ = kenetics[kinR];
        energyR = Math.floor(Math.random() * energy.length);
        energyIQ = energy[energyR];
        powerR = Math.floor(Math.random() * power.length);
        powerIQ = power[powerR];

        const embed = {
            "title": "Random Loadout",
            'description': 'Kenetic: ' + kinIQ + "\nEnergy: " + energyIQ + "\nPower: " + powerIQ
        }

        message.channel.send({
            embed
        });
    },
};