DELETE FROM Foresporsler;
DELETE FROM HundeEiere;
DELETE FROM HundePassere;
DELETE FROM Hunder;
INSERT INTO Foresporsler(eierID, passerID, dato, akseptert) VALUES(1,1,CURRENT_TIMESTAMP,0);
SELECT * FROM Foresporsler;

ALTER TABLE HundePassere ADD COLUMN aktiv BIT;

UPDATE HundeEiere SET aktiv=1;