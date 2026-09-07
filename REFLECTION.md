# REFLECTION

**Student:** Moeung Macolin  
**Course:** MGMT 6110  
**Problem Set:** Individual Problem Set 1

## Q1 — Who are your users, and what changes for them?

The users are internal logistics dispatchers working in a delivery operation. Their job is to monitor active shipments and respond when one becomes late. My user sentence is: “A logistics dispatcher opens this screen to reassign a late shipment to another driver, and knows it worked when the shipment returns to the Dispatch Board with the new driver and ETA and the row changes from red to amber.”

Without the product, a dispatcher would have to notice a delay, identify the current driver, check which other drivers are available, compare workload and likely arrival times, choose a replacement, and update the shipment. My prototype puts those steps into one short workflow. Late shipments appear at the top of the Dispatch Board in red. The dispatcher clicks Reassign, sees the shipment details and invented available drivers, chooses one, and confirms. The shipment then returns to the board with a new driver, new ETA, and amber status.

The product does not replace the dispatcher’s judgment. It removes some of the searching and reordering of information around that judgment. The dispatch or operations function still owns the reassignment because the human chooses and confirms the new driver.

## Q2 — Augmented capacity and constrained capacity

### Augmented capacity

The pairing increased my capacity because I could build a working React interface even though I am not a front-end programmer. Instead of spending most of the assignment learning React syntax, I could focus on deciding what the screen should do and judging whether the result matched the dispatcher’s job.

For example, I decided that late shipments should be red, reassigned shipments amber, and success should be visible when the row changes from red to amber. One prompt said: “Show all shipments with status ‘Late’ at the top of the Dispatch Board. Keep the other shipments below them. Change nothing else.” I could immediately test whether the behaviour was correct.

The useful augmentation was not only speed. It let me move from an idea to a functioning interface quickly enough to spend more time checking user behaviour, empty states, sorting, and confirmation.

### Constrained capacity

The constraint appeared when the first build left an unspecified state to the model. I had described what the shipment list should show when rows existed, but not what should happen when there were no rows. The result was an empty table, which was technically valid but unclear.

I corrected it with Prompt 2: “When the shipment list has no rows, show ‘No shipments due today’ instead of an empty table. Change nothing else.” After seeing that unspecified behaviour could become product behaviour, I kept the guardrail “Change nothing else” in later prompts so each iteration moved only one variable at a time.

I could test the visible workflow, but I did not understand every line of React code AI Studio produced. The tool’s production capacity was therefore larger than my ability to inspect the implementation underneath it.

## Q3 — In the loop, on the loop, out of the loop

A clear moment where my judgment changed the outcome was Prompt 3: “Show all shipments with status ‘Late’ at the top of the Dispatch Board. Keep the other shipments below them. Change nothing else.” I made that change because a dispatcher should not search through on-time shipments before finding the ones needing attention. I was genuinely in the loop because I identified the issue, specified the change, and verified the result.

There were also moments where I was only nominally in the loop and added almost nothing. AI Studio chose much of the spacing, component structure, typography, and implementation details. I accepted those choices because the screen looked usable. I was reviewing the output, but I was not making meaningful decisions about every generated detail.

If the product were real, the dispatcher should remain **in the loop** for the final reassignment. A bad choice can increase delay, overload a driver, and affect a customer, so confirmation is necessary.

In contrast, sorting shipments already marked Late to the top can be **out of the loop** because it is low risk, immediately checkable, and easy to reverse. I would only sign that off after measuring that the status field is reliable and the sorting rule handles all shipment states correctly.

## Q4 — What did it build that you never sketched?

The most important unscripted behaviour was the empty shipment state. I did not sketch or specify what the interface should display when there were zero shipments. I noticed this **during the build, after the first version existed**, because the screen could show an empty table without explaining whether the system was broken or nothing was due.

I fixed it by adding “No shipments due today.” More importantly, this changed how I prompted afterward. I started using the guardrail **“Change nothing else”** so I could isolate each change and make the log easier to judge.

I would have caught this sooner if, before generating the first version, I had tested my specification against a short state checklist: normal rows, zero rows, late rows, reassigned rows, and phone layout. That would have exposed the missing decision before the model filled it in for me.

## Q5 — Learning pointers for the organisational context

1. **Require builders to define normal, empty, and exception states before generation**, because my first build left the zero-shipment state unspecified and the model supplied the behaviour.

2. **Require one-change-at-a-time prompts with an explicit guardrail such as “Change nothing else,”** because after the empty-state problem I used that rule to make later changes easier to verify and reconstruct.

3. **Require human confirmation for operational changes that affect real people or customers**, because my prototype showed that sorting can safely be automatic while driver reassignment should remain a deliberate dispatcher decision.
