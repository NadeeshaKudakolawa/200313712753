import { useState } from "react";
import { Officer, TrainingProgram } from "../types/types";
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

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!programId || !officerId) {
      setError("Please select a programme and officer.");
      return;
    }

    const officer = officers.find(
      (item) => item.id === Number(officerId)
    );

    if (!officer) {
      setError("Officer not found.");
      return;
    }

    try {

      const result = await createNomination(
        Number(programId),
        Number(officerId),
        officer.department.id
      );

      setMessage(
        `Nomination successful! Registration: ${result.registrationNumber}`
      );

      setProgramId("");
      setOfficerId("");

      onSuccess();

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Officer is already nominated for this programme."
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Create Nomination
      </h2>

      {/* Programme */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Training Programme
        </label>

        <select
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
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

      {/* Officer */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Officer
        </label>

        <select
          value={officerId}
          onChange={(e) => setOfficerId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
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

      {/* Department */}

      {officerId && (

        <div className="mb-5">

          <label className="block text-sm font-medium mb-2">
            Department
          </label>

          <div className="bg-gray-100 rounded-lg px-3 py-2">
            {
              officers.find(
                (item) => item.id === Number(officerId)
              )?.department.name
            }
          </div>

        </div>

      )}

      {/* Error */}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Success */}

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4">
          {message}
        </div>
      )}

      {/* Button */}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Nominate Officer
      </button>

    </div>
  );
}

export default NominationForm;