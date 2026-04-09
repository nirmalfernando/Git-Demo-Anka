import express from 'express';
import { readdir } from 'fs';
import { join } from 'path';

const app = express();

// Serve static HTML files from html-files directory
app.use('/attendee', express.static(join(__dirname, '../html-files')));

// Root endpoint - lists all HTML files as links
app.get('/', (req, res) => {
    readdir(join(__dirname, '../html-files'), (err, files) => {
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        const links = htmlFiles.map(file => `<a href="/attendee/${file}">${file}</a>`).join('<br>');
        res.send(`
            <html>
                <head><title>Git & Github Demo</title></head>
                <body>
                    <h1>Git & Github Demo</h1>
                    ${links}
                </body>
            </html>
        `);
    });
});

app.listen(8080, () => console.log('Server running on port 8080'));
