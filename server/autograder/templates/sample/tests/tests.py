import unittest
import traceback
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
{% if case.imports is not None %}
{% for import in case.imports %}
import {{ import }}
{% endfor %}
{% endif %}

class {{ case.name }}(unittest.TestCase):

    def setUp(self):
        # do needed setup here
        {% if case.setup is not None %}
        {{ case.setup }}
        {% else %}
        pass
        {% endif %}


    {% for test in case.tests %}

    {% if test.weight is not None %}
    @weight({{ test.weight }})
    {% endif %}
    {% if test.number is not None %}
    @number({{ test.number }})
    {% endif %}
    {% if test.visibility is not None %}
    @visibility({{ test.visibility }})
    {% endif %}
    def test{{ loop.index }}(self):
        '''
            {{ test.name }}
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            {{ test.code }}
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    {% endfor %}