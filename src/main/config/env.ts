export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/yourDatabase?authSource=admin',
  port: process.env.PORT || 5050
}
