import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { connectToDatabase, disconnectFromDatabase } from "./config/mongodb";
import { connectToPrisma, disconnectFromPrisma } from "./config/prisma";
import RabbitMQUtil from "./config/rabbitmq";

dotenv.config();

const PORT = process.env.PORT || 3000;
let server: http.Server;

const startServer = async () => {
  try {
    await connectToDatabase();
    await connectToPrisma();
    await RabbitMQUtil.getInstance().initialize();

    server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 [server-1]: Server is running on ${PORT} 🔊`);
      process.env.SERVER_START_TIME = new Date().toISOString();
    });
  } catch (err) {
    console.error("💥[server-1]: Error starting server:", err);
    process.exit(1);
  }
};

const gracefulShutdown = () => {
  console.log(
    "🛑[server]: Received kill signal, starting graceful shutdown..."
  );

  server.close(async (err) => {
    if (err) {
      console.error("💥[server-1]: Error closing the server:", err);
      process.exit(1);
    }

    console.log("✅[server-1]: HTTP server closed.");

    try {
      await disconnectFromDatabase();
      await disconnectFromPrisma();
      await RabbitMQUtil.getInstance().disconnect();
      console.log("✅[rabbitmq]: RabbitMQ disconnected.");
      console.log("✅[mongo-database]: Database disconnected.");
    } catch (dbErr) {
      console.error("💥[shutdown]: Error during graceful shutdown:", dbErr);
    }

    process.exit(0);
  });
};

startServer();

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "💥[server-1]: Unhandled Rejection at:",
    promise,
    "reason:",
    reason
  );
});
process.on("uncaughtException", (error) => {
  console.error("⚠️[server-1]: Uncaught Exception thrown:", error);
  gracefulShutdown();
});
