
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'driver' | 'parent';
    token?: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}

export interface Family {
    _id: string;
    fatherName: string;
    motherName?: string;
    primaryPhoneNumber: string;
    secondaryPhoneNumber?: string;
    email?: string;
    address: string;
    students?: Student[];
    createdAt: string;
    updatedAt: string;
}

export interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    class: string;
    division?: string;
    rollNumber?: string;
    bloodGroup?: string;
    family: Family;
    route?: Route | string;
    stop?: string;
    fees?: {
        monthlyAmount: number;
        balance: number;
        lastPaymentDate?: string;
    };
    status: 'active' | 'archived' | 'left';
    photoUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Driver {
    _id: string;
    name: string;
    phone: string;
    licenseNumber: string;
    upiId?: string;
    photoUrl?: string;
    status: 'active' | 'inactive' | 'on_leave';
    createdAt: string;
    updatedAt: string;
}

export interface Route {
    _id: string;
    name: string;
    startPoint: string;
    endPoint: string;
    stops: { name: string; order: number }[];
    capacity: number;
    driver?: Driver | string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface Payment {
    _id: string;
    student: Student | string;
    amount: number;
    mode: 'Cash' | 'UPI' | 'Cheque' | 'Online';
    date: string;
    receiptNumber: string;
    remarks?: string;
    recordedBy?: string;
}
