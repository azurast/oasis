---
title: 'Cekidot'
briefDescription: 'Cekidot helps you find food that suits your dietary habit and allergy restrictions for your next grocery stop.'
year: '2021'
type: 'Team Project'
platform: 'iOS'
techStack : ['SwiftUI', 'CoreData', 'CloudKit', 'Clean Architecture', 'SwiftLint']
---

![[cekidot_banner.png]]

## About
Cekidot is an iOS app that helps people to find food that suits their dietary habits and allergy restrictions on their next grocery shop.

With Cekidot, it's easier to find out healthier options & have no worries about potential allergens.

## Background

My team and I had a common interest in the topic of Food. Once we did further exploration, we realized that **groceries can be a bit tedious if you want to eat healthier or if you are vegan/vegetarian or have allergies**.

Let's be honest here, **who really has the time** for checking out and reading all the nutrition facts to ensure you are not purchasing too sugary foods or products high in salt? Especially with varying serving sizes that can be misleading.

After conducting interviews with potential users, we believe that we should **make food more transparent and understandable for all**. We also want to make it easier for the users to spot an ingredient they want to avoid **without having to go through the pain of reading through the ingredient label.**

## Tech

#### Features
- Ingredient Alert
- Discover, Compare and Filter Products
- Shopping List


This time around, my team and I really wanted to focus on **implementing best practices**.
The technology we used are pretty common. Nothing too out-of-the ordinary, we just really wanted our project to follow the guidelines we have learned all this time.

### Architecture

![[cekidot_clean_arch.jpeg]]

First thing first is architecture, we have so many options and we were already familiar with MVC & MVVM, but still felt there could be an improvement since we want the app to be scalable.
We resolved to try using Clean Architecture with SwiftUI which was pretty challenging since there were not many resources regarding it.

What makes Clean stands out for us is the addition of Model, Worker, and Router. Having a Model decoupled from the ‘database scheme’ really helps us to make changes easier.
The Model also helps define the data structure needed make Requests and give Responses so that the presenter can consume it for displaying according to the View’s needs.

Furthermore, having Workers that does many of the heavy lifting, especially connecting to persistence and networking really helps to lift the load off the Interactor that should only focus on doing the business logic.
Worker is also great since we can have a universal worker that contains many logic that can be reused in many different areas.
It is only the router that we felt was a bit out of place with SwiftUI since Navigation can easily be done using NavigationLink.

### Template

![[cekidot_template.jpeg]]

To reduce time creating files from scratch, and due to the nature of the architecture we chose, we decided to create a Boilerplate that will generate the files we needed whenever we want to create a new Module or typically we call it page.
Each module will create 6 different files: Interactor, Model, Presenter, Router, View, and Worker.

### Components First

![[cekidot_components.jpeg]]

We used to have multiple of the same components, and we made the rookie mistake of NOT making any ViewModifiers that led the View code to be less readable, and is tedious whenever we had to make changes.

So now, before even we start to code any page, we decided to make the reusable components first. We don’t want to have doubles of the same thing. By creating the components that we have broke down during our tech feasibility session, and seperate the styling with the view we were able to work faster.

For example, whenever there are changes to that component after the design team did a UT iteration, we can just change that component for the whole app if it is reused in multiple pages.   But most importanly, the ViewModifiers made it possible to have Dynamic Type for Accessibility.

### Database and Storage

![[cekidot_database.jpeg]]

We wanted to maximize the Apple framework environment thus we use CoreData and CloudKit as the Backend and Service for our app. It enables us to synchronize data automatically.

## Teammates
This work wouldn't have been possible without our collective effort as a group!❤️

![[cekidot_teammates.jpg]]