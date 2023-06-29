
from jobspyder.factory import create_app

import os
from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__":
    application = create_app()
    application.config['DEBUG'] = True
    application.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    application.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    application.run()

if __name__ == "app":
    application = create_app()
    application.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    application.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    application.run()