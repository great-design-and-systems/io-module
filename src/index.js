import { GDSDatabase, GDSServer, GDSServices, GDSUtil } from 'gds-config';

import { IOResource } from './app/';
import bodyParser from 'body-parser';
import express from 'express';

const UPLOAD_LIMIT = process.env.UPLOAD_LIMIT || '4000kb';
const app = express();
const PORT = process.env.PORT || 5000;
new GDSDatabase().connect((errDB) => {
    if (errDB) {
        console.error(errDB);
    } else {
        new GDSServer(app);
        app.use(bodyParser.raw({
            limit: UPLOAD_LIMIT
        }));
        app.listen(PORT, () => {
            console.log('Express is listening to port ' + PORT);
            new IOResource(app);
        });
    }
});

export default app;



