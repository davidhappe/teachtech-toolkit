FROM ubuntu:latest

WORKDIR /autograde

RUN apt-get update && apt-get install -y python3 python3-pip default-jdk

ARG FILE="java/soln.java"

COPY autograder.py /autograde/
COPY Autograder.java /autograde/
COPY ${FILE} /autograde/Collatz.java

RUN pip install py4j --break-system-packages

RUN javac -cp /usr/local/share/py4j/*:. /autograde/Collatz.java /autograde/Autograder.java
RUN java -cp /usr/local/share/py4j/*:.. /autograde/Autograder.java & sleep 1 && python3 -u /autograde/autograder.py