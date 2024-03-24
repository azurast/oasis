![[01_SeanAllen_Theory#Automatic Reference Counting & Retain Cycles → Memory Leaks in Closures]]

**Strong reference cycle/retain cycle** occurs when two or more objects hold strong references to each other, preverenting ARC from deallocating these objects which may cause memory leak.

## Real World Scenarios of ARC

**1.	Delegate Pattern:**
•	In the delegate pattern, one object delegates certain responsibilities to another object. Using a strong reference in this scenario can create a retain cycle.
•	For example, a view controller might be a delegate to a custom view. Making the delegate reference weak ensures that the view controller can be deallocated when needed.

```swift 
protocol CustomViewDelegate: class {
    // Some delegate methods
}

class CustomView: UIView {
    weak var delegate: CustomViewDelegate?
}
```

2.	**Closure Capture:**
•	When using closures, especially in asynchronous operations, capturing self strongly in the closure can lead to retain cycles.
•	Using `[weak self]` or `[unowned self]` in the closure captures ensures that the closure doesn’t keep a strong reference to self, preventing memory leaks.

Function:
```swift
func fetchDataFromServer(completion: @esc

aping (Result<Data, Error>) -> Void) {
    // Asynchronous data fetching
    // ...

    // Call the completion handler when data is ready
    if let data = fetchedData {
        completion(.success(data))
    } else {
        let error = NSError(domain: "com.yourapp", code: 42, userInfo: nil)
        completion(.failure(error))
    }
}
```

![[Recording 20231226064826.m4a]]
Calling the function:
- `self` (the instance of the object in which the closure is defined).
- `self` is a keyword that represents the instance of the current object within a method/property/closure. It's essentially a way to refer to the current instant of the class or struct.
- In closures, `self` helps distinguish between properties or methods of the current instance and those of the closure itself. 
- `[weak self]` in closures tells the closure to hold a weak reference to the instance of the object.
```swift
fetchDataFromServer { [weak self] result in
    // Handle result without creating a strong reference cycle
    self?.updateUI(with: result)
}
```

**Better Example**
•	To avoid strong reference cycles and potential memory leaks, especially when closures might outlive the object they capture, you use `[weak self]`.
•	This specifies that the closure should hold a weak reference to the instance of the object. If the object is deallocated, the weak reference becomes nil, preventing a retain cycle.

```swift
class SomeClass {
    var completionHandler: (() -> Void)?

    func startTask() {
        self.completionHandler = { [weak self] in
            // Inside the closure, use '[weak self]' to avoid retain cycles
            print("Task completed by \(self)")
        }
    }
}
```

When you use [weak self] inside a closure that is defined within the context of SomeClass, it means:

1.	**Instance of SomeClass**: `[weak self]` specifies that ==self inside the closure refers to an instance of SomeClass.== This is because the closure is defined within the context of SomeClass.
2.	**Weak Reference**: `[weak self]` further indicates that the closure ==should hold a weak reference to this instance of SomeClass==. This is crucial to prevent a strong reference cycle.

3.	**View Controllers and Navigation Controllers:**
	•	When dealing with navigation controllers, it’s common to use weak references for delegates or closures to avoid retaining the entire navigation stack.
	•	For instance, when presenting a view controller and specifying a closure for the completion, using weak can prevent unintentional strong references.

```swift
navigationController?.pushViewController(nextViewController, animated: true) { [weak self] in
    // Closure executed upon completion, with a weak reference to self
    self?.handleCompletion()
}
```

**Using weak** in these scenarios helps in managing memory more efficiently and prevents potential memory leaks, **ensuring that objects are deallocated when they are no longer needed.**