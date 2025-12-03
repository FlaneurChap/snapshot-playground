'use client';

import patientData from '@/data/mockPatient.json';
import { AlertCircle, User, Calendar, FileText } from 'lucide-react';
import type { PatientData } from '@/types/patient';

const typedPatientData = patientData as PatientData;

export default function DashboardOverview() {
  const { overview } = typedPatientData;

  const criticalAlerts = [
    { category: 'Cardiovascular', message: 'Likely pathogenic LDLR variant detected - Familial Hypercholesterolemia risk', priority: 'red' },
    { category: 'Pharmacogenomic', message: 'CYP2C19 Poor Metabolizer - Clopidogrel contraindicated', priority: 'red' },
    { category: 'Metabolic', message: 'HbA1c 5.8% - Pre-diabetic range, intervention recommended', priority: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {overview.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{overview.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {overview.age}y, {overview.gender}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  MRN: {overview.mrn}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Last Visit: {new Date(overview.lastVisit).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-300">
            <div className="text-2xl font-bold">{overview.activeAlerts}</div>
            <div className="text-xs font-semibold">Active Alerts</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm font-semibold text-blue-900 mb-1">Referral Reason</div>
          <div className="text-sm text-blue-800">{overview.referralReason}</div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-white p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">High Priority Findings</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Items requiring immediate attention or action
          </p>
        </div>

        <div className="p-4 space-y-3">
          {criticalAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`border-l-4 p-4 rounded-lg ${
                alert.priority === 'red'
                  ? 'border-red-500 bg-red-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{alert.category}</div>
                  <div className="mt-1 text-sm text-gray-700">{alert.message}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  alert.priority === 'red'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.priority === 'red' ? 'CRITICAL' : 'MONITOR'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Cardiovascular Risk</div>
          <div className="mt-2 text-2xl font-bold text-red-600">HIGH</div>
          <div className="mt-1 text-xs text-gray-500">FH + Elevated CAC</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Metabolic Status</div>
          <div className="mt-2 text-2xl font-bold text-yellow-600">WATCH</div>
          <div className="mt-1 text-xs text-gray-500">Pre-diabetic range</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Fitness Level</div>
          <div className="mt-2 text-2xl font-bold text-green-600">EXCELLENT</div>
          <div className="mt-1 text-xs text-gray-500">VO2 Max 42</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm font-medium text-gray-600">Genetic Risks</div>
          <div className="mt-2 text-2xl font-bold text-red-600">2 IDENTIFIED</div>
          <div className="mt-1 text-xs text-gray-500">LDLR, APOE4</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Initiate statin therapy discussion (given FH diagnosis)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Order Lp(a) retest and consider PCSK9 inhibitor
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Refer to cardiology for CAC score 120 management
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Lifestyle intervention for pre-diabetes (nutrition + exercise)
          </li>
        </ul>
      </div>
    </div>
  );
}
