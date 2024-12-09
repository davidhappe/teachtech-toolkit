import unittest
import traceback
import subprocess
from gradescope_utils.autograder_utils.decorators import weight, visibility, number, partial_credit




class Test1(unittest.TestCase):

    longMessage = False # suppress all error messages but our own

    

    
    @weight(1)
    
    
    @visibility('visible')
    
    def test1(self):
        '''
            Test Monday
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java 1',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'Monday'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    

    
    @weight(1)
    
    
    @visibility('visible')
    
    def test2(self):
        '''
            Test Tuesday
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java 2',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'Tuesday'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    

    
    @weight(1)
    
    
    @visibility('visible')
    
    def test3(self):
        '''
            Test Sunday
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java 7',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'Sunday'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    

    
    @weight(2)
    
    
    @visibility('visible')
    
    def test4(self):
        '''
            Test out-of-bounds
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java 0',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'Doomsday'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    

    
    @weight(2)
    
    
    @visibility('visible')
    
    def test5(self):
        '''
            Test bad args
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java &#34;one&#34;',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'Nice try'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    

    
    @weight(2)
    
    
    @visibility('visible')
    
    def test6(self):
        '''
            Test no args
        '''
        try:
            # TODO: Make this work with diffcheck input procedure!
            
            proc = subprocess.Popen('java Program.java',cwd='autograde/',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
            out, err = map(lambda s: ''.join(s.decode().splitlines()), proc.communicate(input=subprocess.PIPE))
            print(out)
            if err != '':
                self.fail(err)
            expected = 'whoops'
            self.assertEqual(out, expected, "Expected {}, received {}".format(expected,str(out)))
            
        
        except AssertionError:
            # test failed
            raise

        except Exception:
            # autograder failed
            print(traceback.format_exc()) # for logging/debug, only seen by instructor
            self.fail("An issue occured with the autograder. Please let your instructor know!")


    