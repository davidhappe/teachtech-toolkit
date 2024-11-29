import unittest
import traceback
import subprocess
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
{% if imports is not none %}
{% for import in imports %}
import {{ import }}
{% endfor %}
{% endif %}

class {{ name }}(unittest.TestCase):

    longMessage = False # suppress all error messages but our own

    {% for test in tests %}

    {% if test.weight is not none %}
    @weight({{ test.weight }})
    {% endif %}
    {% if test.visibility is not none %}
    @visibility({{ test.visibility }})
    {% endif %}
    def test{{ loop.index }}(self):
        '''
            {{ test.name }}
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            {% for input in test.inputs%}
            proc = subprocess.Popen('{{ input.value }}',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = proc.communicate(input=subprocess.PIPE)
            print(out)
            if err is not None:
                self.fail(err)
            expected = "{{ test.output.value }}"
            self.assertEqual(str(out), expected, "Expected {}, received {}".format(expected,str(out)))
            {% endfor %}
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    {% endfor %}