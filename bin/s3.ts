#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import S3Stack from "../lib/s3-stack";

const env = {
  account: "062356463880",
  region: "us-east-1",
};

const app = new cdk.App();
new S3Stack(app, "s3Website", { env });
