import { Question } from "@/types";

export const PY_QUESTIONS_STAFF: Question[] = [
  {
      id: "py-metaclasses-1",
      language: "Python",
      difficulty: "Staff",
      tags: ["python", "metaprogramming", "internals"],
      question: "What is a metaclass and when would you use one?",
      shortAnswer: "A metaclass is a class of a class; it defines how a class behaves and is constructed.",
      keyPoints: [
        "In Python, everything is an object, including classes",
        "Classes are instances of `type` by default",
        "Metaclasses allow for class validation, automatic property addition, or registration at definition time",
        "Commonly used in frameworks like Django (Models) or SQLAlchemy"
      ],
      redFlags: [
        "Confusing metaclasses with class decorators",
        "Using a metaclass when simpler inheritance or decorators would suffice",
        "Not understanding `__new__` vs `__init__` in a metaclass"
      ]
    },
];
