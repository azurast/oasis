---
link: https://www.hackerrank.com/challenges/ctci-making-anagrams/
language: Swift
tags:
  - StringManipulation
level: Easy
---
```swift
func makeAnagram(a: String, b: String) -> Int {
    // Write your code here
    // anagram = true if 
    // letters of first string can be rearranged to dorm the second string.
    // frequency matters
    // a & b may be of different length
    // Determine number of character deletions to make the two strings anagram
    // The characters can be deleted from either strings
    
    // create a hash table that keeps track of each character count for both strings
    var hashTableA: [Character: Int] = [:]
    var hashTableB: [Character: Int] = [:]
    
    for char in a {
        hashTableA[char, default: 0] += 1
    }
    
    for char in b {
        hashTableB[char, default: 0] += 1
    }
    
    let matchingCharA = hashTableA.filter { hashTableB.keys.contains($0.key) } 

    let matchingCharB = hashTableB.filter { hashTableA.keys.contains($0.key)}
    
    // even though we already have the count for the matching keys, we still havent taken into account of the possible differences in count, when in reality, anagrams are supposed to have exact values. so if a key in string A has 3 count, and string B has 4 count, then we still need to take out the 1
    var difference: [Character: Int] = [:]
    
    for (key, valueA) in matchingCharA {
        if let valueB = matchingCharB[key] {
            let diff: Int = abs(valueA - valueB)
            difference[key] = diff
        }
    }
    
    // print("difference: \(difference)")
    // print("matchingA: \(matchingCharA)")
    // print("matchingB: \(matchingCharB)")
    
    let nonMatchingCharA = hashTableA.filter { !hashTableB.keys.contains($0.key)} 

    let nonMatchingCharB = hashTableB.filter { !hashTableA.keys.contains($0.key)}
    
    // print("nonMatchingA: \(nonMatchingCharA)")
    // print("nonMatchingB: \(nonMatchingCharB)")    
    
    var total = 0
    var totalA = nonMatchingCharA.values.reduce(0, +)
    var totalB = nonMatchingCharB.values.reduce(0, +)
    var totalDiff = difference.values.reduce(0, +)
    
    total = totalA + totalB + totalDiff
    // print("totalA: \(totalA)")
    // print("totalB: \(totalB)")
    
    return total
}
```