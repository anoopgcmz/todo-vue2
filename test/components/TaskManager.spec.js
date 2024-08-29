// tests/components/TaskManager.spec.js
import { mount } from '@vue/test-utils';
import TaskManager from '@/components/TaskManager.vue';

describe('TaskManager.vue', () => {
  it('adds a new task when the add button is clicked', async () => {
    const wrapper = mount(TaskManager, {
      props: {
        selectedTask: null
      }
    });

    wrapper.setData({ description: 'New Test Task', priority: 'high' });
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('update-tasks')).toBeTruthy();
    const tasks = wrapper.emitted('update-tasks')[0][0];
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toMatchObject({ description: 'New Task', priority: 'high' });
  });
})