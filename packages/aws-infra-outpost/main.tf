

# React app
module "site-react-app" {
  source = "github.com/skyscrapers/terraform-website-s3-cloudfront-route53//site-main"

  region                           = "ap-southeast-2"
  domain                           = "terraadmin.uniconsoftware.com.au"
  bucket_name                      = "terraadmin.uniconsoftware.com.au"
  duplicate-content-penalty-secret = "some-secret-password-2"
  deployer                         = "dima.v"
  acm-certificate-arn              = "arn:aws:acm:us-east-1:789422368735:certificate/f8c58849-d77f-4eb9-8ba6-12a1bd4439c5"
  not-found-response-path          = "/index.html"
  forward-query-string             = true
}

# module "dns-cname-react-app" {
#   source = "github.com/skyscrapers/terraform-website-s3-cloudfront-route53//r53-cname"

#   domain          = "dimav.lunaverse.io"
#   target          = module.site-react-app.website_cdn_hostname
#   route53_zone_id = "Z07268851FQDKX4PXG39T"
# }
