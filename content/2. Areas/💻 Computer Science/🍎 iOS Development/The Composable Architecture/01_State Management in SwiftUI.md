# State Management in SwiftUI
#swiftui #declarative #tca

Typically when we're just getting started with SwiftUI we'd immediately see MVVM as the most common design pattern introduced. Though it works, we can quickly run into problems as our codebase grows & scales. When we're building something, we want to be sure that our code base can scale as well as the size of our app. This is where architecture and really defining what we want and what the problems come into play.
The most common problem we often encounter with MVVM (even though it's not the official pattern that Apple suggests to use) and like its predecessors, MVC, is tightly coupled business logic with views, which makes it hard to scale, really. It's hard to reuse things, and even harder to test. This doesn't really make sense when you think about SwifUI's main purpose, it's declarative-ness.
Let's take a look at some of the advantages of SwiftUI:
## Advantages of SwiftUI
- Declarative, views as functions
- State management
- Each component serves its own purpose
- Provides a lot more opinions on how one should structure their application

> [!INFO]
> In a nutshell, declarative programming consists of **instructing a program on what needs to be done, instead of telling it how to do it.** This approach involves providing a domain-specific language (DSL) for expressing what the user wants. This DSL shields users from messy low-level constructs while still achieving the desired end-state.
## Questions for SwiftUI
 - How to manage and mutate state
 - How to execute side effects
 - How to decompose large applications into small ones, and
 - How to test our application.

> [!Question]
> How can you add features in a **knowable, understandable, and testable** way.?
## What is a State?
- In simple terms, _State_ represents the data associated with a view.
- Changing the state causes render and build functions to fire respectively.
## State Management in The Composable Architecture
In TCA, State is divided into two, global and local states.
### Global State
- Is a `class` since only `class` value type can conform to `ObservableObject`
- This is because we want it to be persisted across different views, and structs will make copies while class we can refer it to only 1 object of that class (reference type).
```swift
class AppState: ObservableObject {

    @Published var count: Int = 0
    @Published var favoritePrimes: [Int] = []
    @Published var loggedInUser: User?
    @Published var activityFeed: [Activity] = []

    struct Activity {
        let timestamp: Date
        let type: ActivityType
        enum ActivityType {
            case addedFavoritePrime(Int)
            case removedFavoritePrime(Int)
        }
    }
}
```

^07fdb0

Take a look at the example `AppState` above. It stores properties that can be persisted globally. 
>[!Warning]
>**Concern 1:  Cumbersome persistent state API** 
>What happens when we have more and more states that we need to track? AppState will be very populated, and it will be very hard to maintain & be scalable. 
>So, **how can we maintain the states in a better, trackable way?**

### Using Global State within a View
1. Don't give default, it's not true that whenever we open that view screen, the value will always be the default since it has been persisted into a global state.
2. Must conform to `ObservableObject` protocol, which is what will allow us to control how many mutations happen to our persistent state & how to notify the rest of the system.

```swift
@ObservedObject var state: AppState

var body: some View {
	Text("What is the \(ordinal(self.state.count)) prime?")
}
```

### Local State
A property wrapper is a mechanism that allows you to wrap a type in another type that provides some functionality, while still exposing the underlying wrapped value to us directly. What `@State` does:
1. Gives the count variable to be used in views (update UI based on its value)
2. Serves as a parameter
3. Behind the scenes it wraps count in a binding self.$count. It allows us to mutate the value in a simple way.
`@State` is specifically for a local, non-persisted state that only this view would care about and want to control. In this case, we are allowed to set the default values of `@State` since only that view cares.

```swift
@State var isPrimeModalShown: Bool = false
@State var isNthPrimeButtonDisabled = false
```

### Optional Binding as @State 
The example above uses standard `Boolean` values to hold a state of something. But, `@State` does not always need to be a boolean. It can be anything. For example, sometimes you want to show a popup, alert, toast, snackbar, or anything **only once**. This can be tricky when the triggering function to show those components, could be more than one, and when you use Boolean, it's harder to track the changes, sometimes resulting in multiple of the component views being shown or none at all. Here comes a handy way around it

```swift
@State var alertNthPrime: PrimeAlert?
```

 Here, we provide a Binding of an optional such that **when a value is present the alert is shown and when it is nil the alert is dismissed**. If we only set this value to `Int?` then an error will be shown `Instance method 'alert(item: content:)' requires that 'Int' conform to 'Identifiable` therefore we will make a custom struct that conforms to the Identifiable protocol.
 
```swift
struct PrimeAlert: Identifiable {
	let prime: Int
	var id: Int { self.prime }
}
```

We set `PrimeAlert` to be identifiable so that we know that **this alert only has 1 identity regardless of the state**. Values of types adopting the Identifiable protocol **provide a stable identifier** for the entities they represent. Identifiable **distinguishes the identity of an entity from its state**. Identifiers are and should be:
 - Stable across launches
 - State-independent
 - Unique
 - Meaningful

### Breaking Down AppState
> [!WARNING]
> **Concern 4: State management isn't composable**
> How might we break down the global AppState into smaller ones? 
> How can we make this view only see the data that they only care about?

Previously we passed the whole AppState to a view, but as our app grows bigger, we will have more and more views, and imagine if a view actually only needs one or two states, but we send it everything from AppState. It won't be too good right? 
The closest way is to define our own struct for a specific view, that consists of the variables we care for a view.

```swift
struct FavoritePrimesState {
    var favoritePrimes: [Int]
    var activityFeed: [AppState.Activity]
}

struct FavoritePrimesView: View {
	@Binding var state: FavoritePrimesState
}

// and at the root view where FavoritePrimesView is called
NavigationLink(
   destination: FavoritePrimesView(state: self.$state.favoritePrimesState)) {
	   Text("Favorite Primes")
   }
```

`FavoritePrimesState` is now a binding of `AppState`, the variable referenced in both structs are still the same. We just manage to only disclose only relevant information to the view.

### Other Concerns

> [!WARNING]
> **Concern 2: Scattered state mutation**
> Even though mutating a state within a view like so is easy, it's going to be very scattered. Some mutations are happening in global & local states, and also binding. 
> One of the worst things is when a newcomer comes, they would have no obvious place to begin looking for how the state is mutated in the app. It's almost as if it's hidden.
> Also, the more mutations are added, the less declarative it becomes. Mutations are closures.
> So, we beg the question, **how should we organize our mutations?**

^e26f60

>[!WARNING]
>**Concern 3: No story for side effects**
>Right now, this effect is kinda just being fired into the void. There are
>- No way to cancel
>- No way to [[01_State Management in SwiftUI#^cbe582|debounce]]
>- No way to test
>The effect is simply not controlled. What we want is a data type representation of the effect so that we can manipulate it just like any type of value.

The solutions and discussions of these concerns will be answered in chapter [[02_Reducers and Stores]]
> [!Info]
> Debouncing is **a programming practice used to ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web/app page**.

^cbe582
