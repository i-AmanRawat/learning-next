import mongoose from "mongoose";

export default async function connect() {}
try {
  mongoose.connect(process.env.MONGO_URL!, {
    dbName: "test",
  }); //non-null assertion operator #!
  const connection = mongoose.connection;
  connection.on("connect", () => {
    console.log("Mongodb connected successfully!");
  });
  connection.on("error", (error) => {
    console.log(
      "Mongodb connection error. Make sure Mongodb is running",
      error
    );
    process.exit();
  });
} catch (error) {
  console.log("something went wrong");
  console.log(error);
}
