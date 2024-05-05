import type { Config } from "@netlify/functions";
import { createClient } from "@libsql/client";
import type { TursoCreds, City } from "../../types";

export default async (req: Request) => {
  try {
    const creds: TursoCreds = {
      url: process.env.TURSO_DATABASE_URL || "",
      authToken: process.env.TURSO_AUTH_TOKEN || "",
    };

    const aqiToken = process.env.AQI_TOKEN;

    const client = createClient(creds);

    const resp = await client.execute("SELECT * FROM cities");

    const cities: City[] = resp.rows.map((row) => ({ ...row }));

    cities.forEach(async (city) => {
      try {
        const resp = await fetch(
          `https://api.waqi.info/feed/geo:${city.lat};${city.lng}/?token=${aqiToken}`,
        );
        const respData = await resp.json();
        const dbResp = await client.execute({
          sql: "INSERT INTO records (city_id, hour, value) VALUES (?, ?, ?)",
          args: [
            city.id,
            new Date(respData.data.time.s).getHours(),
            respData.data.aqi,
          ],
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const config: Config = {
  schedule: "@hourly",
};
