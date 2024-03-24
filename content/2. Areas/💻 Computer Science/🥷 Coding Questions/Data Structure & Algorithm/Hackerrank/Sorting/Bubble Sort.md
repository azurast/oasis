---
language: Swift
tags:
  - Sorting
---
```swift
func bubbleSort(array: [Int]) -> Void {
    var arr = array
    var noSwap: Bool = true
    repeat {
        /**
        Outer Loop
        - Controls how many full pass are needed to perform the sorting 
        - It continues until a complete pass is made without any swaps, indicating that the array is sorted.
        */
        for item in arr {
            /**
            Inner Loop
            - actually responsible for comparing adjacent elements and swap them if they are in the wrong order.
            */
            for (idx, element) in arr.enumerated() {
                // If left element > right element
                if idx+1 < arr.count {
                    print("\(arr[idx]) > \(arr[idx+1]) ? ")
                    if arr[idx] > arr[idx+1] {
                        // Swap
                        let temp = arr[idx]
                        arr[idx] = arr[idx+1]
                        arr[idx+1] = temp
                        // Flag
                        noSwap = false
                        
                        print(arr)
                    } else {
                        print("no swap")
                    }
                }
            }
        }
    } while noSwap
    print("sorted arr: \(arr)")
}

bubbleSort(array: [4,8,6,7,3,2,5,1])
```
## Log

```
4 > 8 ? 
no swap
8 > 6 ? 
[4, 6, 8, 7, 3, 2, 5, 1]
8 > 7 ? 
[4, 6, 7, 8, 3, 2, 5, 1]
8 > 3 ? 
[4, 6, 7, 3, 8, 2, 5, 1]
8 > 2 ? 
[4, 6, 7, 3, 2, 8, 5, 1]
8 > 5 ? 
[4, 6, 7, 3, 2, 5, 8, 1]
8 > 1 ? 
[4, 6, 7, 3, 2, 5, 1, 8]
4 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 3 ? 
[4, 6, 3, 7, 2, 5, 1, 8]
7 > 2 ? 
[4, 6, 3, 2, 7, 5, 1, 8]
7 > 5 ? 
[4, 6, 3, 2, 5, 7, 1, 8]
7 > 1 ? 
[4, 6, 3, 2, 5, 1, 7, 8]
7 > 8 ? 
no swap
4 > 6 ? 
no swap
6 > 3 ? 
[4, 3, 6, 2, 5, 1, 7, 8]
6 > 2 ? 
[4, 3, 2, 6, 5, 1, 7, 8]
6 > 5 ? 
[4, 3, 2, 5, 6, 1, 7, 8]
6 > 1 ? 
[4, 3, 2, 5, 1, 6, 7, 8]
6 > 7 ? 
no swap
7 > 8 ? 
no swap
4 > 3 ? 
[3, 4, 2, 5, 1, 6, 7, 8]
4 > 2 ? 
[3, 2, 4, 5, 1, 6, 7, 8]
4 > 5 ? 
no swap
5 > 1 ? 
[3, 2, 4, 1, 5, 6, 7, 8]
5 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 8 ? 
no swap
3 > 2 ? 
[2, 3, 4, 1, 5, 6, 7, 8]
3 > 4 ? 
no swap
4 > 1 ? 
[2, 3, 1, 4, 5, 6, 7, 8]
4 > 5 ? 
no swap
5 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 8 ? 
no swap
2 > 3 ? 
no swap
3 > 1 ? 
[2, 1, 3, 4, 5, 6, 7, 8]
3 > 4 ? 
no swap
4 > 5 ? 
no swap
5 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 8 ? 
no swap
2 > 1 ? 
[1, 2, 3, 4, 5, 6, 7, 8]
2 > 3 ? 
no swap
3 > 4 ? 
no swap
4 > 5 ? 
no swap
5 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 8 ? 
no swap
1 > 2 ? 
no swap
2 > 3 ? 
no swap
3 > 4 ? 
no swap
4 > 5 ? 
no swap
5 > 6 ? 
no swap
6 > 7 ? 
no swap
7 > 8 ? 
no swap
sorted arr: [1, 2, 3, 4, 5, 6, 7, 8]
```