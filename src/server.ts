import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running with Bun on http://localhost:${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
});
