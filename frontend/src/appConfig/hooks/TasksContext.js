import React, { createContext, useContext } from 'react';

export const initialTasksState = {
  tasks: [],
  total_tasks: null, // INT
  tasks_in_current_page: null, // INT
  current_page: null, // INT
  task_params: {
    search: {
      parameter: null, // STR
      search_for: null, // STR
    },
    sort: {
      parameter: null, // STR
      order: null, // STR
    },
    filter: {
      parameter: null, // []STR
    },
  },
};

export const updateTasksFn = (state, action) => {
  const drillDownFields = (payload, fields, newValue) => {
    if (fields.length > 1) {
      const [field, ...restFields] = fields;
      return {
        ...payload,
        [field]: {
          ...payload[field],
          ...drillDownFields(payload[field] || {}, restFields, newValue),
        },
      };
    } else {
      return {
        ...payload,
        [fields[0]]: newValue,
      };
    }
  };
  switch (action.type) {
    case 'update':
      // tasksDispatch({
      //   type: 'update',
      //   fields: ['task_params', 'search', 'parameter'],
      //   newValue: 'ok',
      // });
      return {
        ...state,
        ...drillDownFields(state, action.fields, action.newValue),
      };
    default:
      console.log('Unknown action: ' + action.type);
  }
};

export const TasksContext = createContext();

export const useTasks = () => {
  return useContext(TasksContext);
};
