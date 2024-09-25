import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
    },
    profile_picture: {
      type: String
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 1
    },
    code_battles: {
      won: {
        type: Number,
        default: 0
      },
      lost: {
        type: Number,
        default: 0
      }
    },
    type_battles_won: {
      type: Number,
      default: 0
    },
    average_wpm: {
      type: Number,
      default: 0
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
      }
    ]
  });

const User = mongoose.model('User', userSchema);

export default User;  
