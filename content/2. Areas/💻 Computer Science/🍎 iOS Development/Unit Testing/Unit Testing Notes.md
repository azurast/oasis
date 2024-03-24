### Test Function Template 
```swift
test_[FUNCTION_NAME]_[CONNECTION STATUS]_[REQUEST TYPE]_[EXPECTED OUTCOME] () {
	// ⓵ Given (Arrange)
	// ⓶ When (Act)
	// ⓷ Then (Assert)
}
```

## 1. Async Function with Void Return

### Positive Test
> **test_fetchMembership_withOnlineConnection_200Request_shouldBeSuccess**

Berarti ini kita sedang test function **fetchMembership** jika status koneksi **online** dan bentuk request yang kita berikan itu sesuai dengan ekspektasi server yang akan memberikan return status code **200** sehingga expected outcome/behaviournya adalah **sukses**.
#### Given (Arrange)
Pada tahap pertama, kita mendefinisikan apa saja yang dibutuhkan dalam pengetesan. Disini kita sediakan response yang ingin di return, mock client api, mock connection, dan terakhir, apa yang ingin kita test. Dalam kasus ini yang ingin di test adalah fucntion `fetchMembership` yang dimiliki oleh `membershipApiService`. 

```swift
func test_fetchMembership_withOnlineConnection_200Request_shouldBeSuccess() async throws {

        // ⓵ Given (Arrange)
        // Load the mock JSON response from the file
        guard 
        let responseURL = Bundle(for: type(of: self)).url(forResource: "CheckSubscriptionResponse_200", withExtension: "json"),
        let responseData = try? Data(contentsOf: responseURL) else {
	        XCTFail("Failed to load the mock JSON response")
            return
        }

        // Define the client api
        let mockClientApi = MockClientAPI(shouldSucceed: true, mockData: responseData)

        // Define the connection status
        let mockConnection = MockReachability(reachabilityStatus: .online(.wiFi))

        // Define the api service
        let membershipApiService = MembershipServiceImpl(clientApi: mockClientApi, connection: mockConnection)
        
        ...
    }
```

#### When (Act)
Selanjutnya, pada tahap kedua, kita perlu menulis apa yang seharusnya terjadi apabila function dipanggil dalam kondisi-kondisi yang sudah didefinisikan pada tahap pertama. Untuk itu kita perlu merujuk pada ekspektasi pada nama function. Pada kasus ini, karena kita ekspektasinya adalah sukses, maka kita tulis ekspektasinya adalah fungsi async berjalan sampai selesai dan tidak men-throw error apapun. Khususnya karena function `fetchMembership` adalah void function yang tidak memberikan return apa-apa, cara assertnya adalah dengan menulis expectation tersebut. Bagaimana kita tahu apabila ekspektasi sudah terpenuhi? Ketika function `fetchMembership()` jalan dan koneksi online serta response memberikan 200, maka ia akan menyelesaikan function, oleh karena itu kita menaruh `expectation.fulfill()` di dalam `do` block. 

```swift
func test_fetchMembership_withOnlineConnection_200Request_shouldBeSuccess() async throws {

        ...
        
        // ⓶ When (Act)
        let expectation = XCTestExpectation(description: "Async function completes and throws no error")

        do {
            try await membershipApiService.fetchMembership()
            expectation.fulfill()
        } catch {
            XCTFail("Unexpected error: \(error)")
        }
        
        ...
}
```

#### Then (Assert)
Yang terakhir, di tahap ketiga, kita ingin melakukan assertion terhadap expectation, apakah sudah sesuai atau belum. Ini bisa dilakukan dengan menggunakan `XCTWaiter` yang berperan sebagai perantara yang 'nungguin' hasil dari expectation. Kita juga harus mendefinisikan berapa lama waiter harus menunggu untuk mendapatkan hasil, jika tidak mendapatkan result dalam waktu yang ditentukan maka value akan menjadi `timeout`. Jika semua berjalan sesuai ekspektasi maka status result akan berubah menjadi `.complete`. Result inilah yang kita assert untuk menentukan apakah hasil sudah benar atau belum

