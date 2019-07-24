import mongoose from 'mongoose';
import { StringDecoder } from 'string_decoder';

const Schema = mongoose.Schema;

let Post = new Post({
    title: {
        type: String
    },
    Description: {
        type: String
    },
    Category: {
        type: String
    },
});

export default mongoose.model('Blog', Post)