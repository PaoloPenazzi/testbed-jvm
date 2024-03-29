var publishCmd = `
git tag -a -f \${nextRelease.version} \${nextRelease.version} -F CHANGELOG.md || exit 1
git push --force origin \${nextRelease.version} || exit 2
./gradlew build || exit 3
./gradlew uploadKotlin release || exit 3
./gradlew publishKotlinOSSRHPublicationToGithubRepository || true
`
var config = require('semantic-release-preconfigured-conventional-commits');
config.plugins.push(
    [
        "@semantic-release/exec",
        {
            "publishCmd": publishCmd,
        }
    ],
    [
        "@semantic-release/github",
        {
            "assets": [
                {"path": "build/libs/testbed-\${nextRelease.version}.jar"},
            ]
        }],
    "@semantic-release/github",
    "@semantic-release/git",
)
module.exports = config
