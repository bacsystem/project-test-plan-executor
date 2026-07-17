# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-17

### Added

- Subtract API: `GET /subtract?a=<int>&b=<int>` returning `{"result": <int>}`
  (Go, `net/http`, stdlib only), built via `cys:design` → `cys:plan` →
  `parallel-plan-executor` as the cys plugin's independence-proof smoke test.
