'use client';

import DashboardLayout from '@/components/DashboardLayout';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout citations={typedPatientData.citations}>
      {children}
    </DashboardLayout>
  );
}
