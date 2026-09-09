import { useState } from "react";

import type { Department } from "../types/types";

import { createOfficer } from "../services/api";

interface Props {
  departments: Department[];
  onSuccess: () => void;
}

function OfficerForm({ departments, onSuccess }: Props) {

  const [serviceNumber, setServiceNumber] =
    useState("");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [departmentId, setDepartmentId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!serviceNumber || !name || !departmentId) {

      setError(
        "Service number, name, and department are required."
      );

      return;
    }

    try {

      await createOfficer(
        serviceNumber,
        name,
        email,
        Number(departmentId)
      );

      setMessage(
        "Officer registered successfully."
      );

      setServiceNumber("");
      setName("");
      setEmail("");
      setDepartmentId("");

      onSuccess();

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Unable to register officer."
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Register Officer
      </h2>

      <div className="space-y-4">

        <div>

          <label className="block text-sm font-medium mb-1">
            Service Number
          </label>

          <input
            value={serviceNumber}
            onChange={(e) =>
              setServiceNumber(e.target.value)
            }
            placeholder="OFF005"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Officer Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="E. Silva"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="esilva@gov.lk"
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        <div>

          <label className="block text-sm font-medium mb-1">
            Officer's Department
          </label>

          <select
            value={departmentId}
            onChange={(e) =>
              setDepartmentId(e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              Select department
            </option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}

          </select>

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
          Register Officer
        </button>

      </div>

    </div>
  );
}

export default OfficerForm;