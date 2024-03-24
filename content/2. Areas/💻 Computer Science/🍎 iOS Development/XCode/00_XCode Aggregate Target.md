# XCode Aggregate Target
## **What is aggregate Xcode?**
An **aggregated target** is an Xcode **target that lets you build a group of targets at once**. It doesn’t have any Products itself, like an app for an app target or a framework for framework targets. It doesn’t have build rules either, but it **can have a Run Script build phase** or a **Copy Files build phase only.**

## What are targets Xcode?
**A target specifies a product to build and contains the instructions for building the product** from a set of files in a project or workspace. There can be only one active target at a time; the Xcode scheme specifies the active target. A target and the product it creates can be related to another target.

## What is an aggregate target?
Xcode defines a special type of target that **lets you build a group of targets at once**, even if those targets do not depend on each other. An aggregate target **has no associated product and no build rules**. Instead, an aggregate target **depends on each of the targets you want to build together.**

They **act as a means of organizing the building of other targets in the same project file into a single step.** This is particularly useful when dealing with multiple layers of dependencies. Like other types of targets, additional build phases can be added (run scripts, copy files, etc).

Aggregate targets can also be used for building multiple disparate targets. For example, building both a dynamic framework and a static library version of your code from the same dependency target. This makes **aggregate targets extremely flexible and useful for configuring builds**.