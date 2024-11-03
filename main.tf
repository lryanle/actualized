terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

provider "google" {
  project = "AIAIO-gcp-project"
  region  = "us-central1"
}

provider "cloudflare" {
  email     = "team@acmutsa.org"
  api_token = var.cloudflare_api_token
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "google_region" {
  description = "Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
}

resource "aws_secretsmanager_secret" "openai_secret" {
  name = "AIAIO_OpenAI_API_Key"
}

resource "aws_secretsmanager_secret_version" "openai_secret_value" {
  secret_id     = aws_secretsmanager_secret.openai_secret.id
  secret_string = var.openai_api_key
}

module "rds" {
  source              = "terraform-aws-modules/rds/aws"
  version             = "~> 5.0"
  identifier          = "AIAIO-db"
  engine              = "mysql"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  db_name             = "aiaio_db"
  username            = "admin"
  password            = "secure-password"
  skip_final_snapshot = true
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.nextjs_app.bucket_domain_name
    origin_id   = "S3-origin"
  }
  default_cache_behavior {
    target_origin_id       = "S3-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  enabled = true
}

resource "aws_lambda_function" "nextjs_function" {
  function_name    = "AIAIO-nextjs-lambda"
  runtime          = "nodejs18.x"
  handler          = "index.handler"
  role             = aws_iam_role.lambda_exec.arn
  filename         = "path/to/nextjs-app.zip"
  source_code_hash = filebase64sha256("path/to/nextjs-app.zip")
  environment {
    variables = {
      OPENAI_API_KEY = var.openai_api_key
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name               = "AIAIO_lambda_exec_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "google_cloud_run_service" "nextjs_service" {
  name     = "AIAIO-cloudrun"
  location = var.google_region
  template {
    spec {
      containers {
        image = "gcr.io/${google_project_id}/aiaio-app"
        env {
          name  = "OPENAI_API_KEY"
          value = var.openai_api_key
        }
      }
    }
  }
  autogenerate_revision_name = true
  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "cloudflare_record" "nextjs_app" {
  zone_id = "your-cloudflare-zone-id"
  name    = "aiaio"
  value   = aws_cloudfront_distribution.cdn.domain_name
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "nextjs_app_gcp" {
  zone_id = "your-cloudflare-zone-id"
  name    = "aiaio-backup"
  value   = google_cloud_run_service.nextjs_service.status[0].url
  type    = "CNAME"
  proxied = true
}

output "aws_cloudfront_url" {
  description = "AWS CloudFront URL for the AIAIO application"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "gcp_cloud_run_url" {
  description = "Google Cloud Run URL for the AIAIO application backup"
  value       = google_cloud_run_service.nextjs_service.status[0].url
}

output "cloudflare_nextjs_url" {
  description = "Cloudflare DNS URL for fallback routing"
  value       = cloudflare_record.nextjs_app.name
}

output "rds_endpoint" {
  description = "RDS database endpoint for application backend"
  value       = module.rds.endpoint
}

output "openai_secret_arn" {
  description = "AWS Secrets Manager ARN for OpenAI API key"
  value       = aws_secretsmanager_secret.openai_secret.arn
}
