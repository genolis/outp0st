import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const a = req.query?.address;
    if (!a) res.status(500);
    const whiteList = [
        'terra1gvlyeg5z6zx8fdmv2gs4kscl3w62d756kw7sn4', //test
        'terra14nc9wr5kagqyu34j7aqvwyq4802ke6hwcwhyyj',
        'terra18p4s8phhhq3r3prmwvf0s4lf0qfh5c73pgjnk7',
        'terra1ad9677rf3d0du43s48js0tlr48phnu4ar6z9ms', //initial mainnet wallet
        'terra187th39ts5h0hmz8w4v0hmprlaejhy2zfle8mhd', //wallet for initial sends
        'terra1xceljh7wfrd237339nfv8ak2qf687m2e2396s6', //deployer
        'terra1zdyrrxk6ps5x7gumte0ykwfu6lndgchvgh5l2y', //wallet LUV admin
        'terra12ddw3xr5af4maw99qag6a320p7acfkra7qsztt', //partners wallet
        'terra1z2adgsev7sraqjddrmxkun2e79xqu96puqqemz', // Short term rewards
    ];
    const ok = whiteList.indexOf(a as string) > -1;
    res.status(200).send(ok);
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};
