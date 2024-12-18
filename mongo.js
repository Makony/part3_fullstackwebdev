const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  console.log('give password, name and number to add to the phonebook')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://mako:${password}@cluster0.afidq.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Phonebook entries:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}