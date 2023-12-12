const Task = require("../models/Task")
const User = require("../models/User")

// test ('adding a user' ,async()=>{
//     const r = await User.add(new User({
//         email : "eliels emaaal",
//         u_password : "pass",
//         firstname: "fn",
//         lastname: "ln",
//         u_role : "user"
//     }))

//     console.log(JSON.stringify(r))
// })

// test('trying to fetch user by name and password' , async()=>{
//     const r = await User.getByNameAndPassword('email' , 'pass')
//     console.log(JSON.stringify(r[0]))
//     expect(r)
// })



// test('add user' , async()=>{
//     const r = await User.add({name : "name" , email : "email" ,u_password : "pass" , firstname:"first" ,lastname:"last" ,u_role : "admin"})
//     expect(r)
// })

// test('remove user by id' , async()=>{
//     const r = await User.removeUserById(4)
//     expect(JSON.stringify(r))
// })