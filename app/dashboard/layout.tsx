'use client';

import DashboardLayout from '@/components/DashboardLayout';
import patientData from '@/data/mockPatient.json';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout citations={patientData.citations}>
      {children}
    </DashboardLayout>
  );
}
