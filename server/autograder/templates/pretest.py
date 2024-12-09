import unittest
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
from gradescope_utils.autograder_utils.files import check_submitted_files
import subprocess

class Pretest(unittest.TestCase):

    {#
    {% if submission.weight is not none %}
    @weight({{ submission.weight }})
    {% endif %}
    {% if submission.visibility is not none %}
    @visibility({{ submission.visibility }})
    {% endif %}
    #}
    {% if compile.visibility is not none %}
    @visibility('{{ compile.visibility }}')
    {% endif %}    
    def file_check(self):
        """
            Files present
        """
        paths = ['{{ submission.files|join('\', \'') }}']
        missing = check_submitted_files(paths,base='autograde/')
        self.assertListEqual(missing,[],"Missing following files: {}".format(', '.join(missing)))

    {% if compile.weight is not none %}
    @weight({{ compile.weight }})
    {% endif %}
    {% if compile.visibility is not none %}
    @visibility('{{ compile.visibility }}')
    {% endif %}    
    def compilation_check(self):
        """
            Compilation check
        """
        cmds = ['{{ compile.compilationCommand}}']
        for cmd in cmds:
            proc = subprocess.Popen(cmd,cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()),proc.communicate(input=subprocess.PIPE))
            if err != '':
                self.fail(err)

        # everything compiled with no errors!    
        self.assertTrue(True)