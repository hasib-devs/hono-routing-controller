/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ["main"],
    plugins: [
        "@semantic-release/release-notes-generator",
        "@semantic-release/commit-analyzer",
        "@semantic-release/changelog",
        "@semantic-release/github",
        "@semantic-release/npm",
    ],
    ci: false,
    dryRun: true,
    debug: true,
  };