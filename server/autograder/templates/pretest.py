import unittest
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
from gradescope_utils.files import check_submitted_files
import subprocess

class pretest(unittest.TestCase):

    {% if submission.weight is not none %}
    @weight({{ submission.weight }})
    {% endif %}
    {% if submission.visibility is not none %}
    @visibility({{ submission.visibility }})
    {% endif %}
    def file_check(self):
        """
            Files present
        """
        paths = [{{ submission.files|join(', ') }}]
        missing = check_submitted_files(paths,base='/')
        self.assertListEqual(missing,[],"Missing following files: {}".format(', '.join(missing)))

    {% if compile.weight is not none %}
    @weight({{ compile.weight }})
    {% endif %}
    {% if compile.visibility is not none %}
    @visibility({{ compile.visibility }})
    {% endif %}    
    def compilation_check(self):
        """
            Compilation check
        """
        cmds = [{{ compile.compilationCommand|join(', ')}}]
        for cmd in cmds:
            proc = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = proc.communicate(input=subprocess.PIPE)
            print(out)
            if err is not none:
                self.fail(err)

        # everything compiled with no errors!    
        self.assertTrue(True)