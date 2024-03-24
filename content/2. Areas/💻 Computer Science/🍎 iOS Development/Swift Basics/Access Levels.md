Source: https://medium.com/@knoo/ios-interview-questions-2023-7fd56079f363

**1. open** 
==Note: Accessible from anywhere.==  
With the “**open**” keyword our data is accessible from anywhere what that means? When you define your class with the “**open**” keyword we ==can see that code from another module, packages, and so on==. The “**open**” keyword is very useful when you want to create your own framework or libraries as Combine, Alamofire, and so on.

**2. public**
==Note: Accessible from anywhere.==  
You can wonder why the “**public**” keyword gives the same access controls but there is one difference from the “**open**” keyword. Both “**public**” and “**open**” allow access from other modules, **“open” additionally allows other modules to subclass and override classes** and their members but “**public**” does give that permission.

**3. internal (by default)**
==Note: Declarations are accessible only within the defined module.==  
In Swift, when you define classes, structures, methods, and variables, they have internal access by default. This means you can only access these methods within that module.

**4. fileprivate**  
==Note: Declarations are accessible only within the current swift file.==  
In Swift, you can use the ‘**fileprivate**’ keyword to restrict the visibility of a declaration to the current Swift file.

5**. private** 
==Note: Accessible within the same declaration or extension.==  
The most restrictive access level. Private entities can only be accessed from within the same enclosing declaration or extension. Useful for encapsulating implementation details within a class or structure.

**6. private(set)** 
Note: It has the same accessibility as the “**private**” but I ==can see(get) value== when defining the variable as the “**private(set)**”.

**7. final**  
==Note: Prevent inheritance==  
When we define our classes with the “**final**” keyword we prevent inheritance what that means? For example, I have the “**Parent**” class which is defined as “**final**” and also I have the “**Child**” class which want to inherit from the “**Parent**” class but cannot because the “**Parent**” is “**final**”.

---
## More on `private` vs `private(set)`
### `private`:

- **Usage:**
  - Applied to members (properties, methods, etc.) of a type.
  - Limits the visibility of the member to the scope it is defined in (e.g., a class, struct, or extension).

- **Example:**
```swift
class Example {
  private var secretValue = "Hidden"

  func revealSecret() {
	  print(secretValue)  // Accessible within the scope of the class
  }
}
```

  In this example, `secretValue` can only be accessed within the `Example` class.

### `private(set)`:

> [! Summary]
> When you use private(set) on a property like publiclyAccessibleValue, it means that the property can be read from anywhere, but its writing (setting) is restricted to the scope of its own type (in this case, the Example class or struct) and its extensions.

- **Usage:**
  - Applied specifically to the setter (writing) part of a property.
  - Allows the property to be set only within the scope of its own type or its extensions but not from outside.

- **Example:**
  ```swift
class Example {
  private(set) var publiclyAccessibleValue = "Public"

  func changeValue() {
	  publiclyAccessibleValue = "Modified"  // Accessible within the scope of the class
  }
}
  ```

  In this example, `publiclyAccessibleValue` can be read and modified within the `Example` class, but its setter is restricted from outside the class.

### Difference:

The key difference lies in how the access levels affect the property's getter (reading) and setter (writing):

- **`private`:**
  - Restricts both reading and writing to within the type it is defined in.

- **`private(set)`:**
  - Allows reading anywhere, but restricts writing to within the type it is defined in.

### When to Use Each:

- Use `private` when you want to completely hide the property from the outside world, preventing both reading and writing.

- Use `private(set)` when you want to expose the property for reading but restrict writing to the internal scope of the type.

### Example:

```swift
struct Example {
    private(set) var readableValue = "Readable"

    mutating func modifyValue() {
        readableValue = "Modified"  // Allowed within the type
    }
}

var instance = Example()
print(instance.readableValue)  // Allowed to read
instance.modifyValue()  // Allowed to modify within the type
print(instance.readableValue)  // Allowed to read after modification
```

In this example, `readableValue` can be read from outside the type, but modification is restricted to within the type. This can be useful when you want to provide read access to certain properties but control modification.