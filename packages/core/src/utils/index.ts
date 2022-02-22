import fs from 'fs/promises';
import { Outpost } from '../types/model';

export async function pathToState(path: string): Promise<Outpost | undefined> {
    if (!path) throw new Error('pathToState: no path provided');
    const content = await fs.readFile(path, { encoding: 'utf-8' });
    const object = JSON.parse(content) as Outpost;
    // TODO validate json
    return object;
}

export default { pathToState };
