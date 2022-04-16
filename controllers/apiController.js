import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname(__filename);
import { readFile } from 'fs';

const version1 = (req, res) => {
  readFile(`${__dirname}/../api.v1.structure.json`, (err, data) => {
    res.status(200).end(data);
  });
};

export default version1;
