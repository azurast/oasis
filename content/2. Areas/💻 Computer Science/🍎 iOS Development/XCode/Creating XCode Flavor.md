# What is Flavor in XCode?
Xcode itself does not have flavors in the same way as Android Studio, which uses flavors to create different variants of an app with different features or configurations. However, Xcode projects can have multiple build configurations, such as Debug and Release, which can be used to define different settings and behaviors for different stages of development.
Additionally, Xcode supports the concept of schemes, which allow developers to define different sets of build settings, targets, and executable actions. Schemes can be used to create variations of an application, such as different app icons or bundle identifiers, for different purposes like development, testing, or production.
# Steps
1. Make sure your project name has no symbol to avoid mishaps
2. pbxproj and xcworkspace will also be renamed
3. Create new configurations for the flavors that you want. These configurations values must be defined for each targets in the project. 
4. Adjust appgroups
5. Create schemes 
6. ? unit test cannot be run on other schemas except for the real one?
7. Setup identity & appgroup for each target
8. Icon
9. Product Name
10. Bundle Identifier
11. Setup build phases for google sign in service for firebase crashlytics connection
	1. DSYM
	2. Ngambil pods berdasarkan bundle id

### Schemes 

| Scheme    | Configuration | Appstore  | Purpose                    |
| --------- | ------------- | --------- | -------------------------- |
| dev       | DEBUG         | Kompas.id |                            |
| prod      | RELEASE       | Kompas.id | CI/CD Release to Appstore  |
| devKID    | DEBUG         | KID DEV   | Development di Real Device |
| prodKID   | RELEASE       | KID DEV   | Development di Simulator   |
| devQAKID  | DEBUG         | QA KID    | CI/CD Testflight           |
| prodQAKID | RELEASE       | QA KID    | CI/CD                      | 
## XCode Configuration
In Xcode, a configuration refers to a set of build settings that define how your project is built and packaged. It specifies various options and parameters that control the behavior of the build process, such as compiler flags, optimization settings, code signing identities, and build targets.
Xcode provides two default configurations for every project: Debug and Release. The Debug configuration is typically used during development for testing and debugging purposes. It usually includes additional debugging symbols and disables certain optimizations to make it easier to track down issues. The Release configuration, on the other hand, is optimized for performance and is used when building the final version of the application for distribution.
You can also create custom configurations in Xcode to define additional build settings tailored to your specific needs. For example, you might create a configuration named "Staging" or "Production" to define different API endpoints or other environment-specific variables.
Each configuration can have different settings for various aspects of the build process, including compiler flags, preprocessor macros, optimization levels, code signing settings, and build-time options. By configuring these settings appropriately for each configuration, you can control how your application is built and packaged for different purposes or environments.
To access and modify the configurations in Xcode, you can navigate to your project settings, select your target, and then go to the "Info" tab. Under the "Configurations" section, you can add, remove, or modify configurations and adjust their associated build settings.
By utilizing different configurations in Xcode, you can easily manage and customize the build process for your project based on different requirements, such as debugging, testing, staging, or production deployments.
## App Groups
In Xcode, an App Group is a feature that allows multiple applications (or app extensions) to share a common container directory for sharing data and resources. It enables communication and data sharing between different apps or app extensions belonging to the same App Group.
App Groups are commonly used in scenarios where you have multiple apps or app extensions that need to share data or access shared resources. For example, you might have a main app and its accompanying Today extension or a main app and its associated Watch app. In such cases, you can create an App Group to establish a shared container that allows these apps or extensions to exchange information.
By enabling App Groups and specifying the same App Group identifier in the entitlements of the participating apps or app extensions, you create a shared sandbox environment where they can read from and write to a shared container directory. This directory can be used to share data files, preferences, Core Data databases, and other resources.

To create an App Group in Xcode, you need to follow these steps:
1. Open your Xcode project.
2. Select the target for which you want to enable App Groups (e.g., your main app or app extension).
3. Go to the "Signing & Capabilities" tab in the target's settings.
4. Click the "+" button to add a new capability.
5. Search for "App Groups" and click on it.
6. Click the "Add" button to create a new App Group or select an existing one from the list.
7. Xcode will automatically enable the necessary entitlements and configure your project to use the App Group.

Once you have set up the App Group, you can access the shared container directory using the `FileManager` API in your code. You can read and write files, create directories, and share data between different apps or app extensions that are part of the same App Group.
App Groups provide a convenient mechanism for sharing data and resources between multiple apps or app extensions, enabling better collaboration and integration within your app ecosystem.
## Schemes
In Xcode, a scheme (also known as a "scheme" or "Xcode scheme") is a configuration that defines how your project should be built, run, tested, profiled, or archived. It is a set of settings and options that determine various aspects of the development workflow.

Schemes are used to manage and control different tasks and behaviors related to your project, such as:

1. Building: You can specify which targets to build, build configurations (e.g., Debug or Release), and build settings for each scheme.
    
2. Running and Testing: You can define the executable to run, the environment variables, launch arguments, and test-specific configurations for running and testing your project.
    
3. Profiling and Analyzing: Schemes allow you to set up profiling and performance analysis options for profiling your application, such as Instruments configurations.
    
4. Archiving and Distribution: You can configure archive options for creating app archives, including code signing, entitlements, and export options for distribution.
    

Schemes are project-specific and can be shared among team members using version control systems like Git. Each scheme contains information about the target(s) it applies to and the specific actions and settings associated with those targets.

In Xcode, you can manage and customize schemes in the scheme editor, which provides a graphical interface for configuring various aspects of the scheme. To access the scheme editor, go to the top toolbar in Xcode, click on the scheme selection dropdown, and select "Edit Scheme."

Within the scheme editor, you can modify the settings for each scheme and customize its behavior according to your requirements. This includes specifying build configurations, selecting executable targets, configuring pre-actions and post-actions, defining environment variables, and more.

Schemes are essential for managing the build process, running and testing your application, profiling performance, and distributing your app. They provide flexibility and control over different aspects of your project's workflow, allowing you to tailor the development process to your needs.
## Targets
In Xcode, a target is a representation of a product to be built, such as an application, framework, library, or test suite. Targets define the necessary build settings, dependencies, and actions required to produce the desired output.
Each target in Xcode represents a distinct unit within your project that can be built and processed separately. For example, if you have an iOS app project, you may have a target for the main app, another target for an app extension, and potentially additional targets for frameworks or libraries that are shared between these components.

Targets encapsulate various settings and configurations, including:
1. Build Settings: Each target has its own set of build settings that determine compiler flags, optimization levels, preprocessor macros, and other options specific to that target.
2. Dependencies: Targets can depend on other targets or external frameworks and libraries. These dependencies define the relationships between different components of your project and ensure that they are built in the correct order.
3. Build Phases: Targets consist of build phases, which are a series of actions performed during the build process. Common build phases include compiling source code, linking libraries, copying resources, running scripts, and generating documentation.
4. Code Signing: Targets can have their own code signing identities and provisioning profiles, allowing for separate signing configurations for different components of your project.
5. Testing: If your target is a test suite, you can specify the test bundle, test cases, and other testing-related configurations specific to that target.

Targets are created and managed within the Xcode project file (.xcodeproj). You can add or remove targets, modify their settings, and configure dependencies by navigating to the project settings in Xcode and selecting the "Targets" tab.
By using targets, you can organize your project's code and resources into logical units and define their individual build settings and behaviors. This modular approach allows for better code reuse, separation of concerns, and flexibility in managing different components of your application.