
from jobspyder.factory import create_app

import os
from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__":
    print("Entering Dev Server...")
    app = create_app()
    app.config['DEBUG'] = True
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    # app.run()

if __name__ == "app":
    print("Entering Prod Server...")
    app = create_app()
    app.config['MONGO_URI'] = os.getenv('MONGODB_URI_DEV')
    # application.run()
    