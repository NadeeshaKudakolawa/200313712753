import { useEffect, useState } from "react";

import type { TrainingProgram } from "../types/types";

import {
  createEligibilityRule,
  deleteEligibilityRule,
  getEligibilityRules,
} from "../services/api";

interface Rule {
  id: number;
  ruleType: string;
  ruleValue: string;
}

interface Props {
  programs: TrainingProgram[];
}

function EligibilityRuleForm({ programs }: Props) {

  const [programId, setProgramId] = useState("");

  const [ruleType, setRuleType] =
    useState("PROGRAM_DEPARTMENT");

  const [ruleValue, setRuleValue] =
    useState("");

  const [rules, setRules] =
    useState<Rule[]>([]);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const loadRules = async () => {

    if (!programId) {
      setRules([]);
      return;
    }

    try {

      const result =
        await getEligibilityRules(
          Number(programId)
        );

      setRules(result);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load eligibility rules."
      );
    }
  };

  useEffect(() => {

    loadRules();

  }, [programId]);

  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (!programId || !ruleType || !ruleValue) {

      setError(
        "Please select a programme and enter a rule value."
      );

      return;
    }

    try {

      await createEligibilityRule(
        Number(programId),
        ruleType,
        ruleValue
      );

      setMessage(
        "Eligibility rule added successfully."
      );

      setRuleValue("");

      await loadRules();

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Unable to create eligibility rule."
      );
    }
  };

  const handleDelete = async (
    id: number
  ) => {

    try {

      await deleteEligibilityRule(id);

      await loadRules();

    } catch (error) {

      setError(
        "Unable to delete eligibility rule."
      );
    }
  };

  const getRuleLabel = (
    ruleType: string
  ) => {

    if (ruleType === "PROGRAM_DEPARTMENT") {
      return "Department";
    }

    if (ruleType === "REQUIRED_GRADE") {
      return "Grade";
    }

    if (ruleType === "MIN_SERVICE_YEARS") {
      return "Minimum Service Years";
    }

    if (ruleType === "PREVENT_REPEAT") {
      return "Prevent Repeat";
    }

    return ruleType;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Eligibility Rules
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

      {/* RULE TYPE */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Rule Type
        </label>

        <select
          value={ruleType}
          onChange={(e) =>
            setRuleType(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >

          <option value="PROGRAM_DEPARTMENT">
            Programme Department
          </option>

          <option value="REQUIRED_GRADE">
            Required Grade / Designation
          </option>

          <option value="MIN_SERVICE_YEARS">
            Minimum Service Years
          </option>

          <option value="PREVENT_REPEAT">
            Prevent Repeat
          </option>

        </select>

      </div>

      {/* VALUE */}

      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Rule Value
        </label>

        <input
          value={ruleValue}
          onChange={(e) =>
            setRuleValue(e.target.value)
          }
          placeholder={
            ruleType === "PROGRAM_DEPARTMENT"
              ? "Finance"
              : ruleType === "REQUIRED_GRADE"
              ? "Senior Officer"
              : ruleType === "MIN_SERVICE_YEARS"
              ? "5"
              : "12"
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />

        {ruleType === "PREVENT_REPEAT" && (

          <p className="text-xs text-gray-400 mt-1">
            Enter number of months, for example 12.
          </p>

        )}

      </div>

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>

      )}

      {/* SUCCESS */}

      {message && (

        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {message}
        </div>

      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Eligibility Rule
      </button>

      {/* EXISTING RULES */}

      {programId && (

        <div className="mt-8">

          <h3 className="font-semibold mb-3">
            Current Rules
          </h3>

          {rules.length === 0 ? (

            <p className="text-sm text-gray-500">
              No eligibility rules configured.
            </p>

          ) : (

            <div className="space-y-2">

              {rules.map((rule) => (

                <div
                  key={rule.id}
                  className="flex justify-between items-center border rounded-lg p-3"
                >

                  <div>

                    <p className="text-sm font-medium">
                      {getRuleLabel(rule.ruleType)}
                    </p>

                    <p className="text-sm text-gray-600">
                      {rule.ruleValue}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(rule.id)
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default EligibilityRuleForm;