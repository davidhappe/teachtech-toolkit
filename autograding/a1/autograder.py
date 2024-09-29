from py4j.java_gateway import JavaGateway
from random import randint as random

gateway = JavaGateway()

student = gateway.entry_point.getStudentCode()

test = random(1,100)

print("Starting tests:")

print("Is " + str(test) + " even? " + str(student.isEven(test)))

print("Is " + str(test) + " odd? " + str(student.isOdd(test)))

print("What's the next in sequence? " + str(student.nextCollatz(test)))

print("Will it converge in 5 steps? " + str(student.convergesInNSteps(test, 5)))

