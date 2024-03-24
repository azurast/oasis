> [! definition]
> A _bitwise operation_ operates on a bit string, a bit array or a binary numeral at the level of its individual bits. [Wikipedia](https://en.wikipedia.org/wiki/Bitwise_operation)

## From Bard

Imagine you have a bunch of light switches - each switch representing a single bit, either on (1) or off (0). Bitwise operations are like playing with these switches to achieve different effects. Here are some common ones:

**AND:** Think of it like **checking if both switches are on**. If both are on, the output is 1, like a high five between switches.If either is off, the output is 0, like a silent treatment.

**OR:** This is like **checking if at least one switch is on**. If either or both are on, the output is 1, like a cheering crowd with at least one person clapping. If both are off, it's silence again (0).

**XOR:** This is like a mischievous friend flipping switches. **If a switch is on, it turns off and vice versa**. So, if both are the same (both on or both off), the output is 0, like no change. If they're different, the output is 1, like a surprised gasp for the unexpected change.

**Shifting:** Imagine **moving all the switches to the left or right**. **Left shift doubles the value (like multiplying by 2), while right shift halves it (like dividing by 2)**. Think of it as pushing the switches left or right.

**NOT:** This is like a grumpy switch - **whatever the input, it flips it.** If it's on, it becomes off, and vice versa. It's like a stubborn child saying "no" to everything.

Here are some examples in Swift and Python:

> [! Example] **Swift:**

```swift
let a = 5 // 0101 in binary
let b = 7 // 0111 in binary

let andResult = a & b // 0101 & 0111 = 0101 (only where both are on)
let orResult = a | b // 0101 | 0111 = 0111 (at least one is on)
let xorResult = a ^ b // 0101 ^ 0111 = 0010 (different bits are on)
let leftShiftResult = a << 1 // 0101 << 1 = 1010 (doubled)
let rightShiftResult = b >> 2 // 0111 >> 2 = 0001 (halved)
let notResult = ~a // ~0101 = 1010 (all bits flipped)
```

> [! Example] **Python:**

```python
a = 5 # 0101 in binary
b = 7 # 0111 in binary

andResult = a & b # 0101 & 0111 = 0101 (only where both are on)
orResult = a | b # 0101 | 0111 = 0111 (at least one is on)
xorResult = a ^ b # 0101 ^ 0111 = 0010 (different bits are on)
leftShiftResult = a << 1 # 0101 << 1 = 1010 (doubled)
rightShiftResult = b >> 2 # 0111 >> 2 = 0001 (halved)
notResult = ~a # ~0101 = 1010 (all bits flipped)
```

Remember, these are just basic examples. Bitwise operations can be combined and used in complex ways to achieve diverse functions, making them a powerful tool for programmers.

Hopefully, this helps you understand these fascinating operations in a simple way! Feel free to ask if you have any further questions.