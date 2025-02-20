export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  categories: string[];
  dueDate: Date
  startDate: Date
  createdAt: Date
}
