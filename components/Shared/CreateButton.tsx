export default function CreateButton({
  setStatus,
}: {
  setStatus: Function;
}) {
  return (
    <div className="bg-gray-500 border-black border rounded-lg m-4 p-4 h-40 shadow-xl flex flex-col hover:bg-gray-400">
      <button
        onClick={() => {
          setStatus(true);
        }}
        className="flex flex-col justify-center h-full items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="flex">Create</h1>
      </button>
    </div>
  );
}
