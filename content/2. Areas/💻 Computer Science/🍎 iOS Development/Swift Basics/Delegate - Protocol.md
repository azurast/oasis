Source: https://youtu.be/XTAziR-tY-A?si=QijLxZzW3AuipobM

Delegate and protocol is a pattern that is usually used in UI code. 

> It is a one-to-one communication pattern in Swift that allows one view to communicate with another view.

Example: bottom sheet and main view controller communication

**Delegate** (intern analogy),  you don't call delegate methods themelves, they get called automatically when they are told what to do. 

**Who gives the order?**

Well, the one who knows the data, in this case, ProductSelectionVC (boss analogy). 

So, the boss needs to give the command. They do this by calling a list of available commands to them, called **Protocols.** Which is basically a list of commands without their implementation. Protocols are like job description for the intern.

