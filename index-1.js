const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    .then(() => console.log("Connect to mongodb"))
    .catch(err => console.err("Can't connect"))

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    author: String,
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema)

const createCourse = async () => {
    const newCourse = new Course({
        tags: ["js", "frontend"],
        name: "Introduction to javascript",
        author: "Trang Pham",
        isPublished: true
    })
    const saveResult = await newCourse.save()
    console.log(saveResult)
}

const getCourses = async () => {
    const courses = await Course.find({
    }).limit(3)
        .sort({ name: 1 })
        .select(["name", "tags"]);
    console.log(courses)
}

getCourses()