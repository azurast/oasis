## Step 1: Encoding:
|Word|Vector|
|---|---|
|The|[0.1, 0.2, 0.3]|
|quick|[0.4, 0.5, 0.6]|
|brown|[0.7, 0.8, 0.9]|
|fox|[1.0, 1.1, 1.2]|
|jumps|[1.3, 1.4, 1.5]|
|over|[1.6, 1.7, 1.8]|
|the|[1.9, 2.0, 2.1]|
|lazy|[2.2, 2.3, 2.4]|
|dog|[2.5, 2.6, 2.7]|
## Step 2: Attention Scores
(Focusing on "jumps")

| Word | the | quick | brown | fox | jumps | over | the | lazy | dog |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| jumps | 0.2 | 0.8 | 0.4 | 1.0 | 1.0 | 0.6 | 0.2 | 0.3 | 0.5 |

In step 2, we calculated the raw "attention scores" that measure **how relevant each word is to "jumps."** However, these scores are just raw numbers reflecting similarities, not directly usable probabilities. Why? As you noticed, the raw scores in step 2 are just numbers expressing similarity. Without normalization, they aren't valid probabilities. Probabilities need to sum to 1, but these scores could sum to any value, making them unsuitable for further calculations.
## Step 3: Softmax Function:

Step 3 applies the **softmax function** to these scores. Imagine having a bucket of apples where some are closer to the desired kind (like "fox" for "jumps") while others are further away ("the" or "dog").

- The softmax function distributes the apples (probabilities) within the bucket,giving more apples (higher probabilities) to the closer ones ("fox") and fewer to the distant ones ("the" or "dog").
- This **ensures the probabilities add up to 1, **representing a valid probability distribution.

So, the values in step 3 are **normalized probabilities** indicating how much attention each word deserves **relative to all other words** in the context of "jumps."

| Word | the | quick | brown | fox | jumps | over | the | lazy | dog |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| jumps | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |

Looking at the table, you see "jumps" has a score of 0.27, the same as "fox." But don't be fooled! Remember, these are **relative** probabilities.

- "Jumps" scoring 0.27 means it has a 27% chance of being the **most** relevant word out of all compared to "jumps" itself.
- However, "fox" also scoring 0.27 doesn't mean they have the same absolute chance. It means "fox" has a 27% chance of being the **most** relevant **compared to all other words**, which also includes "jumps".

In essence, the softmax function ensures each word's attention score reflects its **relative importance** within the specific context of the word being analyzed (in this case, "jumps").
## Step 4: Weighted Value Matrix:
Multiplying the original value vectors by the transposed attention score matrix:

| Word | the | quick | brown | fox | jumps | over | the | lazy | dog |  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| [0.1, 0.2, 0.3] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [0.4, 0.5, 0.6] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [0.7, 0.8, 0.9] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [1.0, 1.1, 1.2] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [1.3, 1.4, 1.5] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [1.6, 1.7, 1.8] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [1.9, 2.0, 2.1] | 0.06 | 0.21 | 0.10 | 0.27 | 0.27 | 0.16 | 0.06 | 0.08 | 0.13 |  |
| [2.2, 2.3, 2.4] | 0.06 | 0.21 | 0.10 |  |  |  |  |  |  |  |
While having normalized probabilities (step 3) helps interpret the relative importance of each word, we still need another step (matrix multiplication) to leverage those probabilities effectively. Here's why:

- **Raw Value Matrix Doesn't Reflect Attention:**

Remember, **the original value matrix holds the unweighted information for each word**. Simply having probabilities doesn't automatically change this information.

- **We Need Weighted Information:**

We want a **new representation that incorporates the importance scores** assigned by the probabilities. Multiplying the value matrix with the transposed attention score matrix achieves this.

**Imagine:**

- Each row in the value matrix represents a word's information (like a bucket of apples).
- Each probability in the transposed attention score matrix represents the weight to assign to each apple in that bucket (higher probability = heavier).

**Matrix Multiplication Magic:**

- Multiplying these matrices is like carefully picking apples from each bucket based on their weights. Words with higher probabilities (heavier apples) contribute more to the resulting vector.
- This creates a **new weighted representation** for the current word (e.g., "jumps") that considers the **importance** (probabilities) of each other word in the context.

**Essentially:**

- Step 3 tells us **how much attention** each word deserves.
- Matrix multiplication in step 4 uses those attention weights to **actually apply** that attention, creating a new representation focused on the most relevant information.