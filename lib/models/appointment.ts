import { Schema, models, model } from "mongoose";

export const SERVICE_OPTIONS = [
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Preventive Care",
  "Restorative Dentistry",
  "Family Dentistry",
  "Dental Implants",
] as const;

export interface IAppointment {
  name: string;
  email: string;
  phone: string;
  service: (typeof SERVICE_OPTIONS)[number];
  preferredDate: string; // stored as YYYY-MM-DD from a native date input
  preferredTime: string; // e.g. "Morning", "Afternoon", "Evening"
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  service: { type: String, required: true, enum: SERVICE_OPTIONS },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true, enum: ["Morning", "Afternoon", "Evening"] },
  notes: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
