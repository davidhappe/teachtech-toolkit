import unittest
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
from gradescope_utils.files import check_submitted_files
import subprocess

class pretest(unittest.TestCase):

    def file_check(self):
        """
            Files present
        """
        paths = [{{ files|join(', ') }}]
        missing = check_submitted_files(paths,base='/')
        self.assertListEqual(missing,[],"Missing following files: {}".format(', '.join(missing)))
    
    def compilation_check(self):
        """
            Compilation check
        """
        cmds = [{{ commands|join(', ')}}]
        for cmd in cmds:
            proc = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = proc.communicate(input=subprocess.PIPE)
            print(out)
            if err is not None:
                self.fail(err)

        # everything compiled with no errors!    
        self.assertTrue(True)