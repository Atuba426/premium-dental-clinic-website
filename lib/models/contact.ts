import { Schema, models, model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  phone: { type: String, trim: true, maxlength: 30 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
});

// Reuse the compiled model across hot reloads instead of redefining it,
// which would throw "OverwriteModelError" in dev.
export default models.Contact || model<IContact>("Contact", ContactSchema);
