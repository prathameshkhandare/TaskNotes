const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json());

app.use(express.urlencoded({ extended:true}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    fs.readdir(`./files` , function(err, files){
     
        if(err) {
            console.log(err);
            return;
        }
        else{
       
       res.render('index',{files:files});
        }
    })
    

    
})


app.post('/create', function(req, res){
    const fileName = req.body.title.split(' ').join('') + '.txt';
    fs.writeFile(`./files/${fileName}`, req.body.details, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('file created');
            res.redirect('/');
        }
    });
});

app.get('/files/:fileName', function(req, res){

fs.readFile(`./files/${req.params.fileName}`,'utf-8', function(err,filedata) {
    if (err) {
        console.log(err);
        return;
    } else {
        res.render('task',{fileName:req.params.fileName,filedata:filedata});
    }
})


})

app.get('/edit/:fileName', function(req, res){
    res.render('edit',{fileName:req.params.fileName});
})

app.post('/edit', function(req, res){

    // console.log(req.body);
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    })
});


const port =4000;

app.listen(port, ()=>{
    console.log('listening on port ' + port);
})