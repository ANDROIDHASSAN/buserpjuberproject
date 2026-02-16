
import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Filter } from 'lucide-react';
import studentService from '../services/studentService';
import routeService from '../services/routeService';
import type { Student, Route } from '../types';
import { useAuth } from '../context/AuthContext';

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: 'Male',
        dateOfBirth: '',
        studentClass: '',
        division: '',
        fatherName: '',
        motherName: '',
        primaryPhoneNumber: '',
        address: '',
        routeId: '',
        stopName: ''
    });

    useEffect(() => {
        fetchStudents();
        fetchRoutes();
    }, []);

    const fetchStudents = async () => {
        if (user?.token) {
            const data = await studentService.getStudents(user.token);
            setStudents(data);
        }
    };

    const fetchRoutes = async () => {
        if (user?.token) {
            const data = await routeService.getRoutes(user.token);
            setRoutes(data);
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?') && user?.token) {
            await studentService.deleteStudent(id, user.token);
            fetchStudents();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.token) {
            await studentService.createStudent(formData, user.token);
            setIsModalOpen(false);
            // Reset form (simplified)
            setFormData({
                firstName: '', lastName: '', gender: 'Male', dateOfBirth: '',
                studentClass: '', division: '', fatherName: '', motherName: '',
                primaryPhoneNumber: '', address: '', routeId: '', stopName: ''
            });
            fetchStudents();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add Student
                </button>
            </div>

            {/* Filters & Search - Placeholder */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search by name, roll no, or parent mobile..." />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50">
                    <Filter size={20} />
                    Filter
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Student Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Class</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Parent & Mobile</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Route</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No students found. Add one to get started.
                                </td>
                            </tr>
                        ) : students.map((student) => (
                            <tr key={student._id} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{student.firstName} {student.lastName}</div>
                                    <div className="text-xs text-slate-500">{student._id.slice(-6).toUpperCase()}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{student.class} - {student.division || 'A'}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-slate-900">{student.family?.fatherName}</div>
                                    <div className="text-xs text-slate-500">{student.family?.primaryPhoneNumber}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {typeof student.route === 'object' && student.route ? (
                                        <span className="bg-sky-50 text-sky-700 px-2 py-1 rounded-md text-sm font-medium">
                                            {(student.route as Route).name}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400 italic">No Route</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {student.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
                        <h2 className="text-xl font-bold mb-6 border-b pb-4">Add New Student</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 bg-slate-50 p-2 rounded-md">1. Personal Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="First Name" className="input-field" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                    <input required placeholder="Last Name" className="input-field" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                    <select className="input-field" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <input required type="date" className="input-field" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} />
                                    <input required placeholder="Class (e.g. 5)" className="input-field" value={formData.studentClass} onChange={e => setFormData({ ...formData, studentClass: e.target.value })} />
                                    <input placeholder="Division (e.g. A)" className="input-field" value={formData.division} onChange={e => setFormData({ ...formData, division: e.target.value })} />
                                </div>
                            </div>

                            {/* Family Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 bg-slate-50 p-2 rounded-md">2. Family & Contact</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="Father's Name" className="input-field" value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} />
                                    <input placeholder="Mother's Name" className="input-field" value={formData.motherName} onChange={e => setFormData({ ...formData, motherName: e.target.value })} />
                                    <input required placeholder="Primary Mobile (Login ID)" className="input-field col-span-2" value={formData.primaryPhoneNumber} onChange={e => setFormData({ ...formData, primaryPhoneNumber: e.target.value })} />
                                    <textarea required placeholder="Home Address" className="input-field col-span-2 h-20" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>

                            {/* Route assignment */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 bg-slate-50 p-2 rounded-md">3. Transportation</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="input-field" value={formData.routeId} onChange={e => setFormData({ ...formData, routeId: e.target.value })}>
                                        <option value="">Select Route</option>
                                        {routes.map(r => (
                                            <option key={r._id} value={r._id}>{r.name}</option>
                                        ))}
                                    </select>
                                    <input placeholder="Pickup Stop Name" className="input-field" value={formData.stopName} onChange={e => setFormData({ ...formData, stopName: e.target.value })} />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium"
                                >
                                    Save Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        .input-field {
            width: 100%;
            padding: 0.5rem 1rem;
            border: 1px solid #cbd5e1; /* slate-300 */
            border-radius: 0.5rem;
            outline: none;
            transition: all 0.2s;
        }
        .input-field:focus {
            border-color: #0ea5e9; /* sky-500 */
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
        }
      `}</style>
        </div>
    );
};

export default Students;
