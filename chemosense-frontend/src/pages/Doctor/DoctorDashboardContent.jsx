import { useEffect, useState } from 'react'
import SubHeader from '../../components/Doctor/SubHeader'
import { Users, UserCheck, TrendingUp, Activity } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, getCountFromServer } from "firebase/firestore";

const CountUpAnimation = ({ target, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 1200;
        const stepTime = Math.abs(Math.floor(duration / (target || 1)));
        const timer = setInterval(() => {
            start += 1;
            setCount(prev => {
                if (prev < target) return prev + 1;
                clearInterval(timer);
                return target;
            });
        }, stepTime);
        return () => clearInterval(timer);
    }, [target, isVisible]);

    return <span>{count}</span>;
};


const DoctorDashboardContent = () => {
    const [patientsNo, setPatientsNo] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const getPatientCount = async () => {
        const coll = collection(db, "patients");
        const snapshot = await getCountFromServer(coll);
        return snapshot.data().count;
    };
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const patientCount = await getPatientCount();
                setPatientsNo(patientCount);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching counts:", error);
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);
  return (
    <div>
      <SubHeader stype={"Dashborad"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
                <div className="group relative overflow-hidden transition-transform duration-300 hover:scale-105 shadow-md rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-2xl blur-xl z-0"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 h-64 shadow-xl z-10">
                        <div className="flex items-start justify-between h-full">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">Patients</h3>
                                        <p className="text-sm text-gray-600">Total registered</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm text-emerald-600 font-semibold">All active</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-center h-full">
                                <div className="text-6xl font-bold text-gray-700 mb-2">
                                    {isLoading ? (
                                        <div className="animate-pulse bg-gray-200 h-16 w-20 rounded"></div>
                                    ) : (
                                        <CountUpAnimation target={patientsNo} isVisible={!isLoading} />
                                    )}
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-2 h-8 rounded-full transition-all duration-500 ${i < 3 ? 'bg-emerald-400' : 'bg-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-b-2xl"></div>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default DoctorDashboardContent