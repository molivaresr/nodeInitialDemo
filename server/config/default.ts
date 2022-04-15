export default {
    corsOrigin: "*",
    port: 4000,
    host: "localhost",
    mongodb : 'mongodb://localhost:27017/itchat',
    mongoOpt: {
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6'
    },
    password : '123456789',
    PRIVATEKEY : 'SECRETO',
  };
  