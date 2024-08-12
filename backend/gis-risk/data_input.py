# ## Option 1: Python with Geopandas
# ## Option 2: gDAL's ogre to ogre

# # WHERE IS PLANES TABLE BEING IMPORTED INTO POSTGIS??

# # Part 1: Planes Table
# from sqlalchemy import create_engine
# engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")

import csv
from flask import session
import pandas as pd
import geopandas as gpd
from glob import glob

# files = glob("../data/gis-risk/flights.csv")
# print(len(files))


# file = files[0]
# df = pd.read_csv(file)
# print(df.head)

# print(df.columns)

# gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.longitude, df.latitude), crs=4326).drop(['latitude', 'longitude'], axis=1)
# print(gdf.head)

# gdf.to_postgis("flights", engine, if_exists="append", chunksize=10000)

# # from sqlalchemy import create_engine
# # # Note: Password = fr24Password, Localhost = localhost:5432 (Postgres instance), Database name = flightradar

# # engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")

from tqdm import tqdm

# # for file in tqdm(files):
# #     df = pd.read_csv(file)
# #     print(df.head)

# #     gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.longitude, df.latitude), crs=4326).drop(['latitude', 'longitude'], axis=1)

# #     print(gdf.head(2))

# #     gdf.to_postgres("flights", engine, if_exists="append", chunksize=10000)


# # Part 2: Airports Table
from sqlalchemy import create_engine, inspect
engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")


from geoalchemy2 import Geometry
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker

# # # Data Source: functions-insurance/backend/data/gis-risk/airports.csv
from shapely.geometry import Point
from geoalchemy2.shape import to_shape, from_shape

#files = glob("../data/gis-risk/airports.csv")
#print(len(files))
#file = files[0]
#df = pd.read_csv(file)
#print(df.head)
#print(df.columns)

Base = declarative_base()

# Check the table structure using SQLAlchemy inspector
engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")


class Airport(Base):
    __tablename__ = 'airports'
    
    ogc_fid = Column(Integer, primary_key=True)
    name = Column(String,)
    iata = Column(String)
    icao = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    country = Column(String)
    alt = Column(String)
    wkb_geometry = Column(Geometry("POINT", srid=4326, spatial_index=True))

    def __init__(self, row):
        self.name = row['name']
        self.iata = row['iata']
        self.icao = row['icao']
        self.lat = float(row['lat'])
        self.lon = float(row['lon'])
        self.country = row['country']
        self.alt = row['alt'] 
        self.wkb_geometry = from_shape(Point(self.lon, self.lat), srid=4326)

    def get_point(self):
        return to_shape(self.wkb_geometry)

SessionLocal = sessionmaker(bind=engine)
db_session = SessionLocal()
    
# Airport.__table__.create(engine)
      
import csv
with open('../data/gis-risk/airports.csv') as rdr:
    airports_rdr = csv.DictReader(rdr)
    for row in airports_rdr:
        airport = Airport(row)
        db_session.add(airport)

db_session.commit()
    
# Airport.__table__.create(engine)

# Session = sessionmaker(bind=engine)
# Session = Session()

# csv_file_path = '../data/gis-risk/airports.csv'

# with open(csv_file_path, newline='') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         airport = Airport(row)
#         session.add(airport)

# session.commit()


# # Part 3: New Airports table
#from sqlalchemy import create_engine
#engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")

#import pandas as pd
#import geopandas as gpd
#from glob import glob

# files = glob("data/gis-risk/airports.csv")
# print(len(files))


# file = files[0]
# df = pd.read_csv(file)
# print(df.head)

# print(df.columns)

# gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.longitude, df.latitude), crs=4326).drop(['latitude', 'longitude'], axis=1)
# print(gdf.head)

# gdf.to_postgis("flights", engine, if_exists="append", chunksize=10000)

# # from sqlalchemy import create_engine
# # # Note: Password = fr24Password, Localhost = localhost:5432 (Postgres instance), Database name = flightradar

# # engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")

from tqdm import tqdm

# # for file in tqdm(files):
# #     df = pd.read_csv(file)
# #     print(df.head)

# #     gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.longitude, df.latitude), crs=4326).drop(['latitude', 'longitude'], axis=1)

# #     print(gdf.head(2))

# #     gdf.to_postgres("flights", engine, if_exists="append", chunksize=10000)
