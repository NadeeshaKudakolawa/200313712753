import { useState } from "react";

import type {
  Officer,
  TrainingProgram,
} from "../types/types";

import { createNomination } from "../services/api";

interface Props {
  officers: Officer[];
  programs: TrainingProgram[];
  onSuccess: () => void;
}

function NominationForm({
  officers,
  programs,
  onSuccess,
}: Props) {

  const [programId, setProgramId] = useState("");
  const [officerId, setOfficerId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedOfficer = officers.find(
    (officer) =>
      officer.id === Number(officerId)
  );

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!programId || !officerId) {

      setError(
        "Please select a training programme and officer."
      );

      return;
    }

    if (!selectedOfficer) {

      setError("Officer not found.");

      return;
    }

    try {

      const result = await createNomination(
        Number(programId),
        Number(officerId),
        selectedOfficer.department.id
      );

      setMessage(
        `Nomination successful! ${result.registrationNumber} - ${result.status}`
      );

      setProgramId("");
      setOfficerId("");

      onSuccess();

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Unable to create nomination."
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        New Nomination
      </h2>

      {/* PROGRAMME */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Training Programme
        </label>

        <select
          value={programId}
          onChange={(e) =>
            setProgramId(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >

          <option value="">
            Select programme
          </option>

          {programs.map((program) => (

            <option
              key={program.id}
              value={program.id}
            >
              {program.title}
            </option>

          ))}

        </select>

      </div>

      {/* OFFICER */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Officer
        </label>

        <select
          value={officerId}
          onChange={(e) =>
            setOfficerId(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >

          <option value="">
            Select officer
          </option>

          {officers.map((officer) => (

            <option
              key={officer.id}
              value={officer.id}
            >
              {officer.serviceNumber} - {officer.name}
            </option>

          ))}

        </select>

      </div>

      {/* DEPARTMENT */}

      {selectedOfficer && (

        <div className="mb-5">

          <label className="block text-sm font-medium mb-2">
            Department
          </label>

          <div className="bg-gray-100 rounded-lg px-3 py-2">
            {selectedOfficer.department.name}
          </div>

        </div>

      )}

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4">
          {error}
        </div>

      )}

      {/* SUCCESS */}

      {message && (

        <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-4">
          {message}
        </div>

      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
      >
        Submit Nomination
      </button>

    </div>
  );
}

export default NominationForm;