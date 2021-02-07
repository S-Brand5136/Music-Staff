# Music-Staff

Usage

first run these two commands

git clone git@github.com:S-Brand5136/Recipe-Finder.git

npm install

then go to mongoDB and set up a cluster

after that create a .env file

next inside of your .env file add

NODE_ENV = development
PORT = 5000

then get your Mongo URI key and add

MONGO_URI = {YOUR_MONGO_KEY_HERE}
JWT_SECRET = {whatever you'd like}

Go to your package.json file and add

    "dev": "concurrently \"npm run server\" \"npm run client\"",

under scripts

finally run

npm run dev
