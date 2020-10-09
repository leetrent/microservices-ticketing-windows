import mongoose from 'mongoose';
import { Password } from '../services/password';

/////////////////////////////////////////////
// new User:
// An interface that desribes the properties
// that are required to create a new User
/////////////////////////////////////////////
interface UserAttrs {
  email: string,
  password: string
}

/////////////////////////////////////////////
// UserModel:
// An interface that describes the properties
// that a User Model has
/////////////////////////////////////////////
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/////////////////////////////////////////////
// UserDocument:
// An interface that describes the properties
// that a User Document has
/////////////////////////////////////////////
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(done) {
  if ( this.isModified('password') ) {
    const hashedPassword = await Password.toHash( this.get('password') );
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };