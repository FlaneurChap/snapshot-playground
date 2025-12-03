'use client';

import MobileDashboardLayout from '@/components/dashboard/MobileDashboardLayout';
import patientData from '@/data/mockPatient.json';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MobileDashboardLayout citations={typedPatientData.citations}>
      {children}
    </MobileDashboardLayout>
  );
}
