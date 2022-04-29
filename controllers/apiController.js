import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { readFile } from 'fs';

const version1 = (req, res) => {
  readFile(`./../api.v1.structure.json`, (err, data) => {
    res.status(200).end(data);
  });
};

export default version1;
