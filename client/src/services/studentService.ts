
import axios from '../utils/axios';
// import type { Student } from '../types';

const API_URL = '/students/';

const getStudents = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createStudent = async (studentData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, studentData, config);
    return response.data;
};

const deleteStudent = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const studentService = {
    getStudents,
    createStudent,
    deleteStudent,
};

export default studentService;
