const AsyncQuery = require("../repository/db")

//directly accesses database by SQL queries and a helper promise called AsyncQuery

const User = function (user) {
    this.name = user.name
    this.email = user.email
    this.u_password = user.u_password
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.u_role = user.u_role
}

User.getAll = async () => {
    try {
        const r = AsyncQuery('SELECT * FROM users;')
        return r
    } catch (error) {
        throw error
    }
}

User.getByEmailAndPassword = async (email, password) => {
    try {
        const r = await AsyncQuery(`SELECT * FROM users WHERE email = "${email}" AND u_password= "${password}";`)
        if (r.length == 0) { throw new Error('USER_NOT_FOUND') }
        return r[0]
    } catch (error) {
        throw error
    }
}

User.removeUserById = async (uid) => {
    try {
        const r = await AsyncQuery(`DELETE FROM users WHERE uid = ${uid};`)
        if (r.affectedRows === 0) { throw new Error('NO_USER_DELETED') }
        return true
    } catch (error) {
        throw error
    }
}

User.getByUid = async (uid) => {
    try {
        const r = await AsyncQuery(`select * from users WHERE uid = ${uid};`)
        if (r.length == 0) { throw new Error('USER_NOT_FOUND') }
        return r[0]
    } catch (error) {
        throw error
    }
}

User.add = async (user) => {
    try {
        const r = await AsyncQuery(`
        INSERT INTO users (email , u_password, firstname , lastname, u_role) 
        VALUES ("${user.email}" , "${user.u_password}" , "${user.firstname}" , "${user.lastname}" , "${user.u_role}");`)

        if (r.affectedRows == 0) { throw new Error('USER_NOT_ADDED') }

        const userAdded = await User.getByUid(r.insertId)
        return userAdded
    } catch (error) {
        throw error
    }
}

User.editByUid = async (user)=>{
    try {
         const result = await AsyncQuery(`update users set firstName = "${user.firstname}", lastname = "${user.lastname}", u_password = "${user.u_password}" where uid=${user.uid} ;`)
         if(result.affectedRows == 0) {throw new Error('USER_NOT_UPDATED')}
         return result
    } catch (error) {
        throw new Error('CANT_UPDATE')
    }

}

module.exports = User