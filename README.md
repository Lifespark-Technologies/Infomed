# Infomed

Web portal that enables communication between hospitals and health authorities

# Technical overview

This project contains a Python server built using Django. It contains an API layer that connects to a PostgresSQL database. The frontend is a single-page app built using React, and it's contained in the `frontend` directory. We use Bootstrap for layouts. We don't (yet?) need Redux, and we try to keep things simple there. No server-side rendering is currently considered, but it may be in the future.

# Contributing

## Read these first

* [Platform overview](https://docs.google.com/document/d/1tZo0bNoF8xolfcGoQWJZF-FmAAy8e75uvWDmIg0vyjQ/edit)
* [Product requirements](https://docs.google.com/document/d/1t_qJyg5nIntLCNdRlBsm_vtGw7zMwJUEZ1Kem7tQKWU/edit)

## Our workflow

1. Go to [Our project board](https://github.com/Lifespark-Technologies/Infomed/projects/1).
2. Pick an unassigned card from the "To do" column and assign it to yourself. If you want to work on something that is assigned to someone else, talk to that person (or @bl-nero) first.
3. As soon as you start working on an issue, move it to the "In progress" column. Don't assign yourself to tasks that are in progress, but also don't hold on to a task that you can't contribute to in a reasonable timeframe.
4. Request a code review. Don't merge code without it. Don't push code directly to `master`.
5. Run `npm test` to make sure you didn't break anything!
6. Merge to `master`!

# Development (FRONTEND)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory (`frontend/`), you can run:

### `npm install`

Downloads dependencies and allows you to build and develop the app.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Development (BACKEND)

To get your development environment up and running, follow these steps:

1. Install python3 and pip3
2. Create a virtual environment for the project.
3. Activate the virtual environment.
4. Run `pip install -r requirements.txt` to install all the necessary dependencies.
5. Install Docker. These are the steps that I used: https://linuxconfig.org/how-to-install-docker-on-ubuntu-20-04-lts-focal-fossa.
6. Run `useful_scripts/install_dependencies.sh`. This will require root access. If you have installed
Docker, then this will also set up the Postgres Docker container, with the username and password `user001` and `123456789` respectively.
7. Run `useful_scripts/deploy.sh`, which if you open the file, will run `npm run dev` which runs Webpack and Babel to generate a `main.js` in `frontend/static/frontend/`, which is what the Python
server serves to the user. This can be done manually or by running this script. This script also copies the `infomed/example.env` into `infomed/.env`, which is sufficient, but SHOULD NOT BE USED WHEN DEPLOYED IN PRODUCTION. That file contains the database username, password, and secret keys which SHOULD BE CHANGED before we deploy. To do so, copy `infomed/example.env` into `infomed/.env` and modify manually the `.env` file.
8. After you have completed the previous steps, you can test subsequent iterations just by running `python manage.py runserver`.

# API Documentation
The backend is structured as follows:
* The hospital database table is stored with the Hospital model in the hospitals application.
* This model currently has two fields: a name field and a location field. 
* Calls to the API endpoint are routed through the `views.py` file. 
* This is done by inheriting from the Django Rest Framework `ModelViewset` class, which has prewritten endpoints
for HTTP `GET`, `POST`, `PUT`, etc. More information can be found here:
[https://www.django-rest-framework.org/api-guide/viewsets/.] 
* We also use DRF serializers to serialize our Python objects.
* Our serializers inherit from the `ModelSerializer` class in the DRF as well as the `GeoFeatureModelSerializer` class, an add-on to the 
rest framework. 
* The `GeoFeatureModelSerializer` is used to serialize geometries.
* Finally, we use a DRF router to generate all our URLs in `router.py`. Finally, we can write unit tests to test our API in `tests.py`.

