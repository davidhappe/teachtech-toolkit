from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import json
import os

# view for creating an autograder, handles the POST request from frontend
@api_view(['POST'])
@permission_classes([AllowAny])
def create_autograder(request):
    # extracting data sent from the frontend
    data = request.data
    files = request.FILES

    language = data.get('language')
    test_cases = json.loads(data.get('testCases'))
    use_diff_testing = data.get('useDiffTesting')
    solution_file = files.get('solutionFile')

    # for debugging purposes
    print(f"Received autograder.")
    print(f"Language: {language}")
    print(f"Test Cases: {test_cases}")
    print(f"Use Diff Testing: {use_diff_testing}")
    print(f"Solution File: {solution_file}")

    # Save solution file if diff testing
    if use_diff_testing and solution_file:
        with open('/tmp/solution.java', 'wb') as f:
            for chunk in solution_file.chunks():
                f.write(chunk)

    # Generate tests.py, this will generate and store tests.py in '/tmp'
    tests_file_path = write_tests_file(test_cases, use_diff_testing, solution_file)

    return Response({"message": "Autograder received successfully!"})


def write_tests_file(test_cases, use_diff_testing, solution_file=None):
    file_path = '/tmp/tests.py'

    with open(file_path, 'w') as f:
        f.write('import unittest\n')
        f.write('import traceback\n')
        f.write('from gradescope_utils.autograder_utils.decorators import weight, visibility, number, name\n')
        f.write('from py4j.java_gateway import JavaGateway\n')
        f.write('\n')
        f.write('# Connect to Java\n')
        f.write('gateway = JavaGateway()\n')
        
        # Define the main testing class
        f.write('\nclass AutograderTests(unittest.TestCase):\n')
        f.write('    def setUp(self):\n')
        f.write('        self.student = gateway.entry_point.getStudentCode()\n')
        f.write('\n')

        for i, case in enumerate(test_cases):
            gradescope_name = case['name']
            weight = case['weight']
            visibility = case.get('visibility', 'visible')
            test_type = case['type']
            method_name = case.get('method', None)
            inputs = case['inputs']
            output = case['output']

            # Convert inputs and expected output to the correct format
            input_args = []
            for inp in inputs:
                if inp['type'] == 'string':
                    input_args.append(f'"{inp["value"]}"')
                elif inp['type'] == 'bool':
                    input_args.append('True' if inp["value"].lower() == 'true' else 'False')
                elif inp['type'] == 'int':
                    input_args.append(str(inp['value']))

            if output['type'] == 'string':
                expected_output_str = f'"{output["value"]}"'
            elif output['type'] == 'bool':
                expected_output_str = 'True' if output["value"].lower() == 'true' else 'False'
            elif output['type'] == 'int':
                expected_output_str = str(output["value"])

            # Convert input arguments list to comma-separated string
            input_args_str = ', '.join(input_args)

            # Define a method for each test case
            method_label = f'test_case_{i+1}'
            f.write(f'    @weight({weight})\n')
            f.write(f'    @visibility("{visibility}")\n')
            f.write(f'    @number("{i + 1}")\n')
            f.write(f'    @name("{gradescope_name}")\n')
            f.write(f'    def {method_label}(self):\n')

            f.write('        try:\n')
            if test_type == 'unit' and method_name:
                f.write(f'            result = self.student.{method_name}({input_args_str})\n')
                if output['type'] == 'bool':
                    if expected_output_str == 'True':
                        f.write('            self.assertTrue(result)\n')
                    else:
                        f.write('            self.assertFalse(result)\n')
                else:
                    f.write(f'            self.assertEqual(result, {expected_output_str})\n')
                    
            elif test_type == 'functional':
                f.write(f'            result = self.student.main({input_args_str})\n')
                if output['type'] == 'bool':
                    if expected_output_str == 'True':
                        f.write('            self.assertTrue(result)\n')
                    else:
                        f.write('            self.assertFalse(result)\n')
                else:
                    f.write(f'            self.assertEqual(result, {expected_output_str})\n')

            f.write('        except AssertionError:\n')
            f.write('            raise\n')
            f.write('        except Exception as e:\n')
            f.write('            print(traceback.format_exc())\n')
            f.write('            self.fail("An error occurred during test execution")\n')
            f.write('\n')
    
    return file_path
