/* Incorrect solution for Collatz demo assignment (runtime exception) */

package autograde;

public class Collatz{

    public boolean isEven(int n){
        // TODO: Is integer n even?
        if(n%2==0){
            return true;
        }
        else return false;
    }

    public boolean isOdd(int n){
        // TODO: is integer n odd?
        Integer[] arr = new Integer[2];
        arr[3] = 0; // What are bounds??
        return !isEven(n);
    }

    public int nextCollatz(int n){
        // TODO: Return next integer in Collatz sequence,
        //       1 if already converged,
        //       or -1 if invalid
        if(n<=0){
            return -1;
        }
        else{
            if(isEven(n)){
                int next = n/2;
                return next;
            }
            else if(n==1){
                return 1;
            }
            else return (3*n + 1);
        }
    }

    public boolean convergesInNSteps(int n, int steps){
        // TODO: does the collatz sequence starting from integer n
        //       in a set number of steps?
        boolean converges = false;
        int curr = n;
        for(int i=0; i<steps; i++){
            int next = nextCollatz(curr);
            if(next == 1){
                converges = true;
                break;
            }
            else{
                curr = next;
            }
        }
        return converges;
    }
}