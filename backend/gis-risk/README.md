# Welcome to GIS Risk

# Flight Radar Data Import

# Step 1: Spin up Docker Image to support PostGIS deployment

docker network create postgresnet

docker run -d --name postgis --network=”postgresnet” -e POSTGRES_PASSWORD=fr24Password -e POSTGRES_DB=flightradar -p 5432:5432 postgis/postgis 

### Add your email in replace of admin@gmail.com (use listed line below, email/pass accurate here)
docker run -d -p 8080:80 --network=”postgresnet” -e PGADMIN_DEFAULT_EMAIL=admin@gmail.com -e PGADMIN_DEFAULT_PASSWORD=pgadmin_password dpage/pgadmin4

# Step 2: Create, Server, Reference Docker Name
## (data_input.py)

## Validate data is within PostGIS using PgAdmin (make sure both are running before proceeding)

# Step 3: Insert data into PostGIS (Postgres) as needed, refer to (data_input.py) to do so.
- Coming data layers:
      - Energy Resilience
      - Nuclear Resilience
      - Crop Yield
      - EV Charger Mapping
        - Vegetation Risk

# Step 4.

## Set up Virtual Eng
python3 -m venv venv
source venv/bin/activate

## Spin up Flask

### Set env variables for Flask
- `set FLASK_APP=app`
- `set FLASK_ENV=development`
- `flask run`