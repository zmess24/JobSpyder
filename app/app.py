
from jobspyder.factory import create_app

import os
from dotenv import load_dotenv
load_dotenv()

import os

if __name__ == "__main__":
    app = create_app()
    app.config['DEBUG'] = True
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    app.run()