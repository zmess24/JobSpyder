
from jobspyder.factory import create_app

import os
from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__":
    app = create_app()
    app.config['DEBUG'] = True
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')

if __name__ == "app":
    app = create_app()
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    