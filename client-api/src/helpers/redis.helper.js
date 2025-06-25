const redis = require("redis");

// Create Redis client
const client = redis.createClient(process.env.REDIS_URL);

// Handle Redis errors
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

// ✅ Connect Redis (only once)
let redisConnected = false;
const connectRedis = async () => {
  if (!redisConnected && !client.isOpen) {
    await client.connect();
    redisConnected = true;
    console.log("✅ Redis connected");
  }
};
connectRedis();

const setJWT = async (key, value) => {
  try {
    await connectRedis(); // 🔒 Ensure connection before usage
    const res = await client.set(key, value);
    return res;
  } catch (err) {
    throw err;
  }
};

const getJWT = async (key) => {
  try {
    await connectRedis(); // 🔒 Ensure connection before usage
    const res = await client.get(key);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = { setJWT, getJWT };
