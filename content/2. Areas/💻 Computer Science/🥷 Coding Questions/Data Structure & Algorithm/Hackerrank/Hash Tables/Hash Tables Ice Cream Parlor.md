---
problem_type: search
date_attempted: 2023-12-18
link: https://www.hackerrank.com/challenges/ctci-ice-cream-parlor
---
### First Solution - Double for Loop
has time complexity of O(n^2) due to the nested loop

```swift
func whatFlavors(cost: [Int], money: Int) -> Void {

	// Write your code here
	/**
	cost: [1, 4, 5, 3, 2]
	money: 4
	*/

	var chosenFlavorIds: [String] = []

	for (i, item) in cost.enumerated() {
		for (j, item2) in cost.enumerated() {
			if (item + item2 == money) && i != j {
				// print("\(item) in idx \(i+1) and \(item2) in idx \(j+1)")
				chosenFlavorIds.append("\(i+1) \(j+1)")
			}
		}
	}
	print(chosenFlavorIds[0]) // Print yang pertama aja 
}
```
### Second Attempt - Hash Table
- ! had help from bard to understand this concep

```swift
func whatFlavors(cost: [Int], money: Int) -> Void {
	// Write your code here
	/**
	cost: [1, 4, 5, 3, 2]
	money: 4
	*/

	var cost_dictionary: [Int: Int] = [:]

	// 1. Initialize Hash Table
	for (i, item) in cost.enumerated() {
		// Key nya adalah kekurangan yang harus diisi, valuenya adalah index dari item yang sudah dikurangi
		cost_dictionary[money - item] = i
		/*
			cost_dictionary = {
				4-1 : 0 
				4-4 : 1
				4-5 : 2
				4-3 : 3
				4-2 : 4
			}
			cost_dictionary = {
				3 : 0 
				0 : 1
			   -1 : 2
				1 : 3
				2 : 4
			}
		*/
	}
	
	// 2. Loop through the costs
	for (i, item) in cost.enumerated() {
		// Cari index dari current item
		var complement_idx: Int? = cost_dictionary[item]
		/*
			i = 0, complement_idx = cost_dictionary[1] = 3
			i = 1, complement_idx = cost_dictionary[4] = -
			i = 2, complement_idx = cost_dictionary[5] = -
			i = 3, complement_idx = cost_dictionary[3] = 0
			i = 4, complement_idx = cost_dictionary[2] = 4
		*/
		if let complement_idx = complement_idx {
			// Karena harus distinct, maka index nya gaboleh sama 
			if complement_idx != i {
				// Ditambah 1 karena mintanya index (flavor id) mulai dari 1 
				print("\(i+1) \(complement_idx + 1)")
				break // Karena cuman diminta nya satu berarti kalo udh dapet ya selesai
			}
		}
	}
}
```