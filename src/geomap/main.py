from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

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
