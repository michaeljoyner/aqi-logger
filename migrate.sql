DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS records;

CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY,
  idx TEXT NOT NULL,
  name TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL
);


CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY,
  city_id INTEGER NOT NULL,
  hour INTEGER,
  value INTEGER,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (city_id) 
    REFERENCES cities (id)
);

INSERT INTO cities (idx, name, lat, lng) 
VALUES 
  (1616, 'Taichung', 24.151958, 120.641092),
  (1596, 'Taipei', 25.062361, 121.526528),
  (12548, 'Pietermaritzburg', -25.637538, 30.337389),
  (10100, 'Rotherham', 53.40495, -1.455815);
