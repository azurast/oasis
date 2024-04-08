---
title: 'Donor+'
briefDescription: 'Donor+ makes the rigorous screening process for convalescent plasma donor & The Red Cross trouble-free.'
year: '2021'
type: 'Team Project'
platform: 'Cross-Platform'
techStack : ['SwiftUI', 'NextJS', 'Apollo', 'GraphQL', 'PostgreSQL', 'Express', 'Prism', 'S3']
---

![[donor+_banner.png]]

## About
Donorplus is an app that eases out the manual registration and preliminary screening process for potential convalescent plasma donors as well as the status information for each stage of the process.

## Background

Through June - July this year, we all know the Covid-19 condition in Indonesia got pretty bad. Right and left we see those nearest to us struggling to find help. As we know, convalescent plasma donor is one of the available therapy used for Covid-19 patients, and we kept seeing the need for donors. We asked ourselves, if many people recovered from the disease, why was it so hard to find them? Some of our team members also have a personal connection with the issue as we've been in their shoes, looking for donors for our sick loved ones.

We initially wanted to create a tinder like app for matching sick patients and potential donors. But after countless hours of research we found that the root of the problem was there was no dedicated platform for donors. These **donors** are lovely people who have dedicated a portion of their time to give their blood, but its not that easy to register, and it takes several days for the administration to be processed. On the other hand, the **Indonesian Red Cross** or Palang Merah Indonesia (PMI) is also struggling with sorting out the data. PMI is one of the front-line worker during these times. That's why we think we have to make it easy for both donors and PMI. This is how Donor+ came to be.

## Tech

![[donor+_techstack.png]]

### iOS Client
#### Features
- Integration with Health App
- Donor Qualification Test
- Register to Nearest UDD PMI
- Online Registration Form
- QR Code for Queueing Process
- Track each donor process

In this project, we were trying to use **SwiftUI** as our main framework for solving this challenge. The SwiftUI framework is responsive and uses a declarative syntax to state all the properties and describe the style used for each field.

One of our components in our project is using interfacing with **UIKit**, where we bring the existing **MapViews** from **MapKit** because the current iteration of Maps in **SwiftUI** unable to produce the interaction and feature that we needed.

For communicating with the backend server, we mainly use **Apollo iOS** to communicate with our server. The **Apollo iOS** will generate the model based on the query used using **GraphQL.** In our fetch time slot, we found some difficulties in using a custom-scalar data type that is quite type-safe, and the data translated is not purely JSON. So that we are facing problems using the decodable and are forced to use JSONSerialization to make sure the data we get is assigned to the model that we reserve.

Another tech that we adopt from **UIKit** is Sign In With Apple Id and, **EventKit** for adding the iCal for the reminder to the user. We also used some cocoapods packages, such as StepperView, to display the user's donor status.

Lastly, we add the push notification service using firebase cloud messaging to handle the notifications of changed status pushed from the back office.

### Web Client
#### Features
- Identity Access Management for PMI
- Manage admins UDD PMI
- Monitor donor process & update active donor status
- See Data donors
- Manage schedules and time slots

This time we used Next.js for the frontend development. Since Next.js is based on React, it was easier since the developers are more familiar with it. Other than that, Next.js has an advantage of their pre-rendering and data-fetching features which is essential because the back-office app displays a lot of information. To communicate with the back-end side, same like the iOS app, the website communicates using Apollo GraphQL. We also used Formik for quick form submission and validation.

### BackEnd
We're using **GraphQL** as query language for our API and **Apollo** Server for controlling incoming and outcoming call for access **GraphQL**. **Why we prefer use GraphQL rather then REST API?** **GraphQL** has simple query to get any kind of data from backend, front end just need to specific querying what kind of data that the front-end needs, and lastly we could doing an insert new data, update or delete on several table at one calling time.

For implementing **GraphQL** and **Apollo** Server, We needs to using it with a backend framework, and we use Express JS. We're using Express because it has simple code for backend, we're quite familiar with it and There are a lot of resource that we could use as  a guideline related with Implementing **GraphQL** and **Apollo** using Express JS.

### Database and Storage
For the database, we are using PostgreSQL as the primary database. The database itself is hosted on the cloud using AWS RDS. The RDS gives URL as the endpoint, and it can be fetched online using multiple devices. Meanwhile, we are using AWS S3 for storing the uploaded image sent from the iOS through Apollo Server. All the query process is helped using Apollo Server and Queried using GraphQL.

## Teammates
- 🎨 **Elvira Tantri** - Designer
- 🎨 **Hana Faiqoh** - Designer
- 🛠 **Reza Fadli Haris** - Project Manager & Developer
- 🛠 **Jason Nugraha Derahim** - Developer
- 🛠 **Jovanta Anugerah Pelawi** - Developer
- 🛠 **Aprilliani Putri Prasetyo** - Developer
- 🛠 **Azura Sakan Taufik** - Developer