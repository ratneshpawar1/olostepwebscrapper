import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IScrapedData extends Document {
  url: string;
  content: string;
  statusCode: number;
}

// Create a schema corresponding to the document interface.
const ScrapedDataSchema: Schema = new Schema({
  url: { type: String, required: true },
  content: { type: String, required: true },
  statusCode: { type: Number, required: true },
});

// Create a model from the schema.
const ScrapedData = mongoose.model<IScrapedData>('ScrapedData', ScrapedDataSchema);

export default ScrapedData;
