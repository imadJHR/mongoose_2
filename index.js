const mongoose = require('mongoose');

// Define a person schema
const PersonSchema = new mongoose.Schema({
 name: { type: String, required: true },
 age: Number,
 favoriteFoods: [String]
});

// Create a person model
const Person = mongoose.model('Person', PersonSchema);

// Create and save a person record
let person = new Person({
 name: 'John Doe',
 age: 30,
 favoriteFoods: ['pizza', 'burgers']
});

person.save((err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Create and save multiple person records
let arrayOfPeople = [
 { name: 'Jane Doe', age: 25, favoriteFoods: ['tacos', 'burritos'] },
 { name: 'Joe Smith', age: 40, favoriteFoods: ['steak', 'sushi'] }
];

Person.create(arrayOfPeople, (err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Find a person by name
Person.find({ name: 'Jane Doe' }, (err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Find a person by a food in the favorite foods list
Person.findOne({ favoriteFoods: 'burritos' }, (err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Find a person by _id
Person.findById('personId', (err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Update a person by adding a favorite food
Person.findById('personId', (err, person) => {
 if (err) console.log(err);
 else {
    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) console.log(err);
      else console.log(updatedPerson);
    });
 }
});

// Update a person's age by name
Person.findOneAndUpdate({ name: 'Jane Doe' }, { $set: { age: 20 } }, { new: true }, (err, updatedPerson) => {
 if (err) console.log(err);
 else console.log(updatedPerson);
});

// Delete a person by _id
Person.findByIdAndRemove('personId', (err, deletedPerson) => {
 if (err) console.log(err);
 else console.log(deletedPerson);
});

// Delete all the people whose name is “Mary”
Person.remove({ name: 'Mary' }, (err, data) => {
 if (err) console.log(err);
 else console.log(data);
});

// Find people who like burritos, sort by name, limit to 2, and hide age
Person.find({ favoriteFoods: 'burritos' })
 .sort({ name: 1 })
 .limit(2)
 .select({ age: 0 })
 .exec((err, data) => {
    if (err) console.log(err);
    else console.log(data);
 });