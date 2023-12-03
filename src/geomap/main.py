from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

data = {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "properties": {
            "title": "site1",
            "description": "<p>This is site one</p>"
        },
        "geometry": {
            "coordinates": [
            28.29885817507065,
            -15.50317189965483
            ],
            "type": "Point"
        },
        "id": 0
        },
        {
        "type": "Feature",
        "properties": {
            "title": "site2",
            "description": "<p>This is site two</p>"
        },
        "geometry": {
            "coordinates": [
            28.074705911830648,
            -15.494701269909086
            ],
            "type": "Point"
        },
        "id": 1
        },
        {
        "type": "Feature",
        "properties": {
            "title": "site3",
            "description": "<p>This is site three</p>"
        },
        "geometry": {
            "coordinates": [
            28.246116466071726,
            -15.231940394033373
            ],
            "type": "Point"
        },
        "id": 2
        }
    ]
}
    
# geoloc api
@app.get("/api/geoloc")
def get_geoloc():
    return data

# js and css files
app.mount("/public/static",
          StaticFiles(
              directory="src/geomap/public/static"),
          name="static")

# html files
app.mount("/",
          StaticFiles(
              directory="src/geomap/public/html",
              html=True),
          name="html")
