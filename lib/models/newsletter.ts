import { Schema, models, model } from "mongoose";

export interface INewsletterSubscriber {
  email: string;
  subscribedAt: Date;
}

const NewsletterSchema = new Schema<INewsletterSubscriber>({
  // unique: true creates a MongoDB index that rejects duplicate emails at
  // the database level — the API route also pre-checks for a friendlier
  // error message, but the index is the real guarantee against races.
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 200 },
  subscribedAt: { type: Date, default: Date.now },
});

export default models.NewsletterSubscriber ||
  model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSchema);
