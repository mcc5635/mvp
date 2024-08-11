## Option 1: Python with Geopandas
## Option 2: gDAL's ogre to ogre

from sqlalchemy import create_engine
# Note: Password = fr24Password, Localhost = localhost:5432 (Postgres instance), Database name = flightradar
engine = create_engine("postgresql://postgres:fr24Password@localhost:5432/flightradar")

from geoalchemy2 import Geometry
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)
session = Session()

# Data Source: functions-insurance/backend/data/gis-risk/airports.csv
from shapely.geometry import Point
from geoalchemy2.shape import to_shape, from_shape

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
    
Airport.__table__.create(engine)