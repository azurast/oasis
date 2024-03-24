#dependencyinjection
# Dependency Injection
**Inversion of Control**
Is a pattern of providing any type of object (that implements or controls something) instead of directly doing so. It is an act of **inverting and or redirecting the control to an external agent.**

**Dependency Injection**
Is a specific usage of inversion control. Implementations are somehow passed on to the object, then this object starts to depend on it to be able to execute its behavior correctly.

**Example**
Instead of calling a specific library directly, an app calls a contract or interface that refers to the concrete implementation. Which is controlled by the application instead of the library.
![[Screen Shot 2022-10-11 at 20.14.53.png]]

**Pros**
1. Low coupling
2. Testability
3. Reusability
4. Legibility
5. Separation of Concerns

**Cons**
1. Complexity
2. Highly coupled to the DI framework

# Basic Dependency Injection

^5988d1
## Initializer Based

^c0aea9

The dependencies are **passed over to the object by its initializer**
![[Screen Shot 2022-10-11 at 20.17.39.png]]
Instead of relying on the singleton, we now utilize the `NetworkProtocol`, this is already a form of dependency injection. We can then test like the following:
![[Screen Shot 2022-10-11 at 20.24.03.png]] ^4f5ac6
## Property Based
The dependency is injected **from a property that can be modified externally.** This is a good option when you **have no control over the object's initialization** such as when you have ViewControllers from storyboards.
![[Screen Shot 2022-10-11 at 20.27.37.png]]
Example of testing
![[Screen Shot 2022-10-11 at 20.31.40.png]]
## Parameter Based
The dependency is injected from a **parameter of a function**. It's a good option for testing legacy methods without breaking changes.
![[Screen Shot 2022-10-11 at 20.34.36.png]]
Instead of passing the dependency to the initializer like an initializer-based DI, we pass it as a parameter of a function.
![[Screen Shot 2022-10-11 at 20.36.36.png]]
# Advanced Dependency Injection
## Singletons
Singletons are not always bad, **it really depends on HOW, WHEN, and WHY** are you using them. Just don't make them 'God' classes with huge responsibilities. Make them as single-purpose as you possible by just taking care of a single aspect of the app.
![[Screen Shot 2022-10-11 at 20.45.47.png]]
- Extract its protocol & interface
- Conform to it
- Apply one of the [[#^5988d1|basic techniques]] from before
![[Screen Shot 2022-10-11 at 20.48.24.png]]
It's not gonna solve all of your problems, but it is enough to some extent for a simple application. However, it will become a problem when there is modularization involved & can introduce unwanted coupling.
Further reading: https://www.pointfree.co/blog/posts/21-how-to-control-the-world

Another way you might create a DI for a singleton is through the Singleton+ (read: singleton extended) pattern. You do not need to create private initializers like before. It's gonna allow us to have more control over the **shared state** while still keeping the **shared instance** as an option. This implementation uses **open access** modifier to make it possible to be inherited by other classes so we can control some functions or properties.
![[Screen Shot 2022-10-11 at 20.58.23.png]]
Now, how will we test this?
![[Screen Shot 2022-10-11 at 21.00.53.png]]
## Factories
This design pattern focuses on solving the issue of **creating objects without making their concrete types explicit.**
The objective here is to encapsulate (hide) implementation details about **how** the object is created.
The advantage is that the consumer does not need to know the internal logic of how the object is created since we provide **a common interface**.

For example, we have the following view controller, and when we want to create tests, it would be really hard since the VC requires some dependencies.
![[Screen Shot 2022-10-11 at 21.10.30.png]]
So what we can do is create a factory, essentially we are saying "hey factory please give me this VC, I don't care how you do it but I just want this VC"
![[Screen Shot 2022-10-11 at 21.13.48 1.png]]
Now, we can use our factory inside the view controller.
![[Screen Shot 2022-10-11 at 21.22.01.png]]
## Service Locator
It is basically a big singleton of instances.
It is a pattern that provides access to services/dependency instances.
![[Screen Shot 2022-10-11 at 21.32.02.png]]
**Resolver** will tell you how to resolve something & **Container** will hold the dependency.![[Screen Shot 2022-10-11 at 21.32.33.png]]
When we want to register something, we simply get the key & save it to the dictionary. The first function is for the regular instances and the second function is for the lazy instances.
![[Screen Shot 2022-10-11 at 21.35.25.png]]
When you register a lazy instance, you register effect reference(?), it's a closure & connect a specific key to the factory.
https://www.youtube.com/watch?v=M0c6DGNOUYc
## Property Wrappers
