import { useEffect, useState } from "react";

import NominationForm from "./components/NominationForm";
import NominationList from "./components/NominationList";

import {
  getOfficers,
  getPrograms,
  getNominations,
} from "./services/api";

import type {
  Officer,
  TrainingProgram,
  NominationResponse,
} from "./types/types";

function App() {

  const [officers, setOfficers] = useState<Officer[]>([]);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [nominations, setNominations] = useState<NominationResponse[]>([]);

  const loadData = async () => {

    const officersData = await getOfficers();
    const programsData = await getPrograms();
    const nominationsData = await getNominations();

    setOfficers(officersData);
    setPrograms(programsData);
    setNominations(nominationsData);
  };

  useEffect(() => {

    loadData();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <header className="bg-blue-700 text-white">

        <div className="max-w-6xl mx-auto px-6 py-5">

          <h1 className="text-2xl font-bold">
            Government Training Management System
          </h1>

          <p className="text-blue-100">
            Training Programme Nomination Management
          </p>

        </div>

      </header>

      {/* Main */}

      <main className="max-w-6xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}

          <div className="lg:col-span-1">

            <NominationForm
              officers={officers}
              programs={programs}
              onSuccess={loadData}
            />

          </div>

          {/* List */}

          <div className="lg:col-span-2">

            <NominationList
              nominations={nominations}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;