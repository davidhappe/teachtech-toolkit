## STATIC FILE

import unittest
from io import StringIO
from json import load, dump
from gradescope_utils.autograder_utils.json_test_runner import JSONTestRunner

if __name__ == "__main__":
    # do initial test, fail on error
    suite = unittest.defaultTestLoader.discover('/autograde/tests/pretest*')
    with StringIO() as io:
        JSONTestRunner(visibility='visible', stream=io, fastfail=True, failure_prefix="").run(suite)
        json_data = load(io)

    # check if initial tests are successful
    if bool(json_data['tests']) and all([x == "passed" for x in json_data['tests']]):
        # all good to run
        suite = unittest.defaultTestLoader.discover('/autograde/tests/test*')
        
        # do final tests
        with StringIO() as io:
            JSONTestRunner(visibility='visible', stream=io).run(suite)
            test_data = load(io)
        
        # merge test_data with json_data
        for test in test_data["tests"]:
            json_data["tests"].append(test)
        
        # update execution time
        new_time = float(json_data["execution_time"]) + float(test_data["execution_time"])
        json_data["execution_time"] = format(new_time, '0.2f')

    
    # do final write
    with open('results/results.json', 'w') as f:
        dump(json_data, f, indent=4)
        f.write('\n')

