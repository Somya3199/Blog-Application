import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Post from './models/Post';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/');

const connection = mongoose.connection;

connection.once('open', () => {
console.log('MongoDB database connection established successfully!');
});

router.route('/post').get((req, res) => {
    Post.find((err, post) => {
        if (err)
            console.log(err);
        else
            res.json(post);
    });
});

router.route('/post/:id').get((req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err)
            console.log(err);
        else
            res.json(post);      
    });
});

router.route('/post/:add').post((req, res) => {
    let post = new Post(req.body);
    post.save()
        .then(post => {
            res.status(200).json({'post': 'Added successfully'});
        })
        .catch(err => {
            req.status(400).send('Failed to create new post');
        });
});

router.route('/post/update/:id').post((req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(!post)
            return next(new Error('Could not load document'));
        else{
            post.title = req.body.title;
            post.Description = req.body.Description;
            post.Category = req.body.Category;

            post.save().then(post => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/post/delete/:id').get((req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, (err, post) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));