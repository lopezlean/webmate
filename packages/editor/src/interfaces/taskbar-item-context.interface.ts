import { Taskbar } from '../components/taskbar/taskbar';
import { TaskbarActions } from '../components/taskbar/taskbar-actions';

export interface TaskbarItemContextInterface {
  taskbar: Taskbar;
  taskbarActions: TaskbarActions;
}
