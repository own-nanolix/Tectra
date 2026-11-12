Standing orders for the rest of this session. Do not ask me anything; work through to the end.

0. Save this whole message word for word as STANDING-ORDERS.md in each project's root, and re-read it after any context compaction. Do not stop or restart the builders that are running now; let them finish.

1. Rule files come first. In every project, open the rule/ folder and read every .md file in it fully (there should be two) before doing any more work on that project. They are the source of truth: if they disagree with BRIEF.md, LAYOUTS.md or anything you have already built, follow the rule files and fix the work.

2. Order: finish UpCanopy, then Sahra, then Best Grid. Take each one through every step of your plan: build, page checks, sending short pages back, review round, verification, SVG export, README.md and REPORT.md.

3. Tectra is already live at https://tectra-phi.vercel.app/ . Vercel is connected to the GitHub repo, so every push to main deploys automatically; skip the vercel login. Check Tectra against both of its rule files and fix anything that does not comply. Make the lp-home footer link columns neutral (no Glean product names such as "Workplace Search", "Assistant", "Knowledge Management", "Work Hub", "Connectors"). Add the live URL to README.md and REPORT.md.

4. Never put another company's name, address, product names or copyright on any page; use neutral placeholders.

5. Commits: commit locally after every builder finishes and after every fix. Push to main only once per project, after its final code review passes, because every push goes live.

6. Final code review for each project, before pushing: run the full build, lint, audit and all page checks. Then have a fresh reviewer agent that has not seen the work review the code and every page against both rule files. Fix everything it finds, re-run all checks, and only then push. After the push, open the live URL (if that project has one) and confirm it shows the new commit.

7. If a project has no Vercel project yet, do not stop: push to GitHub and list it at the end as needing a Vercel import by me.

8. Make reasonable decisions yourself and record each one in that project's REPORT.md. Never delete files, force-push or rewrite git history. Stop only if something needs my sign-in or a payment.

9. When all four projects are done, give me one short final report: for each project, the live URL or "needs Vercel import", pages built, checks passed, rule-file compliance, and anything that still needs me.
