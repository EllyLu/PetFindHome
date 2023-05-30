const students = [
    {
        "name":"Wendy",
        "age":"22"
    },
    {
        "name":"Aeet",
        "age":"15"
    }
]

students.forEach((student) => {
    student.nameAge = student.name
})

console.log(students);