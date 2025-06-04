DELETE FROM Foresporsler;
INSERT INTO Foresporsler(eierID, passerID, dato, akseptert) VALUES(1,1,CURRENT_TIMESTAMP,0);
SELECT * FROM Foresporsler;

ALTER TABLE Foresporsler ADD COLUMN kommentar TEXT;