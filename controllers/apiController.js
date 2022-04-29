import { fileURLToPath } from 'url';
import { dirname } from 'path';

<<<<<<< HEAD
import { readFile } from 'fs';

const version1 = (req, res) => {
  readFile(`./../api.v1.structure.json`, (err, data) => {
=======
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname(__filename);
import { readFile } from 'fs';

const version1 = (req, res) => {
  readFile(`${__dirname}/../api.v1.structure.json`, (err, data) => {
>>>>>>> cd59fe1d3274d874646ea1c0b7892ddb6c5692e9
    res.status(200).end(data);
  });
};

export default version1;
