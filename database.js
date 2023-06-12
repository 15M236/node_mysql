import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host : process.env.HOST ,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}).promise()

export async function getNotes(){
    const [result] = await pool.query(`SELECT * FROM notes`)
    return result
}

export async function getNote(id){
    const [result] = await pool.query(
        `SELECT * 
        FROM notes
        WHERE id = ?`
        ,[id])
    return result[0]
}

export async function createNote(title,contents) {
    const result = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)`,[title,contents])
    const id = result.insertId
    return getNote(id)
}


