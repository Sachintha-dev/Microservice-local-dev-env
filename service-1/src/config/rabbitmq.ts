import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

class RabbitMQUtil {
  private static instance: RabbitMQUtil;
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private rabbitMQUrl: any = process.env.RABBITMQ_URL;

  private constructor() {}

  public static getInstance(): RabbitMQUtil {
    if (!RabbitMQUtil.instance) {
      RabbitMQUtil.instance = new RabbitMQUtil();
    }
    return RabbitMQUtil.instance;
  }

  public async initialize(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.rabbitMQUrl);
      this.channel = await this.connection.createChannel();
      console.log("🐰 [rabbitmq]: Connected to RabbitMQ successfully! ✅");
    } catch (error) {
      console.error("💥 [rabbitmq]: Error connecting to RabbitMQ", error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log("🐰 [rabbitmq]: Disconnected from RabbitMQ successfully! ✅");
    } catch (error) {
      console.error("💥 [rabbitmq]: Error disconnecting from RabbitMQ", error);
    }
  }

  public async consume(
    queue: string,
    callback: (msg: amqp.ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel is not initialized");
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(msg);
        this.channel?.ack(msg);
      }
    });
  }
}

export default RabbitMQUtil;
