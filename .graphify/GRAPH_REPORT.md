# Graph Report - .  (2026-08-24)

## Corpus Check
- Corpus is ~6915 words - fits in a single context window. You may not need a graph.

## Summary
- 110 nodes · 243 edges · 0 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 66 · MODIFIES: 62 · imports_from: 44 · imports: 43 · ON_BRANCH: 13 · PARENT_OF: 8 · calls: 6 · triggers: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 41 · Candidates: 47
- Excluded: 42 untracked · 26570 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `0d7293e`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

## Knowledge Gaps
- **16 isolated node(s):** `eslintConfig`, `config`, `config`, `FormData`, `EMPTY` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.