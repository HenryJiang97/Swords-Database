CREATE DATABASE sword;
USE sword;

-- Setup models

-- Blade table
CREATE TABLE blade (
	BID INT NOT NULL,
	TangType VARCHAR(50),
	Length FLOAT NOT NULL,
	MaxWidth FLOAT NOT NULL,
	Type VARCHAR(50) NOT NULL,
	CountryOfOrigin VARCHAR(50),
	YearMade VARCHAR(30), 
	Material VARCHAR(50) NOT NULL,
	Smith VARCHAR(50),

	PRIMARY KEY	(BID)
);


-- Hilt table
CREATE TABLE hilt (
	HID INT NOT NULL,
	YearMade VARCHAR(30),
	HandleMaterial VARCHAR(50) NOT NULL,
	Handedness VARCHAR(50),

	PRIMARY KEY (HID)
);



-- Sword table
CREATE TABLE sword (
	SID INT NOT NULL,
	BID INT NOT NULL,
	HID INT NOT NULL,
	CurrentLocation VARCHAR(50),
	TypologyID VARCHAR(50),
	CountryOfAssembly VARCHAR(50),
	Scabbard VARCHAR(50),

	PRIMARY KEY (SID),
	FOREIGN KEY (BID) REFERENCES blade(BID),
	FOREIGN KEY (HID) REFERENCES hilt(HID)
);



-- Guard table
CREATE TABLE guard (
	HID INT NOT NULL,
	GID INT NOT NULL,
	GuardType VARCHAR(50),
	Material VARCHAR(50) NOT NULL,

	PRIMARY KEY (HID, GID),
	FOREIGN KEY (HID) REFERENCES hilt(HID)
);


-- Pommel table
CREATE TABLE pommel (
	HID INT NOT NULL,
	PID INT NOT NULL,
	PommelType VARCHAR(50),
	AttatchementMethod VARCHAR(50),
	Material VARCHAR(50) NOT NULL,

	PRIMARY KEY (HID, PID),
	FOREIGN KEY (HID) REFERENCES hilt(HID)
);



-- Value 1
INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(1, "Through tang", 36, 2, "Oakshott type X", "Central Asia", "900 AD", "Pattern welded hypoutectoid steel", "Ulfberht");

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(1, "900 AD", "Unknown", "Ambidextrous");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(1, 1, 1, "Germanisches Nationalmuseum", "Oakshott type X", "France/Germany", NULL);

INSERT INTO guard(GID, HID, Material, GuardType)
VALUES(1, 1, "Bronze", "Peterson Type VI");

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(1, 1, "Peterson Type V1", "Peened", "Bronze");


-- Value 2
INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(2, "Hidden", 70.8, 2, "Katana", "Japan", "1300 AD", "Tamahagane steel", "Masamune");

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(2, NULL, "Unknown", "Ambidextrous");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(2, 2, 2, "National Institutes for Cultural Heritage in Japan", NULL, "Japan", NULL);

INSERT INTO guard(GID, HID, Material)
VALUES(2, 2, "Unknown");

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(2, 2, NULL, NULL, "Unknown");


-- Value 3
INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(3, NULL, 40.75, 3, "Pata", NULL, "1126 AD", "Wootz steel", NULL);

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(3, "1126 AD", "Steel", "Ambidextrous");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(3, 3, 3, "The Met", NULL, "India", NULL);

INSERT INTO guard(GID, HID, Material, GuardType)
VALUES(3, 3, "Steel/Gold", "Gauntlet");

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(3, 3, NULL, NULL, "Unknown");



-- Value 4
INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(4, "Full", 33, 2, "Elmslie Type 4b", "Austria", "1490 AD", "Toledo steel", NULL);

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(4, "1490 AD", "Wood/Brass", "Right handed");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(4, 4, 4, "Kunsthistorisches Museum", "Elmslie Type 4b", "Austria", NULL);

INSERT INTO guard(GID, HID, Material, GuardType)
VALUES(4, 4, "Iron", "Elmslie Type 15");

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(4, 4, "Elmslie Type CC1", "Riveted", "Iron");


INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(3, NULL, 40.75, 3, "Pata", NULL, 1126, "Wootz steel", "Unknown");

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(3, 1126, "Steel", "Ambidextrous");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(3, 3, 3, "The Met", NULL, "India", NULL);

INSERT INTO guard(GID, HID, Material, GuardType)
VALUES(3, 3, "Steel/Gold", "Gauntlet");

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(3, 3, NULL, NULL, "Unknown");



-- Value 5
INSERT INTO blade(BID, TangType, Length, MaxWidth, Type, CountryOfOrigin, YearMade, Material, Smith)
VALUES(5, "Through", 21.9, 1.8, "Straight", "Chu (present China)", "771 to 403 BC", "Bronze", NULL);

INSERT INTO hilt(HID, YearMade, HandleMaterial, Handedness)
VALUES(5, "771 to 403 BC", "Silk bound bronze", "Ambidextrous");

INSERT INTO sword(SID, BID, HID, CurrentLocation, TypologyID, CountryOfAssembly, Scabbard)
VALUES(5, 5, 5, "Hubei Provincial Museum, China", NULL, "Chu (present China)", NULL);

INSERT INTO guard(GID, HID, Material, GuardType)
VALUES(5, 5, "Unknown", NULL);

INSERT INTO pommel(PID, HID, PommelType, AttatchementMethod, Material)
VALUES(5, 5, "Disk", "Peened", "Dilk bound bronze");




-- Merge
SELECT sword.SID, sword.TypologyID, blade.TangType, hilt.HandleMaterial, Guard.GuardType, Pommel.PommelType
FROM sword, blade, hilt, guard, pommel
WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID;
