import { Schema } from 'mongoose';
import { GradeCreatedEvent } from '../events/grade-created.event';
import { Grade, GradeMethods } from '../models/grade.model';

export const GradeSchema = new Schema<Grade, unknown, GradeMethods>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    }
  },
});

GradeSchema.index({ name: 1 });

export const GradeSchemaName = 'grades';

GradeSchema.pre('save', function (next) {
  if (this.isNew) {
    this.apply(new GradeCreatedEvent(this.id), 'prepend');
  } else {
    this.apply(new GradeCreatedEvent(this.id));
  }
  next();
});
