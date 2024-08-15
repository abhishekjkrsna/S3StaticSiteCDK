import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Stack, CfnOutput, StackProps } from "aws-cdk-lib";
import S3Construct from "./s3-construct";

export default class S3Stack extends Stack {
  public readonly _s3Bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this._s3Bucket = new S3Construct(this, "s3Stack").bucket;

    new CfnOutput(this, "webisteURL", {
      value: this._s3Bucket.bucketWebsiteUrl,
    });
  }
}
