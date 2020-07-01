module.exports = {
	mongoURI: process.env.DATABASEURL || 'mongodb://localhost/hackinindia',
	secretKey: process.env.secretKey || '12345'
};
