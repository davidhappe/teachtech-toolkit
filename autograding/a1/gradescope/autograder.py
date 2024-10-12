import unittest
from gradescope_utils.autograder_utils.json_test_runner import JSONTestRunner

if __name__ == "__main__":
    suite = unittest.defaultTestLoader.discover('autograde/')
    with open('results/results.json', 'w') as f:
        print("Starting tests")
        JSONTestRunner(visibility='visible', stream=f).run(suite)
    print("Test complete")