In SwiftUI, `@EnvironmentObject` and `@Environment` are property wrappers that enable access to shared data and environmental values within a SwiftUI view hierarchy.

### `@EnvironmentObject`:

- **Purpose:**
  - Used for injecting and accessing observable objects shared across multiple SwiftUI views.

- **Usage:**
  - It allows a view to subscribe to changes in an observable object that has been injected into the SwiftUI environment.

- **Example:**
  ```swift
  class UserData: ObservableObject {
      @Published var username = "Guest"
  }

  struct ContentView: View {
      @EnvironmentObject var userData: UserData

      var body: some View {
          Text("Hello, \(userData.username)!")
      }
  }

  // Inject the UserData object at a higher level in the view hierarchy
  ContentView().environmentObject(UserData())
  ```

### `@Environment`:

- **Purpose:**
  - Used for accessing values stored in the environment, such as color scheme, locale, or accessibility settings.

- **Usage:**
  - It provides a way to retrieve predefined values without explicitly passing them as parameters.

- **Example:**
  ```swift
  struct ContentView: View {
      @Environment(\.colorScheme) var colorScheme

      var body: some View {
          if colorScheme == .dark {
              return Text("Dark Mode")
          } else {
              return Text("Light Mode")
          }
      }
  }
  ```

In summary:

- `@EnvironmentObject` is used for sharing observable objects across multiple views.
- `@Environment` is used for accessing values stored in the environment, such as system settings or user preferences.

These property wrappers contribute to SwiftUI's declarative and reactive paradigm, allowing views to be updated automatically when the underlying data or environment changes.