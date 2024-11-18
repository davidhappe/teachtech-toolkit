# Gradescope autograder generation

1. Create temp directory
2. Copy the following files (no need to edit):
    - setup.sh
    - autograder.py
    - requirements.txt *
> \* Update requirements.txt if additional python packages are needed! Just append to the file and write out each line-by-line. Could in theory template but not really needed.
3. Modify rest of files as needed (see below)
4. Zip everything up so that needed files are in root (can include subdirs), return to user

## Templated files

Even though file extensions are regular .py/.sh etc, these are jinja2 templates! I might change to .jinja2 extension if django prefers it when executing.

### run_autograder

This is a bash script that tells gradescope how to compile & run the autograder. Definitely needs to be rewritten.

### tests.py

Defines a unittest class that can be iterated over with user-generated test code. Right now it passes in object `case` which contains name, imports (if desired, else None), and iterable `tests`. Each item in `tests` has its own name, decorator values (weight, visibility...) which can be None if DNE, code. It will probably be expanded as needed, especially if user wants to run shell commands and diffcheck results.

In Gradescope, each file (not each class!) is considered its own question. For ease of user reading statistics, each test group/question should be in separate files. Easy enough, generate a list of cases and template out new `test.py`'s.

## Current file structure

### In autograder .zip package we generate:

- autograder.py
- requirements.txt
- run_autograder
- setup.sh
- tests/
    - test1.py
    - test2.py
    - ...

### In Gradescope autograder:

It's a full Linux image, but most importantly

- /autograder/ (working directory, run_autograder starts at this location)
    - source/
        - autograder.py
        - requirement.txt
        - etc it's the contents of our zip file
    - submission/
        - Student submitted code, from upload or Github pull
    - results/
        - results.json - output from tests that Gradescope returns to student. autograder.py creates this for us
        - stdout - captures output of `run_autograder` for instructor debug
