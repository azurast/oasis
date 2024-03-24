# Reducers and Stores
#swiftui #tca #reducers #stores
## Reducers
As mentioned previously, the definition of reducer: ![[2. Areas/💻 Computer Science/🍎 iOS Development/The Composable Architecture/00_Introduction#^455532]]In simple terms, reducers apply any kind of business logic, be it done locally by the phone or externally by executing API calls. They only do this if they receive some sort of [[2. Areas/💻 Computer Science/🍎 iOS Development/The Composable Architecture/00_Introduction#^730e65|Action]] and update the view accordingly. Let's see how it applies in action.
### Better Way to Model Global State 
Yes, previously we did enhance our global state a little bit by [[01_State Management in SwiftUI#Breaking Down AppState|breaking down the app state]]. 
And our global AppState still looks like this:
![[01_State Management in SwiftUI#^07fdb0]]
However, there are still some cons:
 - Highly coupled with the Combine framework, which introduces a dependency that we might not care about when interacting with a model layer outside of the SwiftUI view.
 - Wrapping every property with `@Published`
 - `@ObservableObject` still requires us to use a class (reference type) instead of value types. 
> [!Value Types]
> Value types are great containers for state, they give us fine-grained control and guarantees over mutability.

What we can do to solve this is to **convert `AppState` into a struct,** then create an `@ObservableObject`wrapper around it.

```swift
struct AppState {

    var count = 0
    var favoritePrimes: [Int] = []
    var loggedInUser: User?
    var activityFeed: [Activity] = []
    
    struct Activity {
        let timestamp: Date
        let type: ActivityType
        
        enum ActivityType {
            case addedFavoritePrime(Int)
            case removedFavoritePrime(Int)
        }
    }
    struct User {
        let id: Int
        let name: String
        let bio: String

    }
}
```

^a69b8b

This wrapper is what we call a **Store**. And it can look something like this:

```swift
final class Store: ObservableObject { 
	 @Published var value: AppState 
	 
	 init(initialValue: AppState) { 
		 self.value = initialValue 
	 } 
 }
```

However, this Store is way too specific for AppState when it doesn't need to really know anything about AppState. It **just needs a value type to wrap itself around it and provide a hook into its observer.**  With this information, we can make value Generic!

```swift
final class Store<Value>: ObservableObject { 
	@Published var value: Value
	 
	init(initialValue: Value) { 
		self.value = value 
	} 
}
```

Now, we can use it on our AppState like this `Store<AppState>`. We will get an observable object that notifies that something changed as soon as any mutation is made to `AppState`. We have effectively consolidated all of our individual bits of the state into one value.
### Functional State Management
One of our previous concern: ![[01_State Management in SwiftUI#^e26f60]]
Our 'user actions' are ill-defined. They are just those 'actions' closures in SwiftUI View. We want to be able to define a **single & consistent way to perform mutation.**
What we can do is **introduce a proper data type to operate on**. Thus, we can **refrain from mutating directly the view**.
> [! State Mutation]
> A state mutation is the act of **taking your current state, and an event that occurred** (such as a user tapping a button), and using both of those pieces of information **to derive an all-new state.**

There are many actions that the user can perform, so it's appropriate to define these actions as enum.
For example, the `CounterView`, we can make `CounterAction` enum.
```swift
enum CounterAction { 
	case decrTapped 
	case incrTapped 
}
```

With this, we can create a **reducer** function that will mutate a state based off its action & returns the new state.
```swift
func counterReducer(state: AppState, action: CounterAction) -> AppState { 
	var copy = state 
	switch action { 
	case .decrTapped: 
		copy.count -= 1 
	case .incrTapped: 
		copy.count += 1 
	} 
	return copy 
}
```

^a30e84

> [!Info]
> Why name it `reducer`? It actually comes from the reduce function on arrays. 
> Rather than directly mutating the state inside a button’s action closure, we send the corresponding action value to the reducer, and let the reducer do all the necessary mutations. 
> This is what it means to be declarative with user actions: **we are describing what the user does** rather than performing all of the messy, step-by-step mutations that are the result of that user action.
### Reducer in Store & inout Reducer
Our previous store only wraps the state, and our reducer is still quite boilerplate-y, can we make it simpler? The answer is yes. We can **tell the store that a user is invoking an action & let the store takes care of running the reducer, our view does not need to come into contact with the reducer directly.** If we think about it, an action that triggers the reducer mutates some state, so it makes sense for the store to take care of the reducer as well.

```swift
final class Store<Value, Action>: ObservableObject {

    let reducer: (inout Value, Action) -> Void
    @Published var value: Value

    init(initialValue: Value, reducer: @escaping (inout Value, Action) -> Void) {
        self.value = initialValue
        self.reducer = reducer
    }

    // Inside this method, we want to invoke the reducer with our current state & replace it with the new one it produced

    func send(_ action: Action) {
        self.reducer(&self.value, action)
    }

}
```

Now, whenever we need the reducer to perform something, we can access it through the store by invoking the **send** method.
For example, when we want to decrement the number when we tap the minus button:

```swift
Button("-") { self.store.send(.decrTapped) }
```

#inout

> [!SWIFTY]
> Creating a copy `var copy = state` is actually prone to bugs
>  What we can do is use Swift's `inout` feature. 
>  In a nutshell, **there is an equivalence** between functions of the form:
>  `(A) -> A` and `(inout A) -> Void`
>  which means, that any mutations that we do to `inout A` is a hidden output of the function.
>  What happens when we have multiple inputs like `(A, B) -> (A, C)`? Well, it's equivalent to `(inout A, B) -> C`
>  In general, **if a type parameter appears exactly once on both sides of the function arrow, you can remove it from the right side at the cost of introducing an inout argument on the left side.**
>

### Moving Mutations into the Store
Previously, in [[#Functional State Management|this section]] our reducer is exclusive to `CounterReducer`, but why make multiple states for each view?
We can group our actions them based on the views in which they reside, which will then be combined in the `AppAction`, which is essentially an enum of enums.
```swift
enum CounterAction {
  case decrTapped
  case incrTapped
}

enum PrimeModalAction {
  case saveFavoritePrimeTapped
  case removeFavoritePrimeTapped

}

enum FavoritePrimesAction {
    case deleteFavoritePrimes(IndexSet)
}

enum AppAction {
  case counter(CounterAction)
  case primeModal(PrimeModalAction)
  case favoritePimes(FavoritePrimesAction)
}
```

```swift
func appReducer(state: inout AppState, action: AppAction) {
    switch action {
    case .counter(.decrTapped):
        state.count -= 1
    case .counter(.incrTapped):
        state.count += 1
    case .primeModal(.saveFavoritePrimeTapped):
        state.favoritePrimes.append(state.count)
        state.activityFeed.append(.init(timestamp: Date(), type: .addedFavoritePrime(state.count)))
    case .primeModal(.removeFavoritePrimeTapped):
        state.favoritePrimes.removeAll(where: { $0 == state.count })
        state.activityFeed.append(.init(timestamp: Date(), type: .removedFavoritePrime(state.count)))
    case let .favoritePimes(.deleteFavoritePrimes(indexSet)):
        for index in indexSet {
            let prime = state.favoritePrimes[index]
            state.favoritePrimes.remove(at: index)
            state.activityFeed.append(.init(timestamp: Date(), type: .removedFavoritePrime(prime)))
        }
    }
}
```

^c56571

With this, our previous way of calling the reducer stays fairly the same, we just need to add one more app action case (`counter`)
```swift
Button(
   action: { self.store.send(.counter(.decrTapped)) }) { 
	  Text("-") 
	}
```

## State Pullbacks
When we take a look at the [[#^c56571|appReducer]] it's pretty hefty with 5 cases of switch case statements. What happens when the user can do more things? It's gonna be this one giant reducer, and that doesn't sound pretty scalable. If we had two dozen screens are we really going to want a single switch statement that switches over _every single action_ of 24 different screens? That’s not going to work.
**How can we deconstruct this reducer into smaller ones?**
With SwiftUI's way of expressing a view as a function, everything, the fundamental unit of our architecture is a function & we can compose them! **After all, functions are infinitely composable**. And, the signature of a reducer function has a bunch of different types of composition. This is what will allow us to break the reducer down.
### Combining Reducers
> [! Question]
> What can you do if you have two reducers that operate on the same type of state and with the same type of actions? Is there a way to somehow **combine them into a single reducer that does both reducers’ work at once**?

```swift
func combine<Value, Action>(
    _ first: @escaping (inout Value, Action) -> Void,
    _ second: @escaping (inout Value, Action) -> Void
) -> (inout Value, Action) -> Void {

    return { value, action in
        first(&value, action)
        second(&value, action)
    }
}
```

^67f4cc

Then we break up our big reducers into smaller ones based on their views. Notice that each smaller reduce only cares for the actions that are associated with their views, and this is where we introduce the default statement & exit anything that might end up there & ignore it.
```swift 
func counterReducer(state: inout Int, action: AppAction) -> Void {
    switch action {
    case .counter(.decrTapped):
        state -= 1
    case .counter(.incrTapped):
        state += 1
    default: // Ignores other app actions outside of the counter reducer scope
        break
    }
}
```

^c43c10

```swift  
func primeModalReducer(state: inout AppState, action: AppAction) -> Void {
    switch action {
    case .primeModal(.saveFavoritePrimeTapped):
        state.activityFeed.append(.init(timestamp: Date(), type: .addedFavoritePrime(state.count)))
    case .primeModal(.removeFavoritePrimeTapped):
        state.activityFeed.append(.init(timestamp: Date(), type: .removedFavoritePrime(state.count)))
    default: // Ignores other app actions outside of counter scope
        break
    }
}
```

```swift
func favoritePrimesReducer(state: inout AppState, action: AppAction) -> Void {
    switch action {
    case let .favoritePimes(.deleteFavoritePrimes(indexSet)):
        for index in indexSet {
            let prime = state.favoritePrimes[index]
            state.favoritePrimes.remove(at: index)
            state.activityFeed.append(.init(timestamp: Date(), type: .removedFavoritePrime(prime)))
        }
    default: // Ignores other app actions outside of counter scope
        break
    }
}
```    

^5102b9

After that, we can stitch everything back together using the [[#^67f4cc|combine]] function above into one single master reducer that we can use within the app.
```swift
let appReducer = combine(combine(counterReducer, primeModalReducer), favoritePrimesReducer)
```

But, what happens if we have dozens of different pages, the chaining would be too long right? We can enhance the combine function to accept an array of reducers instead:
```swift
func combine<Value, Action>(
    _ reducers: (inout Value, Action) -> Void...
) -> (inout Value, Action) -> Void {
    return { value, action in
        for reducer in reducers {
            reducer(&value, action)
        }
    }
}
```

> [!Swifty]
> 1. Notice the three dots at the `reducers` parameter.
> The **three dots mean that it is a variadic function** and can take a list of `Upstream`. 
> A variadic parameter **accepts zero or more values of a specified type**. You use a variadic parameter to specify that the parameter can be passed a varying number of input values when the function is called. Write variadic parameters by inserting three-period characters (...) after the parameter’s type name. The values passed to a variadic parameter are made available within the function’s body as an array of the appropriate type.
> 2. Notice that we no longer need `@escaping`
> This is because `@escaping` only works for parameters that are of function type, while the variadic function is an array. That is why it cannot work.

Now, we can combine all of the reducers like this, so it's easier when adding many reducers.
```swift
let appReducer = combine(counterReducer, primeModalReducer, favoritePrimesReducer)
```
### Focusing a Reducer's State
Even though we have managed to compose the reducer into smaller pieces, there are still possible problems that may arise. Consider this reducer:
![[02_Reducers and Stores#^c43c10]]
Its aims are so simple: increment and decrement, but why does it need to know the whole `AppState` as input? Instead, we can do something like the following:
```swift
func counterReducer(value: inout Int, action: AppAction) -> Void {
    switch action {
    case .decrTapped:
        value -= 1
    case .incrTapped:
        value += 1
    default:
        break
    }
}
```

^7a080a

This reducer is now only operating on a smaller set of states. A new person can come & easily understand that this code only deals with simple integers.

But this change has made an error in our app:
`Cannot convert value of type '(inout AppState, AppAction) -> Void' to expected argument type '(inout Int, CounterAction) -> Void'`
Our combine function doesn't recognize an int as its reducer parameter. How can we solve this? 
> [! Pullbacks]
> Essentially, pullbacks are operations where we want to transform type `(A) -> (B)` to `(B) -> (A)`.
> In our case, we can convert predicates on small, specific data into predicates on large, general data. We want to **take a reducer on a small piece of substate and transform it into a reducer that works on a global state**, of which the substate embeds inside it.
### Pulling Back Reducers Along State
At the core, we want a function that can **transform** the reducer on a local state & the one on a global state. Our pullback structure might look something like this:
```swift
func pullback<LocalValue, GlobalValue, Action>( 
   _ reducer: @escaping (inout LocalValue, Action) -> Void 
) -> (inout GlobalValue, Action) -> Void { 

}
```
We receive the local reducer & want to return a global reducer.
But we need something that can connect the local & global values.
This simple generic can be related through a simple arbitrary function. But that function must meet the following condition :
Provided a way to **get** from the global value to the local value
This way, we can transform a reducer on the local value into the one on global value.
```swift
func pullback<LocalValue, GlobalValue, Action>(
  _ reducer: @escaping (inout LocalValue, Action) -> Void,
  _ f: @escaping (GlobalValue) -> LocalValue
) -> (inout GlobalValue, Action) -> Void {

  return  { globalValue, action in
    var localValue = f(globalValue)
    reducer(&localValue, action)
  }
}
```
While this compiles, it is not done yet, we have created a local mutable copy of the `LocalValue` & we have mutated it through the reducer, but we have yet to update the global value. 
What we are missing here, is the ability to **set** the newly mutated local value into the global value. 
```swift
func pullback<LocalValue, GlobalValue, Action>(
  _ reducer: @escaping (inout LocalValue, Action) -> Void,
  get: @escaping (GlobalValue) -> LocalValue,
  set: @escaping (inout GlobalValue, LocalValue) -> Void
) -> (inout GlobalValue, Action) -> Void {

  return  { globalValue, action in
    var localValue = get(globalValue)
    reducer(&localValue, action)
    set(&globalValue, localValue)
  }
}
```
Now, when we call our pullback, we can specify our get & set functions.
```swift 
pullback(counterReducer, get: { $0.count }, set: { $0.count = $1 }),...
```
In our case, we want to mutate the count state right? our `GlobalValue` is `AppState`, and our `LocalValue` is `Int`.  ``$0.count` is essentially `AppState().count` and `$1` is the integer.
### Key Path Pullbacks
Swift has a nicer way to do this get-set thing using [WritableKeyPath](https://www.swiftbysundell.com/articles/the-power-of-key-paths-in-swift/)

#keypath

>[!Swifty]
> **WritableKeyPath**
> It is a way to bundle a pair of getters & setters
> What differs it from regular `KeyPath` is the read-write acceess to mutable property.

```swift
func pullback<LocalValue, GlobalValue, Action>(
  _ reducer: @escaping (inout LocalValue, Action) -> Void,
  value: WritableKeyPath<GlobalValue, LocalValue>
) -> (inout GlobalValue, Action) -> Void {
  return { globalValue, action in
    reducer(&globalValue[keyPath: value], action)
  }
}
```

^adbea2

We no longer need to define the `get` & `set`, instead, we receive a keypath `value` that goes from the `GlobalValue` into the `LocalValue`. And we can reduce the mutable copy of going into global value with that value keypath.
And now, the way we call our pullback function becomes even cleaner:
```swift
pullback(counterReducer, value: \.count),...
```
Here we pullback with the value that plugs out the count from the `AppState`

### Pulling Back More Reducers
Our other reducer, [[#^5102b9|favoritePrimesReducer]] also doesn't need to know the whole [[#^a69b8b|AppState]] when it only needs access to `favoritePrimes` and `activityFeed`. 
Our first step is to create an intermediary struct model that can hold only the data we care about.
```swift
struct FavoritePrimesState {
  var favoritePrimes: [Int]
  var activityFeed: [AppState.Activity]
}
```

Then we update the state parameter of our reducer into :
```swift
func favoritePrimesReducer(state: inout FavoritePrimesState, action: AppAction) -> Void {
  switch action {
  case let .favoritePrimes(.removeFavoritePrimes(indexSet)):
    for index in indexSet {
      state.activityFeed.append(.init(timestamp: Date(), type: .removedFavoritePrime(state.favoritePrimes[index])))
      state.favoritePrimes.remove(at: index)
    }
  default:
    break
  }
}
```
One benefit from this is that if someone reads this reducer function, they understand that it only has the capability of mutating a small set of states in the app. They don't need to worry that this reducer might do something else.
But, our combine function now doesn't work since we changed the type. We need to also apply pullback into this reducer. 
However, `FavoritePrimesState` is comprised of more than one field, whereas our `counterReducer` only requires the `count` field, making it easily accessible using the key path. Luckily, Swift can create multiple key paths for computed properties, but we have to introduce them manually. 
```swift
extension AppState {
  var favoritePrimesState: FavoritePrimesState {
    get {
      return FavoritePrimesState(
        favoritePrimes: self.favoritePrimes,
        activityFeed: self.activityFeed
      )
    }
    set {
      self.activityFeed = newValue.activityFeed
      self.favoritePrimes = newValue.favoritePrimes
    }
  }
}
```
By defining the custom get-set computed property, Swift automatically generates a keypath for our "substate", `.\favoritePrimesState`. which we can now plug on our pullback.
```swift
let appReducer = combine( 
	 pullback(counterReducer, value: \.count), 
	 primeModalReducer, 
	 pullback(favoritePrimesReducer, value: \.favoritePrimesState) 
 )
```

## Action Pullbacks
### Focusing on a Reducer's Actions
If we take a look at [[#^7a080a|our counter reducer]] here, its sole purpose is actually just to decrement & increment an integer, however, it still takes the whole app action parameter, which is unnecessary. We should know that something’s wrong because we have a `default` case in our `switch` statement. This means **if we add a new action to our `CounterAction` enum we will not get a compiler error** and will silently ignore that action in our reducer. What we really want is just to pluck out the `CounterAction` as the action type parameter. It would look like this:
```swift
func counterReducer(state: inout Int, action: CounterAction) -> Void {
    switch action {
    case .decrTapped:
        state -= 1
    case .incrTapped:
        state += 1
    default:
        break
    }
}```
This is powerful because this means:
1. This reducer & enum could be extracted & fully isolated and understood on their own.
2. This reducer can't possibly touch other parts of the app.
But this is gonna break our [[#^adbea2|pullback]] like before, since 
### Enums and Key Paths
### Enum Properties
### Pulling Back Reducers along Actions
### Pulling Back More Reducers
## Higher-Order Reducers 
