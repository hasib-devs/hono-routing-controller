/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    { name: "main" },
    { name: "next", prerelease: true },
  ],
  plugins: [
    "@semantic-release/release-notes-generator",
    "@semantic-release/commit-analyzer",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["docs/CHANGELOG.md"]
      }
    ],
  ],
};