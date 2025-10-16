// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nextjs-lambda-github-actions",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          profile: input.stage === "production" ? "production" : undefined,
        },
        cloudflare: "latest",
      },
    };
  },
  async run() {
    const isProduction = $app.stage === "production-example";

    new sst.aws.Nextjs("NextjsLambdaGithubActionsWebsite", {
      domain: isProduction
        ? {
            name: "nextjs-lambda-github-actions.opendeployments.com",
            dns: sst.cloudflare.dns(),
          }
        : undefined,
    });
  },
});