```swift
func test_fetchMembership_withOnlineConnection_200Request_shouldBeSuccess() async throws {

        ...
        // ⓷ Then (Assert)
        let waiter = XCTWaiter()
        let result = waiter.wait(for: [expectation], timeout: 10.0)
        XCTAssertEqual(result, .completed, "Something went wrong when asserting \(result)")
        
    }
```

Berdasarkan [dokumentasi](https://developer.apple.com/documentation/xctest/xctwaiter/result) Apple, beberapa kemungkinan result adalah sebagai berikut:
![[Screenshot 2023-08-03 at 13.05.40.png]]

### Negative Test

```swift
func test_fetchMembership_withOnlineConnection_404Request_shouldThrowMaintenance() async throws {

        // ⓵ Given (Arrange)
        // Load the mock JSON response from the file

        guard let responseURL = Bundle(for: type(of: self)).url(forResource: "CheckSubscriptionResponse_404", withExtension: "json"),
              let responseData = try? Data(contentsOf: responseURL) else {
            XCTFail("Failed to load the mock JSON response")
            return
        }

        // Define the client api
        let mockClientApi = MockClientAPI(shouldSucceed: true, mockData: responseData)

        // Define the connection status
        let mockConnection = MockReachability(reachabilityStatus: .online(.wiFi))

        // Define the api service
        let membershipApiService = MembershipServiceImpl(clientApi: mockClientApi, connection: mockConnection)

        // ⓶ When (Act)
        let expectation = XCTestExpectation(description: "Throws maintenance error")

        do {
            try await membershipApiService.fetchMembership()
        } catch {
            expectation.fulfill()
        }

        // ⓷ Then (Assert)
        let waiter = XCTWaiter()
        let result = waiter.wait(for: [expectation], timeout: 10.0)
        XCTAssertEqual(result, .completed, "Something went wrong when asserting \(result)")

    }
```

Sama aja tapi kebalikannya `expectation.fulfill()` nya ketika function `fetchMembership()` throw error. Karena yang mau di assert adalah function men-throw error.
## 2. Async Function with Specific Return Type 
### Positive Test
Mirip banget cuman bedanya value dari function yang dijalanan di assign variable. Terus, cara assert nya bisa macem-macem, kalo disini dari value nya gak kosong aja.
```swift
func test_getHotTopics_withOnlineConnection_200Request_shouldReturnList() async throws {

        // ⓵ Given (Arrange)
        guard let responseURL = Bundle(for: type(of: self)).url(forResource: "HotTopicResponse_200", withExtension: "json"),
              let responseData = try? Data(contentsOf: responseURL) else {
            XCTFail("Failed to load the mock JSON response")
            return
        }

        let mockClientApi = MockClientAPI(shouldSucceed: true, mockData: responseData)

        let mockConnection = MockReachability(reachabilityStatus: .online(.wiFi))

        let hotTopicApiService = HotTopicApiServiceImpl(clientApi: mockClientApi, connection: mockConnection)

        // ⓶ When (Act)
        do {
            let result = try await hotTopicApiService.getHotTopics(param: "")
            // ⓷ Then (Assert)
            XCTAssertNotNil(result)
        } catch {
            XCTFail("Unexpected error: \(error)")
        }

    }
```
### Negative Test
Sama kayak sebelumnya cuman bedanya assertion testnya aja, kita assert di `catch` block nya supaya ensure bahwa function nya throw error.
```swift
func test_getHotTopics_withOfflineConnection_200Request_shouldReturnList() async throws {

        // ⓵ Given (Arrange)

        guard let responseURL = Bundle(for: type(of: self)).url(forResource: "HotTopicResponse_200", withExtension: "json"),
              let responseData = try? Data(contentsOf: responseURL) else {
            XCTFail("Failed to load the mock JSON response")
            return
        }


        let mockClientApi = MockClientAPI(shouldSucceed: true, mockData: responseData)

        let mockConnection = MockReachability(reachabilityStatus: .offline)

        let hotTopicApiService = HotTopicApiServiceImpl(clientApi: mockClientApi, connection: mockConnection)

        // ⓶ When (Act)

        do {
            let result = try await hotTopicApiService.getHotTopics(param: "")
            XCTFail("Should not be true because connection is Offline")
        } catch {
            // ⓷ Then (Assert)
            XCTAssertEqual(error as! NetworkRequestError, NetworkRequestError.offline)
        }

    }
```

