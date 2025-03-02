/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ["main", "next", { name: "beta", prerelease: true }, { name: "alpha", prerelease: true }],
    plugins: [
        "@semantic-release/release-notes-generator",
        "@semantic-release/commit-analyzer",
        "@semantic-release/github",
        "@semantic-release/npm",
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