// The first line contains a single integer t (1≤t≤104

// ) — the number of test cases.

// The first line of each test case contains two integers l
// and r (1≤l<r≤100

// ) — the bounds of the segment of rooms where Alice is located.

// The second line of each test case contains two integers L
// and R (1≤L<R≤100) — the bounds of the segment of rooms where Bob is located.

import java.util.*;

public class CF {

    public static void main(String[] args) {
        
        Scanner s = new Scanner(System.in);
        int t = s.nextInt();
        for(int i = 0; i<t; i++){
            int n = s.nextInt();
            int k = s.nextInt();
            int arr[] = new int[n];
            for(int j= 0; j<n;j++){
                arr[j] = s.nextInt();
            }
            Arrays.sort(arr);
            
            int sum = 0;
            int mul = 1;
            int end = 0;
            if(n%2==1){
                end = 1;
            }
            for(int v = n-1; v>=end; v--){
                 sum += mul*arr[v];
                 mul *= -1;
            }
            if(n%2==0) System.out.println(Math.max(0,sum-k));
            else System.out.println(Math.max(0,sum-k) + arr[0]);
            
        }
    }
}