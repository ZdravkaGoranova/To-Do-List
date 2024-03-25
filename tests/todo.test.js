const { test, expect } = require('@playwright/test');

// Verify if a user can add a task
test('user can add a task', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');

});

// Verify if a user can delete a task
test('user can delet a task', async ({ page }) => {
    // Add a task
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Delete the task
    await page.click('.task .delete-task');

    const tasks =
        await page.$$eval('.task', tasks =>
            tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
});

// Verify if a user can mark as complete
test('user can mark as  complete', async ({ page }) => {
    // Add a task
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Mark the task as complete
    await page.click('.task .task-complete');

    const completedTask =
        await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
});

// Verify if a user can filter
test('user can filter task', async ({ page }) => {
    // Add a task
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Mark the task as complete
    await page.click('.task .task-complete');

    //Filter task
    await page.selectOption('#filter', 'Completed');
    const inCompleteTask = await page.$('.task:not(.completed)');
    expect(inCompleteTask).toBeNull();
});