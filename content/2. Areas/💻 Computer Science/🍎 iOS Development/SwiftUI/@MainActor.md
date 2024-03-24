#concurrency #swift 
# @MainActor
All user interface changes are updated in the **main queue**, and some async processes such as async image fetching/loading, update network response to list or grid. 

## What is a MainActor?
@MainActor is a globally unique actor providing an executor which **performs its tasks on the main thread.**

It is an example of a GlobalActor

## How to use MainActor?
When you put @MainActor on one of them, we can make them perform their tasks on the main thread.

### Adding @MainActor
on a class
```swift
@MainActor 
final class HomeViewModel { 
	// .. 
}
```

on a property
```swift
final class HomeViewModel { 
   @MainActor var images: [UIImage] = [] 
}
```

on a function 
```swift
@MainActor 
func updateViews() { 
	// Perform UI updates.. 
}
```

on a closure
```swift
func updateData(completion: @MainActor @escaping () -> ()) { 
	/// Example dispatch to mimic behavior
	DispatchQueue.global().async { 
		async { 
			await completion() 
		} 
	} 
}
```

### Direct Call
It comes with an extension that you can call directly

```swift
async { 
   await MainActor.run { 
   // Perform UI updates 
   } 
}
```

## References
- https://medium.com/@nimjea/use-mainactor-in-swiftui-to-run-code-in-the-main-queue-693a009ca8f8
- https://www.avanderlee.com/swift/mainactor-dispatch-main-thread/
- https://www.swiftbysundell.com/articles/the-main-actor-attribute/