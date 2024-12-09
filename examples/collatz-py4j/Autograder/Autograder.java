package autograde;
import autograde.Collatz;
import py4j.GatewayServer;

public class Autograder{
    private Collatz collatz;

    public Autograder() {
        collatz = new Collatz();
    }

    public Collatz getStudentCode(){
        return collatz;
    }

    public static void main(String[] args){
        GatewayServer gatewayServer = new GatewayServer(new Autograder());
        gatewayServer.start();
    }
}