import { RemovalPolicy } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as path from "path"; // Use the modern import syntax for path

export default class S3Construct extends Construct {
  public readonly s3Bucket: s3.Bucket;
  public readonly s3Deployment: s3deploy.BucketDeployment;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const blockPublicAccess = new s3.BlockPublicAccess({
      blockPublicAcls: false,
      ignorePublicAcls: false,
      blockPublicPolicy: false,
      restrictPublicBuckets: false,
    });

    this.s3Bucket = new s3.Bucket(this, "s3Bucket", {
      bucketName: "abj-testing-bucket-24324",
      blockPublicAccess: blockPublicAccess,
      // accessControl: s3.BucketAccessControl.PUBLIC_READ,
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      versioned: true, // Enable versioning if needed
      encryption: s3.BucketEncryption.S3_MANAGED, // Use S3 managed encryption
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    //this.s3Bucket.grantPublicAccess();

    this.s3Deployment = new s3deploy.BucketDeployment(this, "s3Deployment", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../src"))],
      destinationBucket: this.s3Bucket,
    });
  }

  public get bucket() {
    return this.s3Bucket;
  }
}
