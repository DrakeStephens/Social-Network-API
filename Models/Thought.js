const { Schema, model, Types } = require('mongoose');
const moment = require('moment');



const ReactSchema = new Schema({
    reactionId : {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
})

const ThoughtSchema = new Schema({
    thoughtText : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt : {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions : [ReactSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
      }
}
);
ThoughtSchema.virtual('reactionCound').get(function() { 
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;