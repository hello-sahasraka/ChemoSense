import { db } from '../../firebase'; // Adjust the path to your firebase.ts file
import { collection, getDocs } from 'firebase/firestore';

export type Appointment = {
    id: string;
    date: string;
    patientId: string;
    patientName: string;
    task: string;
    time: string;
};

export const getAppointments = async (): Promise<Appointment[]> => {
    const appointmentsCollection = collection(db, 'appointments');
    const appointmentSnapshot = await getDocs(appointmentsCollection);
    const appointmentList = appointmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Appointment[];
    return appointmentList;
};
