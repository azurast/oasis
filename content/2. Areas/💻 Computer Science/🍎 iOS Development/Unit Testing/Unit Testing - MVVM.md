> source: [James Haville](https://www.youtube.com/watch?v=kHtEtAP4DNA)
- When fetching something from the API, we need to be able to mock them so we are not reliant on them.
- We want to isolate the view model.
- We can isolate using protocol of the service.
- Injecting mock service into the view model.

```swift
/// Test
class SomeTests: XCTestCase {
	var someVM: SomeVM!
	var mockSomeService: MockSomeService!
	
	override func setUp() {
		someVM = .init(someService: mockSomeService)
	}

	func testSomeService_shouldSuccess() {
		someVM.someFunc()
		XCTAssertTrue(someVM.isSuccess)
	}
}
```

```swift
// Mock Service
final class MockSomeService: SomeServiceProtocol {
	// Functions in that protocol
	func someApiCall() {
		completion(.success(()))
	}
}
```
