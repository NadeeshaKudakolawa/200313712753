import { useEffect, useState } from "react";

import NominationForm from "./components/NominationForm";
import NominationList from "./components/NominationList";
import OfficerForm from "./components/OfficerForm";
import ProgramForm from "./components/ProgramForm";
import EligibilityRuleForm from "./components/EligibilityRuleForm";

import {
  getDepartments,
  getOfficers,
  getPrograms,
  getNominations,
  cancelNomination,
} from "./services/api";

import type {
  Department,
  Officer,
  TrainingProgram,
  NominationResponse,
} from "./types/types";

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [nominations, setNominations] = useState<NominationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Active tab
  const [activeTab, setActiveTab] = useState("nominations");

  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  const loadData = async () => {
    try {
      const departmentsData = await getDepartments();
      const officersData = await getOfficers();
      const programsData = await getPrograms();
      const nominationsData = await getNominations();

      setDepartments(departmentsData);
      setOfficers(officersData);
      setPrograms(programsData);
      setNominations(nominationsData);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // CANCEL NOMINATION
  // ==========================================

  const handleCancel = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this nomination?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelNomination(id);
      await loadData();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to cancel nomination."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ======================================
          HEADER
      ======================================= */}

      <header className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold">
            Training Management System
          </h1>

          <p className="text-blue-100 mt-1">
            Training Programme Nomination Management
          </p>
        </div>
      </header>

      {/* ======================================
          TABS
      ======================================= */}

      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">

            {/* NOMINATIONS */}

            <button
              onClick={() => setActiveTab("nominations")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "nominations"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Nominations
            </button>

            {/* REGISTER OFFICER */}

            <button
              onClick={() => setActiveTab("officers")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "officers"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Register Officer
            </button>

            {/* CREATE PROGRAMME */}

            <button
              onClick={() => setActiveTab("programs")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "programs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Create Programme
            </button>

            {/* ELIGIBILITY RULES */}

            <button
              onClick={() => setActiveTab("eligibility")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "eligibility"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Eligibility Rules
            </button>

          </div>
        </div>
      </div>

      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ====================================
            NOMINATIONS TAB
        ===================================== */}

        {activeTab === "nominations" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* NOMINATION FORM */}

            <div>
              <NominationForm
                departments={departments}
                officers={officers}
                programs={programs}
                onSuccess={loadData}
              />
            </div>

            {/* NOMINATION LIST */}

            <div className="lg:col-span-2">
              <NominationList
                nominations={nominations}
                onCancel={handleCancel}
              />
            </div>

          </div>
        )}

        {/* ====================================
            REGISTER OFFICER TAB
        ===================================== */}

        {activeTab === "officers" && (
          <div className="max-w-md">
            <OfficerForm
              departments={departments}
              onSuccess={loadData}
            />
          </div>
        )}

        {/* ====================================
            CREATE PROGRAMME TAB
        ===================================== */}

        {activeTab === "programs" && (
          <div className="max-w-md">
            <ProgramForm onSuccess={loadData} />
          </div>
        )}

        {/* ====================================
            ELIGIBILITY RULES TAB
        ===================================== */}

        {activeTab === "eligibility" && (
          <div className="max-w-md">
            <EligibilityRuleForm
              programs={programs}
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;