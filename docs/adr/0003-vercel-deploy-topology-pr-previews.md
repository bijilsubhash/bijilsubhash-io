# Deploy topology: main is production, PRs get preview deployments, no staging branch

`main` deploys to production (`bijilsubhash.io`). Every pull request gets an automatic Vercel preview deployment at a unique URL, which serves as the review/staging environment. We deliberately did not create a long-lived `staging` branch or a persistent `staging.*` domain.

Why: for a single-author blog, per-PR preview URLs already give a full, isolated environment to review each change before it merges. A persistent staging branch would add a two-hop promotion (feature → staging → main) and a second environment to keep in sync, for no real benefit at this scale.

## Consequences

- The workflow is: branch → open PR → review on the auto preview URL → merge to `main` → production.
- If a stable, shareable staging URL is ever needed, a branch can be assigned a preview alias later without restructuring anything.
