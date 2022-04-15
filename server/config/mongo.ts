import mongoose from 'mongoose';
import config from 'config';

const mongoURL = config.get<string>('mongodb');

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
module.exports.startDb = () => {

  mongoose.connect(mongoURL, options).then(() => console.log('connected to mongoDB')).
    catch((err) => console.log(err));
};