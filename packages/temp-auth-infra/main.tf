terraform {
  required_providers {
    vercel = {
      source  = "registry.terraform.io/chronark/vercel"
      version = ">=0.10.3"
    }
  }
}

provider "vercel" {
  token = "51SkGrN5oB4PW4RAnGBLuQDN"
}

resource "vercel_project" "terra-outpost-auth-temp-real" {
  name             = "terra-outpost-auth-temp-real"
  build_command    = "cd ../.. && npx turbo run build --scope=web --include-dependencies --no-deps"
  framework        = "nextjs"
  install_command  = "npm install --prefix=../.."
  output_directory = ".next/"
  root_directory   = "apps/web"
  git_repository {
    type = "github"
    repo = "dimkk/terra-outpost-mono"
  }
}
