# Sean Allen iOS Interview Questions - Theory
#SeanAllen #ios #interview
## Concurrency
### What is concurrency?
Doing multiple process at the same time
Can be done because multi core processors
Can be done by multi threading on the cores
Main Thread needs to be speedy & clean because UI is here. We want it to be responsive.
### Grand Central Dispatch & NSOperation Queues
API built on top of this threading to make it easier for developers
### What's a Queue?
Lining up 
FIFO - First in First Out
**Serial Queue**

| Pros                                                             | Cons                           |
| ---------------------------------------------------------------- | ------------------------------ |
| - Predictable execution order because it is linear and dependent | - Slower because one at a time |
| - Prevents race condition                                        | - Prevents race condition      |
 
 **Concurrent Queue**
 use when order is irrelevant
 
| Pros                      | Cons                           |
| ------------------------- | ------------------------------ |
| - Faster                  | - Unpredictable order of completion because depends on the system managing resources|

```swift
DispatchQueue.main.async {
	self.tableView.reloadData()
}
```

> [!QUESTION]
> What does this code mean?
> Dispatching the work that has been done on the background thread into the main thread so that the UI updates for changes.

## Automatic Reference Counting & Retain Cycles → Memory Leaks in Closures

Automatic Reference Counting is Swift's way to keep track of how many strong references are pointing to a specific instance.

- to track and manage memory usage
- don't need to think about it yourself
- autmatically frees up memory used by class instances when they are no longer needed
- only applies to instances of classes because they are reference type while enums & structs are values types thus not stored and passed by reference.
- Everytime an instance of a class is created/instantiated, ARC takes a chunk of memory to store information about that instance
- Whenever that instance is no longer needed, that memory is freed by ARC so that it can be used for other things

 > [! Question] **How to ensure that ARC does not deallocate an instance while it is still being used?**

ARC works by tracking the number of:
- properties
- constants
- variables
that are being referred in the instance of the class

Thus, as long as there is **one** active reference to that instance, it still exists in memory. This is the reason we have **strong & weak** reference types. Whenever we create a variable of optional type, that it is automatically initialized with a value of nil. Then we create a new instance of that type and assign it
## Communication Patterns (Delegates vs Notification/Observers)

## View Lifecycle

## Classes vs Structs

## Filter, Map, Reduce

## Testing

## 3rd Party Libraries


## Gesture Recognizers

## Networking

## Merge Sort

## Shuffle Array

## Debugging → Find errors without running

## Modulo Probelms