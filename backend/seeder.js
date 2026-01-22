const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        console.log('DB Connected via Seeder');

        console.log('Deleting users...');
        await User.deleteMany();
        console.log('Users deleted');

        const users = [
            {
                name: 'John Student',
                email: 'student@campus.edu',
                password: 'password123',
                role: 'student',
            },
            {
                name: 'Jane Faculty',
                email: 'faculty@campus.edu',
                password: 'password123',
                role: 'faculty',
            },
            {
                name: 'Super Admin',
                email: 'admin@campus.edu',
                password: 'password123',
                role: 'admin',
            },
        ];

        console.log('Creating users...');
        for (const user of users) {
            await User.create(user);
            console.log(`Created: ${user.email}`);
        }

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Seeder Error:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error('Seeder Error:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
