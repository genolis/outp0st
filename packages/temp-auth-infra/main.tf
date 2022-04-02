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

resource "vercel_project" "app-outp0st" {
  # don't forget to set ignoret build step git log -1 --pretty=%B | ( ! grep '(payload)' )!
  name             = "app-outp0st"
  build_command    = "cd ../.. && npx turbo run build"
  framework        = "create-react-app"
  install_command  = "npm install --prefix=../.."
  output_directory = "build/"
  root_directory   = "apps/payload"
  team_id          = "genolis"
  git_repository {
    type = "github"
    repo = "dimkk/terra-outpost-mono"
  }
}

resource "vercel_env" "env_app-outp0st" {
  project_id = vercel_project.app-outp0st.id // or use a hardcoded value of an existing project
  type       = "plain"
  key        = "SKIP_PREFLIGHT_CHECK"
  value      = "true"
  target     = ["production", "preview", "development"]
  team_id    = "genolis"
}
