const connection = require('../config/connection');
const { Thoughts, Student } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Thoughts.deleteMany({});

  // Drop existing students
  await Student.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Get some random assignment objects using a helper function that we imported from ./data
  const thoughts = getRandomThoughts(10);

  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    // const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
