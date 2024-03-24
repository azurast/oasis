### Class:

1. **Reference Type:**
   - Classes are reference types. When you assign a class instance to a new variable or pass it as a parameter, you're creating a reference to the same instance.
   - Example:

    ```swift
    class Person {
        var name: String

        init(name: String) {
            self.name = name
        }
    }

    let personA = Person(name: "John")
    let personB = personA // Both personA and personB refer to the same instance
    ```

2. **Inheritance:**
   - Classes support inheritance, allowing you to create a hierarchy of related classes with a base class and derived classes.
   - Example:

    ```swift
    class Vehicle {
        var brand: String

        init(brand: String) {
            self.brand = brand
        }
    }

    class Car: Vehicle {
        var model: String

        init(brand: String, model: String) {
            self.model = model
            super.init(brand: brand)
        }
    }
    ```

3. **Identity and Mutability:**
   - Classes have identity, and their instances can be modified even if declared as constants (with `let`).
   - Example:

    ```swift
    let car = Car(brand: "Toyota", model: "Camry")
    car.model = "Corolla" // Modifying the instance, even though 'car' is declared as 'let'
    ```

### Struct:

1. **Value Type:**
   - Structs are value types. When you assign a struct instance to a new variable or pass it as a parameter, you're creating a copy of the instance.
   - Example:

    ```swift
    struct Point {
        var x: Double
        var y: Double
    }

    var pointA = Point(x: 1.0, y: 2.0)
    var pointB = pointA // pointB is a copy of pointA
    ```

2. **No Inheritance:**
   - Structs do not support inheritance. They cannot inherit from other types or be inherited from.
   - Example:

    ```swift
    struct Rectangle {
        var width: Double
        var height: Double
    }
    ```

3. **Immutability:**
   - Struct instances are immutable by default when declared as constants (with `let`). This means their properties cannot be modified after initialization.
   - Example:

    ```swift
    let rectangle = Rectangle(width: 5.0, height: 10.0)
    // rectangle.width = 7.0 // This will result in a compilation error
    ```

### Choosing Between Class and Struct:

- **Use Classes When:**
   - Identity and shared state are important.
   - You need reference semantics (sharing the same instance among different parts of your code).
   - You want to use inheritance.

- **Use Structs When:**
   - Copying behavior is desired, and you want to avoid shared mutable state.
   - You are working with a simple piece of data that doesn't need inheritance.
   - You want value semantics.

In Swift, both classes and structs have their use cases, and the choice often depends on the nature of the data or functionality you are modeling. Swift's standard library heavily utilizes both structs and classes to provide a balanced and flexible approach for developers.