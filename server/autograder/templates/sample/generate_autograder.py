# sample autograder

import zipfile as zip
import jinja2

env = jinja2.Environment(loader=jinja2.FileSystemLoader(''))

run_autograder = {
    'source': {
        'files': [],
        'folders': []
    },
    'submission': {
        'files': ['Student.java'],
        'folders': []
    }
}

pretest = {
    'files': {
        'weight': None,
        'number': None,
        'visibility': None,
        'files': ['Student.java']
    },
    'compilation': {
        'weight': None,
        'number': None,
        'visibility': None,
        'cmds': ['javac Student.java', './student']
    }
}

with zip.ZipFile('autograder.zip','w') as autograder:

    # copy over static files
    autograder.write('requirements.txt')
    autograder.write('setup.sh')
    autograder.write('autograder.py')

    # generate run_autograder
    autograder.writestr('run_autograder', env.get_template('run_autograder').render(run_autograder))

    # add test cases
    autograder.mkdir('tests')
    autograder.writestr('tests/pretest.py', env.get_template('pretest.py').render(pretest))

    # TODO: rest of test cases!

print("Done")



