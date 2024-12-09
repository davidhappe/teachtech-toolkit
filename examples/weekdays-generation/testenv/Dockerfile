FROM gradescope/autograder-base:ubuntu-22.04-jdk17

COPY ./autograder /autograder/source
COPY Program.java autograder/submission/Program.java
RUN chmod -R 777 /autograder
RUN cd autograder
RUN mkdir results
RUN touch results/results.json

ENTRYPOINT [ "./source/setup.sh && ./source/run_autograder" ] 