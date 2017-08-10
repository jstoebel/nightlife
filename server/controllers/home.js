import path from 'path';
/*
* GET /
* Home page.
*/
export function index(req, res) {
  // returns front end client.
  res.sendFile(path.join(__dirname + '/../../public/build/index.html'));
}
