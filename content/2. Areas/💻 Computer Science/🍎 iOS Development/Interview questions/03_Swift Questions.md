# iOS Swift Questions
#ios #swift
### What is Protocol Extensions?
We can adopt protocols using extensions as well as on the original 
type declaration. This allows you to add protocols to types you don’t 
necessarily own.
### Why do we use availability attributes ?
Apple wants to support one system version back, meaning that we should support iOS9 or iOS8. [Availability Attributes](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html) lets us to support previous version iOS.
### What’s the difference optional between nil and .None?
There is no difference. Optional.None (.None for short) is the 
correct way of initializing an optional variable lacking a value, 
whereas nil is just syntactic sugar for .None.
### How do you follow up clean code for this project ?
I follow style guide and coding conventions for Swift projects of [Github](https://github.com/raywenderlich/swift-style-guide) and SwiftLint.
### How many different ways to pass data in Swift ?
There are many different ways such as Delegate, KVO, Segue, and NSNotification, Target-Action, Callbacks.
### When do you use optional chaining vs. if let or guard ?
We use optional chaining when we do not really care if the operation 
fails; otherwise, we use if let or guard. Optional chaining lets us run 
code only if our optional has a value.

Using the question mark operator like this is called optional chaining. Apple’s documentation explains it like this:

Optional chaining is a process for querying and calling properties, 

methods, and subscripts on an optional that might currently be nil. If 

the optional contains a value, the property, method, or subscript call 

succeeds; if the optional is nil, the property, method, or subscript 

call returns nil. Multiple queries can be chained together, and the 

entire chain fails gracefully if any link in the chain is nil.

  

### Could you explain Associatedtype ?

  

If you want to create Generic Protocol we can use associatedtype. For more details check this out.

  

### What is the difference Filter and Map Function ?

  

Map, we pass in a function that returns a value for each element in 

an array. The return value of this function represents what an element 

becomes in our new array.

  

Filter, we pass in a function that returns either true or false for 

each element. If the function that we pass returns true for a given 

element, then the element is included in the final array.

  

### What is DispatchGroup ?

  

DispatchGroup allows for aggregate synchronization of work. We can 

use them to submit multiple different work items and track when they all

 complete, even though they might run on different queues. This behavior

 can be helpful when progress can’t be made until all of the specified 

tasks are complete.

  

### Explain subscripts ?

  

Classes, structures, and enumerations can define subscripts, which 

are shortcuts for accessing the member elements of a collection, list, 

or sequence.

  

### What is Nil Coalescing & Ternary Operator ?

  

nil coalescing - `??`

teranry - `? :`

It is an easily return an unwrapped optional, or a default value. If we do not have value, we can set zero or default value.

  

### What is the Swift main advantage ?

  

To mention some of the main advantages of Swift:

  

Optional Types, which make applications crash-resistant.

  

Built-in error handling.

  

Closures.

  

Generics, Protocol Extensions and Constraints make it easy to reuse code and implement new functionality.

  

Faster in execution when using best practices (Slower in compilation).

  

Type-safe language.

  

Supports pattern matching.

  

More human readable code.

  

### What is the difference CollectionViews & TableViews ?

  

TableViews display a list of items, in a single column, a vertical fashion, and limited to vertical scrolling only.

  

CollectionViews also display a list of items, however, they can have multiple columns and rows.

  

### What is Alamofire doing ?

  

Alamofire uses URL Loading System in the background, so it does 

integrate well with the Apple-provided mechanisms for all the network 

development. This means, It provides chainable request/response methods,

 JSON parameter and response serialization, authentication, and many 

other features. It has thread mechanics and execute requests on a 

background thread and call completion blocks on the main thread.

  

### Explain [weak self] and [unowned self] ?

  

unowned ( non-strong reference ) does the same as weak with one 

exception: The variable will not become nil and must not be an optional.

  

When you try to access the variable after its instance has been 

deallocated. That means, you should only use unowned when you are sure, 

that this variable will never be accessed after the corresponding 

instance has been deallocated.

  

However, if you don’t want the variable to be weak AND you are sure 

that it can’t be accessed after the corresponding instance has been 

deallocated, you can use unowned.

  

Every time used with non-optional types

Every time used with let

By declaring it [weak self] you get to handle the case that it might be 

nil inside the closure at some point and therefore the variable must be 

an optional. A case for using [weak self] in an asynchronous network 

request, is in a view controller where that request is used to populate 

the view.

  

### Method Swizzling in Swift

  

Method Swizzling is a well known practice in Objective-C and in other languages that support dynamic method dispatching.

  

Through swizzling, the implementation of a method can be replaced 

with a different one at runtime, by changing the mapping between a 

specific #selector(method) and the function that contains its 

implementation.

  

To use method swizzling with your Swift classes there are two requirements that you must comply with:

  

The class containing the methods to be swizzled must extend NSObject

The methods you want to swizzle must have the dynamic attribute

  

### What is the difference Non-Escaping and Escaping Closures ?

  

The lifecycle of a non-escaping closure is simple:

  

Pass a closure into a function

The function runs the closure (or not)

The function returns

Escaping closure means, inside the function, you can still run the 

closure (or not); the extra bit of the closure is stored some place that

 will outlive the function. There are several ways to have a closure 

escape its containing function:

  

Asynchronous execution: If you execute the closure asynchronously on a

 dispatch queue, the queue will hold onto the closure for you. You have 

no idea when the closure will be executed and there’s no guarantee it 

will complete before the function returns.

Storage: Storing the closure to a global variable, property, or any 

other bit of storage that lives on past the function call means the 

closure has also escaped.

  

### Explain generics ?

  

Generics create code that does not get specific about underlying data types.

  

Generics allow us to know what type it is going to contain.

  

Generics provide code reusability.

  

### Explain lazy ?

  

An initial value of the lazy stored properties is calculated only 

when the property is called for the first time. There are situations 

when the lazy properties come very handy to developers.

  

### Explain what is defer ?

  

defer keyword which provides a block of code that will be executed in the case when execution is leaving the current scope.

  

### What is Enum ?

  

"OR" Type. Enum represents a group of all possible values the Object can represent.

  

### What is Operator Overloading ?

  

Operator overloading allows us to change how existing operators behave with types that both already exist.

  

### How to pass a variable as a reference ?

  

We need to mention that there are two types of variables: reference 

and value types. The difference between these two types is that by 

passing value type, the variable will create a copy of its data, and the

 reference type variable will just point to the original data in the 

memory.

To pass value type as a reference we use &valueTypeVariable as an 

inout parameter in the function.

  

### Please explain Swift’s pattern matching techniques

  

Tuple patterns are used to match values of corresponding tuple types.

Type-casting patterns allow you to cast or match types.

Wildcard patterns match and ignore any kind and type of value.

Optional patterns are used to match optional values.

Enumeration case patterns match cases of existing enumeration types.

Expression patterns allow you to compare a given value against a given expression.

  

### Please explain final keyword ?

  

By adding the keyword final in front of the method name, we prevent the method from being overridden. Can substitute `final class` keyword with a single word `static` and get the same behavior.

  

Final classes can't be subclassed

  

### What is the difference `open` & `public` access level ?

  

open allows other modules to use the class and inherit the class; for

 members, it allows others modules to use the member and override it.

  

public only allows other modules to use the public classes and the 

public members. Public classes can no longer be subclassed, nor public 

members can be overridden.

  

### What is the difference `fileprivate`, `private` and `public private(set)` access level ?

  

fileprivate is accessible within the current file, private is accessible within the current declaration.

  

public private(set) means getter is public, but the setter is private.

  

### What is Internal access ?

  

Internal access enables entities to be used within any source file 

from their defining module, but not in any source file outside of the 

module.

  

Internal access is the default level of access. So even though we 

haven’t been writing any access control specifiers in our code, our code

 has been at an internal level by default.

  

### Explain Forced Unwrapping

  

When we defined a variable as optional, then to get the value from 

this variable, we will have to unwrap it. This just means putting an 

exclamation mark at the end of the variable.

  

### Explain Swift Standard Library Protocol ?

  

There are a few different protocol. Equatable protocol, that governs 

how we can distinguish between two instances of the same type. That 

means we can analyze. If we have a specific value is in our array. The 

comparable protocol, to compare two instances of the same type and 

sequence protocol: prefix(while:) and drop(while:) [SE-0045].

  

Swift 4 introduces a new `Codable` protocol that lets us serialize and deserialize custom data types without writing any special code.

  

### Explain Swift Package Manager

  

The Swift Package Manager will help to vastly improve the Swift 

ecosystem, making Swift much easier to use and deploy on platforms 

without Xcode such as Linux. The Swift Package Manager also addresses 

the problem of dependency hell that can happen when using many 

interdependent libraries.

  

The Swift Package Manager only supports using the master branch. 

Swift Package Manager now supports packages with Swift, C, C++ and 

Objective-C.

  

### How is an inout parameter different from a regular parameter?

  

An Inout is passed as function parameter.

  

Inside a function ****the local copy**** is modified

  

Before function returns it takes `inout` object and sets it's value equal to that local copy

  

So it seems like you pass parameter by reference, however it's not actually the case

  

### What are benefits of Guard ?

  

There are two big benefits to guard. One is avoiding the pyramid of 

doom, as others have mentioned — lots of annoying if let statements 

nested inside each other moving further and further to the right. The 

other benefit is provide an early exit out of the function using break 

or using return.