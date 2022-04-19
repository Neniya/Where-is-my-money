**The project is under construction.**

# Where Is My Money Project

**The project is under construction.**

It is an expenses tracker.
I'm creating this project by using next technologies:

Backend:
**_Postgres, Python, Flask, Flaskr_**

Ffontend:
**_JavaScript, HTML, React, Redux, CSS_**

## API

### Getting Started

#### Backend

Base URL: At present this app can only be run locally and is not hosted as base URL. The backend upp is hosted at the default, http://127.0.0.1:5000/, which is set as a proxi in the frontend configuration.
Authentication: This version of the application does not require authentication or API keys.

**Running the server**

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application.

#### Frontend

Installing Dependencies

Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from https://nodejs.com/en/download.

**Installing project dependencies**

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the frontend directory of this repository. After cloning, open your terminal and run:

```
npm install
```

In the `frontend` project directory, you can run:

```
yarn start
```

Runs the app in the development mode.
Open `http://localhost:3000` to view it in the browser.

The page will reload if you make edits.
