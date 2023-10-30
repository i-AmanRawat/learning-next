export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1>Profile</h1>
      <br />
      <p>
        profile ID{" "}
        <span className=" bg-orange-600 px-4 py-2 rounded-md text-white hover:bg-orange-400">
          {params.id}
        </span>
      </p>
    </div>
  );
}
