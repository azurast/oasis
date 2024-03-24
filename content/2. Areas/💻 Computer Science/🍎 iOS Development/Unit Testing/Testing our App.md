**by Azura Sakan Taufik**

**March 2023**
# Motivation
> source: [Apple Developer Documentation](https://developer.apple.com/documentation/xcode/adding-unit-tests-to-your-existing-project)

Let's start with a simple question, **Why?**

We're constantly writing code in our code base. Who can ensure that the changes we made will not affect other parts/areas of the code? Especially when we're collaborating. Different developer often have a different way of thinking. When our coworker is working on the code we've previously written, there may be changes and if not tested properly, can cause flaws in the business logic.

Unit testing allows us to have **confidence** that any changes we made will not cause regressions down the line.    

Beware that implementing unit test in the middle of an existing project **will be difficult**, but, it' **will be worth it**. This is because we may have made some poor design decisions that does not take into consideration about testing which may lead to **high coupling** of the codebase. We have to **reduce** coupling in order for our code to be testable, so it will require more effort and time on our end.

When creating a unit test, keep in mind of:
1. The component you want to test
2. The behaviour you want to assert

Prioritize features based on:
1. Number of bug reports
2. Highest regression impacts
# Good to Know: Types of Testing
> source: [Apple Developer Documentation](https://developer.apple.com/documentation/xcode/testing-your-apps-in-xcode)

![[Pasted image 20230320143414.png]]
in addition there is also performance testing but we can worry about that later after we cover this pyramid.
# Unit Testing
- Should assert the expected behaviour of **a single path** through a method or function in your project
- For **multiple paths**, write one test for each scenario, in our app it would be like writing a test for each type of user (anon, regon, suber) for example when opening a detail article, what's the expected results?
- Writing the test
	- Pick a class or function as 'subject under test', this means 1 class = 1 unit test file
	- Create a method that starts with the word `test`
		- Method should take no arguments & returns `Void`
## Structure & Naming Conventions
> source: [Swiftful Thinking](https://www.youtube.com/watch?v=eqdvIUKsM2A&t=5588s) and [Keep It Swift](https://www.keepitswift.com/test-naming-convention/)
### Test File Name
The same as the subject under test with additional suffix 'Tests'
Example:
- Subject under test: LoginByPhoneNumberVM
- Test file: LoginByPhoneNumberVMTests or optional using `_` underscore to separate for redability LoginByPhoneNumberVM_Tests
### Test File
```swift
classs SomeTests: XCTests {
	override func setUp() {
	
	}
	override func tearDown() {
	
	}
	
	// Your methods
	func test_methods() {
	
	}
}
```

1. **setUp** function is invoked before any of the tests are run
2. **tearDown** function is called after the tests are run

> [! info] Working Backwards
> It's a common practice to make your test fail first to ensure that it is running properly, then fix it according to your needs.
### Test Name
```
test_UnitOfWork_StateUnderTest_ExpectedBehaviour()
```
or
```
test_methodName_withConditions_shouldExpectation()
```

-  **Unit of Work**: A unit of work is **a use case in the system that startes with a public method and ends up with one of three types of results:** 
	- a return value/exception, 
	- a state change to the system which changes its behavior, 
	- or a call to a third party (when we use mocks). 
  so a unit of work **can be a small as a method, or as large as a class**, or even multiple classes. as long is it all runs in memory, and is fully under our control.
- **State Under Test**: the current condition of the unit 
- **Expected Behaviour**: the outcome we want from the specified condition 

examples: 
```
- test_onCardthumbTapped_withSuber_shouldBeOpened
- test_onSubscriptionTapped_withActivePurchaseToken_shouldShowApulo
```

> 🔥 This pattern is followed by many authors including Hacking With Swift, and is introduced by [Roy Osherove in 2005](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html). It's said to be efficient in avoiding unreadability and missing test cases.

Also, when we're stress testing it's good to differentiate them by adding a suffix of `stress()` at the end of the function name
### Test Content
Use the structure of :
- **Given** (some context)
- **When** (certain action is applied)
- **Then** (should...)
This is similar to what Apple advocates for in their documentation: 
- **Arrange** (dependencies)
	- Create any objects or data structures you need to use
	- Replace complex dependencies with easy-to-configure "stubs" to ensure deterministic result
	-  Adopt protocol-oriented programming
- **Act**
	- Call method/function using previously arranged dependencies
- **Assert**
	- Compare the expected & actual behaviour 
example:
```swift
func test_onCardthumbTapped_with5Entitlements_shouldBeTrue() {
	// Given
	let entitlements = 5
	let userType = .anon
	// When
	let showPaywall = entitlements > 5 && userType != .suber
	let vm = myVM(showPayWall: showPaywall)
	// Then
	XCAssertFalse(myVM.showPayWall)
}
```
### Folder Structure

## Mock vs Stub
> source: [tuntsdev](https://www.youtube.com/watch?v=ofx4Xh29JA0)
### Mock
Helps us use stubs that can be asserted to validate a flow
### Stub
Is a simple fake object to help you write your tests
Example: fake json response 

## Dependency Injection
> source: [tuntsdev](https://www.youtube.com/watch?v=9rjiTxn4ehE)

When an object or function depends on another object or function fo functionality 
## Reducing Coupling
### Replace concrete types with protocol
- When a class contains many functions and properties that can have different implementations
- Common area of problem:
	- Accessing external state
		- User documents/databases
		- **example**: tap buka email pada snackbar, di aplikasi kita pasti membuka default app tapi di test kita bisa menulis implementasi yang berbeda karena belum tentu semua user memiliki aplikasi email pada hp nya
	- Cases that don't have deterministic values
		- Network connections
		- Random value generator
### Replace named type with metatype value
- When a class creates or uses instances of aother class
- Common area of problem:
	- Creating a new document on the filesystem due to a user action
	- Interpret JSON & create new CoreData managed objects
		- **example**: download epaper
### Subclass and override untestable methods
- When a class combines custom logic with interactions and behaviour
- Common area of problem:
	- View Models
	- View Controllers
	- **example:** showing subscription status in sidenav/akun, we need to fetch data from user default in order to know what data to display
### Inject a singleton
- Turn the singleton into a parameter that can be replaced to support isolation for testing 
### Summary
| Tips                                     | Problem                                                                                            | Solution                                                                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Replace concrete types with protocol     | we can't have different implementations according to the test case that we want                    | create a protocol that lists the methods & properties used by your code, conform to the protocol in your tests and define your own implementation         |
| Replace named type with metatype value   | the object is created by the code we want to test, the object does not exist until the code is run | define a variable on the class under test that represents the _type_ of object it should construct, this way in your test you can access/use the variable |
| Subclass and override untestable methods | coupled between logic and ui interaction                                                           | subclass the view controller or view model and 'stub out' the methods that produces complexity and use the subclass to bne implemented in your tests      |
| Inject a singleton                       |                                                                                                    |                                                                                                                                                           |
# Types of Assertions
source: [AppsDeveloperBlog](https://www.appsdeveloperblog.com/a-list-of-xctest-assertions/)
## Unconditional Fail
### XCTFail
## Equality Tests
### XCTAssertEqual
### XCTAssertEqualWithAccuracy
### XCTAssertNotEqual
### XCTAssertGreaterThan
### XCTAssertLessThan
### XCTAssertLessThanOrEqual
## Boolean Tests
### XCTAssertTrue 
### XCTAssertFalse
## Nil Tests
### XCTAssertNil
### XCTAssertNotNil
### XCTAssertUnwrap
## Exception Tests
### XCTAssertThrowsError
### XCTAssertNoThrow
## Custom Assertion Tests
> source: [Swift by Sundell](https://www.swiftbysundell.com/articles/test-assertions-in-swift/#custom-assertion-functions)
# References
- Roy's Book
- https://www.swiftbysundell.com/discover/unit-testing/
- https://developer.apple.com/documentation/xcode/improving-your-app-s-performance
- https://qualitycoding.org/unit-test-naming/
- https://medium.com/@dhawaldawar/how-to-mock-urlsession-using-urlprotocol-8b74f389a67a
- https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html
- https://github.com/tunds/SwiftUIiOSTakeHomeTest
# What's Next?
1. Since testing folder structure should follow the structure of the original code, it's best for us to **organize the existing folder first** to avoid confusion and double work.
2. Ensure everything is already using Async/Await in order for all the code to be the same. If I'm not mistaken, writing unit test for Swift's async/await concurrency is slightly different with Combine. 
3. Define the scope of our unit tests based on our current architecture: service, repo, vm
4. Trial and error to identify coupling in our code base especially with singletons
5. Start from client api & api service first before moving on to next scope

# Concerns
1. Testing a function which outputs a navigation process? for example: after finishing recaptcha if success we want the sheet to be dismissed and the fullscreen cover to be dismissed as well. How do we test this? or should we just ensure the registered api & membership api are called?
2. Tried mocking the client api & an api service but ran into a a little bit of confusion:
	- Since ClientAPI requires a specific service to be dispatched, does it mean we don't need to create a test for that struct?
	- When trying to mock for an api service, ran ito confusion because most tutorials and resources do not use 'client api' to help dispatching the service, instead most of them calls `URLSessionDataTask` from within the api service, which was pretty easy to understand. However, as in our case, because we are using client api, we need to mock the `URLSession` that is within that struct. 
	- At first I thought we simply need to create a `protocol` so that we can have a `MockClientAPI`. However, it turns out that its not the case since `URLSession` cannot be sublcassed. Init in `URLSession` is not allowed, and we need to init data & response to return the method that we use which is `data(for request: URLRequest)`. 
	- ![[Screenshot 2023-03-24 at 13.29.50.png]]
	- Because of this limitation, I tried another way that allows for us to still use `URLSession` but instead of mocking that class right away, we mock the `URLProtocol` which will be assigned as the protocol inside of `URLSessionConfiguration` for our `URLSession`. Although, the behaviour is a little bit different. The thorough explanation can be found [here](https://medium.com/@dhawaldawar/how-to-mock-urlsession-using-urlprotocol-8b74f389a67a).
	- However, in our case, these configurations 'happens' inside the `loadData` function in `ClientAPI`, when what we need is for that configuration to happen inside the unit test.
	