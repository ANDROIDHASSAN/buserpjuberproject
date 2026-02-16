
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const Family = require('../models/Family');
const Route = require('../models/Route');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({})
        .populate('family')
        .populate('route', 'name');
    res.json(students);
});

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)
        .populate('family')
        .populate('route');

    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

// @desc    Create a student (and family if needed)
// @route   POST /api/students
// @access  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, gender, dateOfBirth,
        studentClass, division, rollNumber, bloodGroup,
        fatherName, motherName, primaryPhoneNumber, address,
        routeId, stopName
    } = req.body;

    // 1. Check/Create Family
    let family = await Family.findOne({ primaryPhoneNumber });

    if (!family) {
        // Create new family
        family = await Family.create({
            fatherName,
            motherName,
            primaryPhoneNumber,
            address
        });
    }

    // 2. Create Student
    const student = await Student.create({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        class: studentClass,
        division,
        rollNumber,
        bloodGroup,
        family: family._id,
        route: routeId || null,
        stop: stopName || null
    });

    // 3. Update Family with Student ID
    family.students.push(student._id);
    await family.save();

    res.status(201).json(student);
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {
        student.firstName = req.body.firstName || student.firstName;
        student.lastName = req.body.lastName || student.lastName;
        student.class = req.body.class || student.class;
        student.route = req.body.routeId || student.route;
        student.status = req.body.status || student.status;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

// @desc    Delete student (Archive)
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {
        student.status = 'archived';
        await student.save();
        res.json({ message: 'Student archived' });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
