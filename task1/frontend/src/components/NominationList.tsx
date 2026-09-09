import type { NominationResponse } from "../types/types";

interface Props {
  nominations: NominationResponse[];
  onCancel: (id: number) => void;
}

function NominationList({ nominations, onCancel }: Props) {

  // Return badge style based on status
  const getStatusStyle = (status: string) => {

    if (status === "CONFIRMED") {
      return "bg-green-100 text-green-700";
    }

    if (status === "WAITING") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "CANCELLED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Nominations
      </h2>

      {nominations.length === 0 && (

        <p className="text-gray-500 text-center py-8">
          No nominations yet.
        </p>

      )}

      <div className="space-y-4">

        {nominations.map((nomination) => (

          <div
            key={nomination.id}
            className="border border-gray-200 rounded-lg p-4"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="font-semibold text-gray-800">
                  {nomination.officerName}
                </p>

                <p className="text-sm text-gray-500">
                  Service No: {nomination.serviceNumber}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {nomination.programTitle}
                </p>

                <p className="text-sm text-gray-500">
                  Nominating Department: {nomination.departmentName}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Reg: {nomination.registrationNumber}
                </p>

                <p className="text-xs text-gray-400">
                  Nominated:{" "}
                  {new Date(nomination.nominatedAt).toLocaleString()}
                </p>

              </div>

              <div className="flex flex-col items-end gap-2">

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(
                    nomination.status
                  )}`}
                >
                  {nomination.status}
                </span>

                {nomination.status !== "CANCELLED" && (

                  <button
                    onClick={() => onCancel(nomination.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NominationList;