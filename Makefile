build:
	cd client && npm install && npm run build && cd ../server && npm install

start:
	cd server && npm run start