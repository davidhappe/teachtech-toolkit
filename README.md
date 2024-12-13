# CS1980 Capstone - TeachTech Toolkit

A NextJS/Django webapp for painless coding assignment & autograder creation!

## Status

As of this project's first capstone semester (Fall 2024) we have a minimally-minimal viable product with basic functionality and a working example case. See the `examples` folder for our two working tests. Our scope was primarily for intro-level CS courses (CS401 for example) however the autograder platform is language-agnostic if command line i/o diffchecking is used.

## Stack

- Frontend: NextJS
- Backend: Django
- DB: PostgreSQL (unused but available for future features)
- Autograder: Python unittest with Gradescope's util library
- Autograder creation: Jinja2 using Django's rendering engine 

## Build (development):
- Download Docker
- Clone repo to local machine
- `cd` to repo directory
- run: `docker compose -f compose-dev.yml up`

NextJS frontend is hosted at `localhost:3000`

Django backend is hosted at `localhost:8000`

## Useful resources

- [Gradescope autograding documentation](https://gradescope-autograders.readthedocs.io/en/latest/)
- [Gradescope_util](https://github.com/gradescope/gradescope-utils) Python library ([documentation](https://gradescope-utils.readthedocs.io/en/latest/))
- Gradescope publishes a [Docker image](https://hub.docker.com/r/gradescope/autograder-base/) of their autograding container. This would be good to demo generated auotgraders locally.

## Next steps

Some ideas and loose ends for future groups:

- **Pretesting.** We attempted to create a separate pretest for compilation or file-exists tests. In theory, these should run first and breaks testing on error. We were having issues with our `suite` not detecting pretest methods.
- **Better Java support.** See the `Collatz` example. We played around with using the [Py4J]() library to embed into student Java code. Use cases would be testing individual functions or allowing for instructors to use Java-based autograding classes. Since we were focusing on lower-level classes where code interaction is usually in the command-line, and due to the complexity of Py4J requiring a custom Java "server" as an intermediate, we abandoned full support.
- **Style checks.** Linting, readability, white spacing/indenting, comments.
- **Manual grading.** Gradescope programming assignments allow for using both autograding and manual rubrics. We focused on just the autograder.
- **GitHub Classroom support.** GitHub Classroom is a great tool for assignment creation, distribution, and management. One possible direction is to have TeachTech Toolkit act as a full-cycle programming assignment tool, from creating the assignment and its autograder to pushing them out to Gradescope/GitHub. As of writing, GitHub Classroom has limited API support, but it's basically an organization... 
- **Autograder Code Security.** [This article](https://saligrama.io/blog/gradescope-autograder-security/) is a fun read on how easy students can "hack" naively-developed autograders to change scores and/or extract answers. The author proposes and implements a few fixes that may be of use.