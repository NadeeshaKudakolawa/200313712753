import { useEffect, useState } from "react";

import NominationForm from "./components/NominationForm";
import NominationList from "./components/NominationList";

import {
  getOfficers,
  getPrograms,
  getNominations,
  cancelNomination,
} from "./services/api";

import type {
  Officer,
  TrainingProgram,
  NominationResponse,
} from "./types/types";

function App() {

  const [officers, setOfficers] =
    useState<Officer[]>([]);

  const [programs, setPrograms] =
    useState<TrainingProgram[]>([]);

  const [nominations, setNominations] =
    useState<NominationResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadData = async () => {

    try {

      const officersData =
        await getOfficers();

      const programsData =
        await getPrograms();

      const nominationsData =
        await getNominations();

      setOfficers(officersData);
      setPrograms(programsData);
      setNominations(nominationsData);

    } catch (error) {

      console.error(
        "Failed to load data",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadData();

  }, []);

  const handleCancel = async (id: number) => {

    const confirmed =
      window.confirm(
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

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-600">
          Loading...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="bg-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <h1 className="text-2xl font-bold">
            Government Training Management System
          </h1>

          <p className="text-blue-100 mt-1">
            Training Programme Nomination Management
          </p>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* PROGRAMME INFORMATION */}

        {programs.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-lg font-bold">
              {programs[0].title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

              <div>

                <p className="text-sm text-gray-500">
                  Training Date
                </p>

                <p className="font-medium">
                  {programs[0].trainingDate}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Venue
                </p>

                <p className="font-medium">
                  {programs[0].venue}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Maximum Participants
                </p>

                <p className="font-medium">
                  {programs[0].maximumParticipants}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* FORM */}

          <div>

            <NominationForm
              officers={officers}
              programs={programs}
              onSuccess={loadData}
            />

          </div>

          {/* LIST */}

          <div className="lg:col-span-2">

            <NominationList
              nominations={nominations}
              onCancel={handleCancel}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;