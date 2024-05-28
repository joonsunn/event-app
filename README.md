# Event App

An instance of this app is deployed live at <https://event-app.joonsunn.com>.

## Installation and running

1. Clone this repo.
2. Examine the `.env.example` file in the `server` folder and supply the values accordingly in that folder.

3a. On Linux/Mac machines, run in terminal at the root of the repo (the directory that contains the 'Makefile' file):

```bash
make build
make start
```

3b. On Windows machines:

Install dependencies:

```bash
cd client && npm install && npm run build && cd ../server && npm install
```

While still in `server` folder (otherwise, navigate to it), run:

```bash
npm run start
```

4. Navigate browser to `http://localhost:PORT`, with `PORT` as defined in the `.env` file in Step 2.
