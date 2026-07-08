# Repository Guidelines

## Project Structure & Module Organization

WebdriverIO specs and support code live in `test/`. Page objects are in `test/page-objects/`, reusable helpers and API clients are in `test/utils/`, and WDIO configuration files live at the repository root. Docker and report publishing support live in `docker/`, `compose.yml`, and `bin/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies and set up Husky.
- `npm test`: run the default WDIO suite.
- `npm run test:local`: run against the local `baseUrl`.
- `npm run test:local:stack`: run against the local Grants UI Docker stack defaults.
- `npm run test:github`: run the GitHub/Docker-oriented suite.
- `npm run lint` / `npm run lint:fix`: check or fix linting.
- `npm run format:check` / `npm run format`: check or apply formatting.
- `npm run report`: generate the Allure report.

## Coding Style & Naming Conventions

Use ES modules and the local Prettier/ESLint configuration. Keep page objects named after the user-facing page and specs journey-oriented.

## Domain Language

Use `CONTEXT.md` as the source of truth for land grant journey-test language. Prefer those terms in specs, page objects, helpers, docs, and generated changes.

## Developer Addenda

Developers can add their own `AGENTS.local.md` and should be read as an addendum to this file. Keep that file local to your machine and do not commit it.

## Testing Guidelines

Prefer shared page objects and journey helpers over duplicating browser or API setup. Run the relevant WDIO command and linting before opening a PR.
