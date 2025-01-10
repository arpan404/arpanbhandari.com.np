import sys
import os
import importlib.util

# Get the path to your Python environment
INTERP = os.path.expanduser('~/virtualenv/your_app/3.8/bin/python')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Add your application directory to system path
sys.path.insert(0, os.path.dirname(__file__))

# Import your FastAPI application
from main import app

# For Passenger ASGI
application = app