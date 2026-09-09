import { useState } from "react";

import { createProgram } from "../services/api";

interface Props {
  onSuccess: () => void;
}

function ProgramForm({ onSuccess }: Props) {

  const [title, setTitle] =
    useState("");

  const [trainingDate, setTrainingDate] =
    useState("");

  const [venue, setVenue] =
    useState("");

  const [maximumParticipants, setMaximumParticipants] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!title || !trainingDate || !venue || !maximumParticipants) {

      setError(
        "All fields are required."
      );

      return;
    }

    const capacity = Number(maximumParticipants);

    if (isNaN(capacity) || capacity < 1) {

      setError(
        "Maximum participants must be at least 1."
      );

      return;
    }

    try {

      const result = await createProgram(
        title,
        trainingDate,
        venue,
        capacity
      );

      setMessage(
        `Programme "${result.title}" created successfully.`
      );

      setTitle("");
      setTrainingDate("");
      setVenue("");
      setMaximumParticipants("");

      onSuccess();

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Unable to create training programme."
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Create Training Programme
      </h2>

      <div className="space-y-4">

        <div>

          <label className="block text-sm font-medium mb-1">
            Programme Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Leadership Development"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Training Date
          </label>

          <input
            type="date"
            value={trainingDate}
            onChange={(e) =>
              setTrainingDate(e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Venue
          </label>

          <input
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            placeholder="Colombo Training Centre"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Maximum Participants
          </label>

          <input
            type="number"
            min="1"
            value={maximumParticipants}
            onChange={(e) =>
              setMaximumParticipants(e.target.value)
            }
            placeholder="40"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg">
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Programme
        </button>

      </div>

    </div>
  );
}

export default ProgramForm;