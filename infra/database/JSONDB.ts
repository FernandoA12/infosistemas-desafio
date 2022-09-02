import { Connection } from "./Connection";
import { createWriteStream, createReadStream, existsSync } from "fs";
import { Writable } from "stream";
import { join } from "path";

export class JSONDB implements Connection {
  private path!: string;

  private async read(): Promise<any[]> {
    let data = "";

    return await new Promise((resolve, reject) => {
      const output = createReadStream(this.path);
      output.pipe(
        new Writable({
          write: (chunk, _, cb) => {
            data += chunk.toString();
            cb();
          },
        })
      );
      output.on("end", () => {
        try {
          const document = JSON.parse(data);
          resolve(document);
        } catch {
          reject();
        }
      });
    });
  }

  private async write(data: Object): Promise<void> {
    await new Promise<void>((resolve) => {
      const input = createWriteStream(this.path);
      input.write(Buffer.from(JSON.stringify(data, null, 2)));
      input.end();
      input.on("finish", () => {
        resolve();
      });
    });
  }

  async setCollection(collection: string): Promise<void> {
    this.path = join(__dirname, `../../${collection}.json`);
    if (existsSync(this.path)) {
      try {
        await this.read();
      } catch {
        await this.write([]);
      }
      return;
    }
    await this.write([]);
  }

  async create(params: any): Promise<void> {
    const document = await this.read();
    document.push(params);
    await this.write(document);
  }

  async get(query: any): Promise<any> {
    const document = await this.read();

    if (Object.keys(query).length > 0) {
      return document.filter((doc) =>
        Object.keys(query).some((key) => query[key] === doc[key])
      );
    }

    return document;
  }

  async delete(query: any): Promise<void> {
    const document = await this.read();

    if (Object.keys(query).length <= 0) {
      return;
    }

    await this.write(
      document.filter(
        (doc) => !Object.keys(query).some((key) => query[key] === doc[key])
      )
    );
  }

  async update(query: any, params: any): Promise<void> {
    const document = await this.read();

    if (Object.keys(query).length <= 0) {
      return;
    }

    const documentsUpdated = document.map((doc) => {
      if (Object.keys(query).some((key) => query[key] === doc[key])) {
        doc = {
          ...doc,
          ...params,
        };
      }
      return doc;
    });

    await this.write(documentsUpdated);
  }
}
