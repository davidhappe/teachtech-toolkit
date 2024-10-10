import unittest
import traceback
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit
from py4j.java_gateway import JavaGateway
from py4j.protocol import *
from random import randint as random

# connect to Java
gateway = JavaGateway()

class TestIsEven(unittest.TestCase):
    
    def setUp(self):
        self.student = student = gateway.entry_point.getStudentCode()
    
    @weight(1)
    @number("1.1")
    def testTwo(self):
        """
            Is two even?
        """
        try:
            result = self.student.isEven(2)
            self.assertTrue(result)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    @weight(1)
    @number("1.2")
    def testThree(self):
        """
            Is three even?
        """
        try:
            result = self.student.isEven(3)
            self.assertFalse(result)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @partial_credit(3)
    @number("1.3")
    @visibility("after_published")
    def testRandom(self, set_score = None):
        """
            Are three random numbers even?
        """
        try:
            score = 0
            tests = [random(1,100) for i in range(3)]
            for n in tests:
                if (n%2==0) == self.student.isEven(n):
                    score += 1
            set_score(score)
            self.assertEqual(score,3)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


class TestIsOdd(unittest.TestCase):
    
    def setUp(self):
        self.student = gateway.entry_point.getStudentCode()
    
    @weight(1)
    @number("2.1")
    def testTwo(self):
        """
            Is three odd?
        """
        try:
            result = self.student.isOdd(3)
            self.assertTrue(result)
    
        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(1)
    @number("2.2")
    def testThree(self):
        """
            Is four odd?
        """
        try:
            result = self.student.isOdd(4)
            self.assertFalse(result)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @partial_credit(3)
    @number("2.3")
    @visibility("after_published")
    def testRandom(self, set_score = None):
        """
            Are three random numbers odd?
        """
        try:
            score = 0
            tests = [random(1,100) for i in range(3)]
            for n in tests:
                if self.student.isOdd(n) != (n%2==0):
                    score += 1
            set_score(score)
            self.assertEqual(score,3)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
class TestCollatzSequence(unittest.TestCase):
    
    def setUp(self):
        self.student = gateway.entry_point.getStudentCode()
    
    def nextCollatz(self,num):
        # Correct solution for reference
        if(num>1):
            #do collatz
            if(num%2==0):
                return num//2
            else:
                return 3*num + 1
        elif(num==1):
            return 1
        else:
            return -1
    
    @weight(1)
    @number("3.1")
    def testOne(self):
        """
            For n==1, collatz should return 1
        """
        try:
            self.assertEqual(1, self.student.nextCollatz(1))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(1)
    @number("3.2")
    def testZero(self):
        """
            Zero should return -1
        """
        try:
            self.assertEqual(-1,self.student.nextCollatz(0))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    @weight(1)
    @number("3.3")
    def testInvalid(self):
        """
            Number < 0 should return -1
        """
        try:
            num = random(-100,-1)
            self.assertEqual(self.student.nextCollatz(num),-1)
        
        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(1)
    @number("3.4")
    def testEven(self):
        """
            Next in sequence for even number is divide by 2
        """
        try:
            num = 2 * random(1,50) # will be even number in [1,99]
            self.assertEqual(self.nextCollatz(num),self.student.nextCollatz(num))
        
        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(1)
    @number("3.5")
    def testOdd(self):
        """
            Next in sequence for odd number is multiply by 3 and add 1
        """
        try:
            num = 2 * random(1,50) - 1 # will be even number in [1,99]
            self.assertEqual(self.nextCollatz(num),self.student.nextCollatz(num))
        
        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @partial_credit(5)
    @number("3.6")
    @visibility("after_published")
    def testRandom(self, set_score = None):
        """
            For five random integers, what's the next in sequence?
        """
        try:
            score = 0
            nums = [random(-100,100) for i in range(5)]
            for num in nums:
                if self.nextCollatz(num) == self.student.nextCollatz(num):
                    score += 1
            set_score(score)
            self.assertEqual(score,5)

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))

        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


class ConvergeTest(unittest.TestCase):
    
    def setUp(self):
        self.student = gateway.entry_point.getStudentCode()

    @weight(2)
    @number("4.1")
    def testConverging(self):
        """
            10 will converge in 6 steps: 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
        """
        try:
            self.assertTrue(self.student.convergesInNSteps(10,6))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(2)
    @number("4.2")
    def testNoConverge(self):
        """
            10 will not converge in 5 steps: 10 -> 5 -> 16 -> 8 -> 4 -> 2
        """
        try:
            self.assertFalse(self.student.convergesInNSteps(10,5))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(2)
    @number("4.3")
    @visibility("after_published")
    def testLongConverge(self):
        """
            123 will converge in 46 steps
        """
        try:
            self.assertTrue(self.student.convergesInNSteps(123,46))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(2)
    @number("4.4")
    @visibility("after_published")
    def testLongNoConverge(self):
        """
            401 will not converge in 15 steps (actual: 19)
        """
        try:
            self.assertFalse(self.student.convergesInNSteps(401,15))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")

    
    @weight(2)
    @number("4.5")
    @visibility("after_published")
    def testExtraSteps(self):
        """
            401 will converge in 100 steps (actual: 19)
        """
        try:
            self.assertTrue(self.student.convergesInNSteps(401,100))

        except AssertionError:
            # test failed
            raise
                                        
        except Py4JJavaError as e:
            # error in student code
            self.fail(str(e.py4j_java_error))
            
        except Exception:
            # error in autograder
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")
