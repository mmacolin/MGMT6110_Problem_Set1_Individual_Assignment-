# REFLECTION

## Q1 — Who are your users, and what changes for them?

The users of my product are internal logistics dispatchers working in a delivery operation. Their job is to monitor active shipments during the day and react when a shipment becomes late. The specific job I designed the product around was: “Move a late shipment to another driver and see the new arrival time.”

Without this product, a dispatcher would normally need to notice which shipment is late, identify the current driver, check which other drivers are available, compare their workload, decide who should take over the shipment, and then estimate the new arrival time. The dispatcher may need to check several pieces of information separately before making a decision. This makes the process slower and also makes it easier to overlook an urgent shipment when there are many deliveries being handled at the same time.

My prototype reorganizes this work into a much shorter workflow. On the Dispatch Board, late shipments are automatically displayed at the top and are clearly shown in red. The dispatcher can click “Reassign” on a late shipment, see its current driver, ETA, and delay, then choose from a list of available drivers. After selecting one driver and confirming the reassignment, the dispatcher returns to the Dispatch Board. The shipment now shows the new driver, new ETA, and an amber status.

The product does not remove the dispatcher from the process. The dispatcher still decides which driver should receive the shipment and must confirm the reassignment. What changes is the amount of searching and organizing required before making that decision. The dispatch or operations function still owns the final action.

## Q2 — Augmented capacity and constrained capacity

### Augmented capacity

The biggest increase in my capacity was being able to create a working React interface without having strong front-end programming skills. I was able to describe the user, the task, the required screens, and the success condition in normal language, and Google AI Studio created a functioning prototype from that description.

This allowed me to spend more of my time making product decisions instead of learning syntax. For example, I decided that late shipments should be shown in red, reassigned shipments should become amber, and the success condition should be visible when “the row turns from red to amber.” I also decided that late shipments should be displayed at the top because those are the shipments that need the dispatcher’s attention first.

The pairing also allowed me to iterate quickly. Instead of rewriting code myself, I could give a very specific prompt such as:

“Show all shipments with status ‘Late’ at the top of the Dispatch Board. Keep the other shipments below them. Change nothing else.”

I could then check the result immediately. This increased my ability to move from an idea to a working interface in a short period of time.

### Constrained capacity

The main constraint was that the tool could make choices that I had never specified. One example was the empty state. My first prompt described what the Dispatch Board should look like when shipments existed, but I did not say what should happen when there were no shipments.

Because I had not made that decision, the interface could simply show an empty table. I later added another prompt:

“When the shipment list has no rows, show ‘No shipments due today’ instead of an empty table.”

This made me realise that AI could build faster than I could fully specify or verify. I could judge the visible result, but I did not read and understand every line of React code that was generated. This means my verification became the bottleneck. I knew whether the workflow looked correct, but I had less ability to evaluate technical choices underneath the screen.

## Q3 — In the loop, on the loop, out of the loop

During the build, there were several moments where my judgment genuinely changed the result. One was when I asked for late shipments to appear at the top of the Dispatch Board. I made that decision because a dispatcher should not have to search through many rows to find the shipments needing immediate attention.

Another example was the empty-state prompt. I noticed that an empty table would not clearly tell the user what was happening, so I changed it to display “No shipments due today.” In both cases I was genuinely in the loop because I reviewed the result, identified a problem, and made a decision that changed the product.

There were also parts where I was only nominally in the loop. AI Studio made many choices about spacing, component structure, styling, and React implementation. I accepted many of these choices because the interface looked correct. I was technically reviewing the output, but I was not making meaningful decisions about every part of the generated code.

If this logistics product were real, I would keep the dispatcher **in the loop** for confirming a shipment reassignment. A reassignment can affect a driver’s workload, delivery time, and customer experience. If the wrong driver is chosen, the delay could become worse, so a person should approve the action.

However, I would allow the visual sorting of late shipments to be **out of the loop**. If the shipment status is reliable, moving late shipments to the top and showing them in red is low risk and easy to check. Before allowing this automatically, I would want evidence that the status and sorting rules consistently classify shipments correctly.

## Q4 — What did it build that you never sketched?

The most important thing I had not considered in my original design was what should happen when the shipment list had no rows. I had focused on the normal workflow: identify a late shipment, reassign it, and confirm the result.

Because I did not specify the empty state, the model had to make that decision for me. I only noticed this during the build and then added Prompt 2 to show “No shipments due today.”

This was important because it showed me that even a simple front-end contains many small product decisions. If I did the process again, I would test my initial specification against several states before generating the app: normal data, no data, late shipments, reassigned shipments, and mobile display. This would reduce the number of important decisions left to the model’s defaults.

## Q5 — Learning pointers for the organisational context

1. **Require builders to define normal, empty, and exception states before generation**, because my build showed that unspecified states can become model-selected product behaviour.

2. **Require human confirmation for operational actions with real consequences**, because a shipment reassignment can affect drivers, delivery times, workloads, and customers.

3. **Keep a prompt and change log for every generated application**, because my log made it possible to distinguish decisions I intentionally made, such as sorting late shipments first, from choices that came from the builder’s defaults.
