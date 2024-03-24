In Swift, `Codable`, `Encodable`, and `Decodable` are **protocols that provide a convenient way to convert between Swift types and external representations, such as JSON or property lists.** Let's break down their roles:
### Codable:
- **`Codable` Protocol:**
   - `Codable` is a protocol in Swift that combines `Encodable` and `Decodable`. If a type conforms to `Codable`, it means it **can be both encoded to an external representation and decoded from that representation.**

```swift
struct Person: Codable {
	var name: String
	var age: Int
}
```
### Encodable:
- **`Encodable` Protocol:**
   - If a type conforms to `Encodable`, it means it **can be encoded to an external representation** (like JSON or property list).
   - Conforming types implement the `func encode(to encoder: Encoder) throws` method, where they specify how their properties should be encoded.

```swift
struct Person: Encodable {
	var name: String
	var age: Int

	func encode(to encoder: Encoder) throws {
		var container = encoder.container(keyedBy: CodingKeys.self)
		try container.encode(name, forKey: .name)
		try container.encode(age, forKey: .age)
	}

	enum CodingKeys: String, CodingKey {
		case name, age
	}
}
```

### Decodable:
- **`Decodable` Protocol:**
   - If a type conforms to `Decodable`, it means it **can be decoded from an external representation** (like JSON or property list).
   - Conforming types implement the `init(from decoder: Decoder) throws` initializer, where they specify how to initialize themselves based on the decoded data.

```swift
struct Person: Decodable {
	var name: String
	var age: Int

	init(from decoder: Decoder) throws {
		let container = try decoder.container(keyedBy: CodingKeys.self)
		name = try container.decode(String.self, forKey: .name)
		age = try container.decode(Int.self, forKey: .age)
	}

	enum CodingKeys: String, CodingKey {
		case name, age
	}
}
```
### Usage:
- **Encoding:**
   - To encode a `Codable` type, you use an instance of `JSONEncoder` or another encoder (like `PropertyListEncoder`).

    ```swift
    let person = Person(name: "John", age: 30)

    do {
        let jsonData = try JSONEncoder().encode(person)
        // jsonData can be sent to a server or saved to a file
    } catch {
        // Handle encoding error
    }
    ```

- **Decoding:**
   - To decode a `Codable` type, you use an instance of `JSONDecoder` or another decoder (like `PropertyListDecoder`).

    ```swift
    let jsonString = """
        {"name": "John", "age": 30}
    """

    do {
        let decodedPerson = try JSONDecoder().decode(Person.self, from: jsonString.data(using: .utf8)!)
        // Use decodedPerson as needed
    } catch {
        // Handle decoding error
    }
    ```

### Benefits:

- **Convenience:**
   - `Codable` protocols provide a convenient way to work with external representations without having to write a lot of manual serialization/deserialization code.

- **Type Safety:**
   - Swift's type system ensures that the decoding process produces instances of the correct types, adding a layer of safety to data conversion.

- **Interoperability:**
   - Codable types facilitate easy integration with web services and data storage formats that use JSON or property lists.

In summary, `Codable`, `Encodable`, and `Decodable` are crucial protocols in Swift, enabling seamless serialization and deserialization of data. They simplify the process of working with external representations, providing a standardized way to encode and decode Swift types.