
import { useState, useEffect } from 'react';
import { CreditCard, Search, Filter, CheckCircle, AlertCircle } from 'lucide-react';
import studentService from '../services/studentService';
import feeService from '../services/feeService';
import type { Student } from '../types';
import { useAuth } from '../context/AuthContext';

const Fees = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [mode, setMode] = useState<string>('Cash');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        if (user?.token) {
            const data = await studentService.getStudents(user.token);
            setStudents(data);
        }
    };

    const handlePayClick = (student: Student) => {
        setSelectedStudent(student);
        setAmount('');
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.token && selectedStudent) {
            await feeService.recordPayment({
                studentId: selectedStudent._id,
                amount: Number(amount),
                mode,
                remarks
            }, user.token);
            setIsModalOpen(false);
            fetchStudents(); // Refresh to update balance
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Fee Collection</h1>
                <div className="flex gap-2">
                    <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium text-sm">
                        Total Collected: ₹0 (Demo)
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search student..." />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50">
                    <Filter size={20} />
                    Pending Only
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Student</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Class</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Monthly Fee</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Balance Due</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{student.firstName} {student.lastName}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{student.class}-{student.division}</td>
                                <td className="px-6 py-4 text-slate-600">₹{student.fees?.monthlyAmount || 1500}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">₹{student.fees?.balance || 0}</td>
                                <td className="px-6 py-4">
                                    {(student.fees?.balance || 0) <= 0 ? (
                                        <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-1 rounded-full w-fit">
                                            <CheckCircle size={14} /> Paid
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-amber-600 font-medium text-xs bg-amber-50 px-2 py-1 rounded-full w-fit">
                                            <AlertCircle size={14} /> Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handlePayClick(student)}
                                        className="text-sky-600 hover:text-sky-800 font-medium text-sm flex items-center gap-1"
                                    >
                                        <CreditCard size={16} /> Pay
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Record Payment</h2>
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <div className="text-sm text-slate-500">Student</div>
                            <div className="font-semibold">{selectedStudent.firstName} {selectedStudent.lastName}</div>
                            <div className="flex justify-between mt-2 text-sm">
                                <span>Current Balance:</span>
                                <span className={selectedStudent.fees?.balance && selectedStudent.fees.balance > 0 ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>
                                    ₹{selectedStudent.fees?.balance || 0}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none text-lg font-semibold"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Online">Online Transfer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks (Optional)</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="Transaction ID, Cheque No..."
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                                >
                                    Confirm Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fees;
