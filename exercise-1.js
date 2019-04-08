const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
    .then(() => console.log("Connect to mongo-exercises db"))
    .catch(err => console.err("Can't connect"))

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})


const Course = mongoose.model("Course", courseSchema)

const getCourse = async () => {
    const courses = await Course.find()
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .sort({ price: -1 })
        .select(["name", "author", "price"])
    console.log(courses)
}

const updateCourse = async () => {
    const result = await Course.findByIdAndUpdate("5caac19ec68031bfba4da649", {
        $set: {
            author: "Meo Pham"
        }
    }, { new: true });

    console.log(result)
}

const deleteCourse = async id => {
    const course = await Course.findByIdAndDelete(id)
    console.log(course)
}

deleteCourse("5caac19ec68031bfba4da64c")