# Terra-outpost

## Deployment

Single apps from /apps folder should be deployed using [this instruction](https://vercel.com/docs/concepts/git/monorepos)
or use '-infra' packages to see exmaples

To enable single app build, use

```bash
git log -1 --pretty=%B | ( ! grep '(web)' )
```

where (admin) - is the name of the scope, or name of the folder in /apps folder - set it in project settings -> git -> ignored build step in vercel
