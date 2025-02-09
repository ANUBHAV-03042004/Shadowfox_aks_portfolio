const express = require('express');
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
    });

    app.get('/about', (req, res) => {
        res.render('about');
        });
        app.get('/project', (req, res) => {
            res.render('project');
            });
            app.get('/skill', (req, res) => {
                res.render('skill');
                });
                app.get('/contact', (req, res) => {
                    res.render('contact');
                    });
                    app.get('/*', (req, res) => {
                        res.render('page_not_found');
                        });
    app.listen(3000,()=>{
        console.log('server connected...')
    });