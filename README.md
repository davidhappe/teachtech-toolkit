# CS1980 Capstone - TeachTech Toolkit

A NextJS/Django webapp for painless coding assignment & autograder creation!

## Build (development):
- Download Docker
- Clone repo to local machine
- `cd` to repo directory
- run: `docker compose -f compose-dev.yml build`
- run: `docker compose -f compose-dev.yml up`

NextJS frontend is hosted at `localhost:3000`

Django backend is hosted at `localhost:8000`

## Dependencies
### Python
Using latest Python 3.12.6+

(highly recommend) set up [venv](https://docs.python.org/3/library/venv.html) using packages in `server/requirements.txt` (`pip install -r server/requirements.txt`)

Using Django 5.1.1+

### NextJS
Using latest stable NextJS 14.2.13+ (TypeScript, ESLint, Tailwind CSS)

Docker is using latest node.js LTS
