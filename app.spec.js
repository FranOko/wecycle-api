var frisby = require('frisby');


frisby.create('testing a simple api')
    .get('http://localhost:5000/')
    .expectStatus(200)
.toss();

//testing post items
frisby.create('testing post items')
    .post('http://localhost:5000/items/', {
      name: 'Bilal',
      description: 'name',
      url:'ww.google.com'
      
    }, {json: true})
    .expectHeaderContains('Content-Type', 'json')
.toss();

//testing post users
frisby.create('Post users')
    .post('http://localhost:5000/users/', {
     email: 'samiullb@uni.coventry.ac.uk',
     password: 'happy',
     phone_number: '07724589422',
     name:'Bilal'
      
    }, {json: true})
    .expectHeaderContains('Content-Type', 'json')
.toss();

//testing get user and items
frisby.create('gets the users and items')
  .get('http://localhost:5000/users/5501d0c6645f9cb101f22264/items')
  .expectHeaderContains('Content-Type', 'json')
.toss();

//testing users, user id and items
frisby.create('gets the users, user_id and items')
  .get('http://localhost:5000/users/5501d0c6645f9cb101f22264/items')
  .expectHeaderContains('Content-Type', 'json')
.toss()

//testing getting users
frisby.create('gets the users')
  .get('http://localhost:5000/users/5501d03a645f9cb101f22262')
    .expectHeaderContains('Content-Type', 'json')
.toss();

//testing put items
frisby.create('Put items')
    .put('http://localhost:5000/items/', {
     name: 'bookShelf',
      description: 'for books',
      url: 'www.google.com'
      
    }, {json: true})
    .expectHeaderContains('Content-Type', 'json')
.toss();

//testing delete
frisby.create('delete item')
  .delete('http://localhost:5000/items/5501d8105434c7d2018b7279')
    .expectHeaderContains('Content-Type', 'json')
.toss();

