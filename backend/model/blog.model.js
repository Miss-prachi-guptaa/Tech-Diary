import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    content: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,   // first ~300 chars of body, you can auto-generate this
    },
    tags: {
      type: [String],
      required: true,
      default: []
    },

    category: {
      type: String,
      required: true,

    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED", "DELETED"],
      default: "DRAFT"
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    embedding: {
      type: [Number],   // array of floats — the vector
      default: undefined, // undefined means "not yet generated"
    },
    embeddingModel: {
      type: String,     // track which model generated this
      default: undefined,
    },
    embeddingUpdatedAt: {
      type: Date,       // when was the last embedding generated
      default: undefined,
    }
  },
  { timestamps: true }
);

// blogSchema.pre("save", function (next) {
//   if (this.isModified("title")) {
//     this.slug =
//       slugify(this.title, { lower: true, strict: true }) +
//       "-" +
//       Date.now();
//   }
//   next();
// });

export const Blogs = mongoose.model("Blog", blogSchema);

