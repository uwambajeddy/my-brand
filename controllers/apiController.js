import path from 'path';
import {fileURLToPath} from 'url';
import { readFile } from 'fs';
const filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(filename);

const version1 = (req, res) => {
  readFile(`${__dirname}/../api.v1.structure.json`, (err, data) => {
    res.status(200).end(data);
  });
};

export default version1;
