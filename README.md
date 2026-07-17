# project-test-plan-executor

Disposable pilot project for testing the `parallel-plan-executor` engine and the
`cys` plugin end to end. Reset to a clean slate on 2026-07-17 ahead of the cys
independence-proof smoke test (design + plan + parallel run using only the
`cys` plugin, no external skill dependency).

Branch topology: `master` (release) ← `develop` (integration) ← `feature/<plan>`
(one per pilot run) ← `task-N` (one per plan task, created and cleaned up by
each run).
