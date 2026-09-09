import { useState } from "react";

import type {
  Department,
  Officer,
  TrainingProgram,
} from "../types/types";

import { createNomination } from "../services/api";

interface Props {
  departments: Department[];
  officers: Officer[];
  programs: TrainingProgram[];
  onSuccess: () => void;
}

function NominationForm({
  departments,
  officers,
  programs,
  onSuccess,
}: Props) {

  const [programId, setProgramId] = useState("");
  const [officerId, setOfficerId] = useState("");
  const [nominatingDepartmentId, setNominatingDepartmentId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Find the selected officer to display their info
  const selectedOfficer = officers.find(
    (officer) =>
      officer.id === Number(officerId)
  );

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!programId || !officerId || !nominatingDepartmentId) {

      setError(
        "Please select a training programme, officer, and nominating department."
      );

      return;
    }

    try {

      const result = await createNomination(
        Number(programId),
        Number(officerId),
        Number(nominatingDepartmentId)
      );

      setMessage(
        `Nomination successful! ${result.registrationNumber} - Status: ${result.status}`
      );

      setProgramId("");
      setOfficerId("");
      setNominatingDepartmentId("");

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

      {/* OFFICER INFO (read-only display) */}

      {selectedOfficer && (

        <div className="mb-5 bg-gray-50 rounded-lg p-3 text-sm">

          <p className="text-gray-500 text-xs mb-1 font-medium uppercase">
            Selected Officer Info
          </p>

          <p className="text-gray-800">
            <span className="font-medium">Service No:</span>{" "}
            {selectedOfficer.serviceNumber}
          </p>

          <p className="text-gray-800">
            <span className="font-medium">Name:</span>{" "}
            {selectedOfficer.name}
          </p>

          <p className="text-gray-800">
            <span className="font-medium">Officer's Department:</span>{" "}
            {selectedOfficer.department.name}
          </p>

        </div>

      )}

      {/* NOMINATING DEPARTMENT */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Nominating Department
        </label>

        <select
          value={nominatingDepartmentId}
          onChange={(e) =>
            setNominatingDepartmentId(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >

          <option value="">
            Select nominating department
          </option>

          {departments.map((dept) => (

            <option
              key={dept.id}
              value={dept.id}
            >
              {dept.name}
            </option>

          ))}

        </select>

        <p className="text-xs text-gray-400 mt-1">
          The department making this nomination (may differ from officer's department)
        </p>

      </div>

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