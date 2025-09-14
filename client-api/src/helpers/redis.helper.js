const redis = require("redis");

// ✅ Create Redis client with TLS enabled (required by Upstash)
const client = redis.createClient({
  url: process.env.REDIS_URL,
  //socket: { tls: true },
});

// ❌ Log Redis connection errors
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

// ✅ Connect Redis only once
let redisConnected = false;
const connectRedis = async () => {
  if (!redisConnected && !client.isOpen) {
    await client.connect();
    redisConnected = true;
    console.log("✅ Redis connected");
  }
};
connectRedis();

// 🔐 Set a key (e.g., session token)
const setJWT = async (key, value) => {
  try {
    await connectRedis();
    const res = await client.set(key, value);
    return res;
  } catch (err) {
    throw err;
  }
};

// 🎁 Get a key (e.g., fetch session token)
const getJWT = async (key) => {
  try {
    await connectRedis();
    const res = await client.get(key);
    return res;
  } catch (err) {
    throw err;
  }
};

// 🗑️ Delete a key (e.g., clear session)
const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setJWT, getJWT, deleteJWT };
 