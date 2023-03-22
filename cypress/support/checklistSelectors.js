export default {
    modal: {
        modalOption: '.ReactModal__Content'
    },
    checklist: {
        createChecklistButton: '.ccb-blue',
        checklistTitle: '#main > div:nth-child(5) > div > div > div > div:nth-child(2) > h1',
        hideCompletedToggle: '[data-testid="tasklist__hide-completed-tasks-toggle"]',
        deleteList: '.dropdown-menu__link.dropdown-menu__link.dropdown-menu__link--red',
        yesDeleteButton: '.ccb-red'
    },

    tasks: {
        createTask: '.mdi.mdi-plus',
        taskTitle: '#main > div:nth-child(5) > div > div> div> div > div> div> div > div> textarea',
        completeTaskCheck: '#main > div:nth-child(5) > div > div > div.task-container > div > div',
        deleteTask: '.dropdown-menu__link.dropdown-menu__link--red',
        addTasksText: '#main > div:nth-child(5) > div > div > h3'
    }
}