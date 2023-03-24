import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `/tasks`,
      }),
    }),
    getTaskById: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // tasks list updated on the UI using pessimistic way

        try {
          const task = await queryFulfilled;
          if (task?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(task.data);
              })
            );
          }
        } catch (err) {}
        // end tasks list updated on the UI using pessimistic way
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // tasks list updated on the UI using pessimistic way
        try {
          const { data: editedTask } = await queryFulfilled;

          if (editedTask?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                const tsk = draft.find((ts) => ts.id == arg.id);

                tsk.taskName = arg.data.taskName;
                tsk.teamMember = arg.data.teamMember;
                tsk.project = arg.data.project;
                tsk.deadline = arg.data.deadline;
                tsk.status = arg.data.status;
              })
            );
          }
        } catch (err) {}
        // end tasks list updated on the UI using pessimistic way
      },
    }),
    editTaskStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic status changes
        const statusRes = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const tsk = draft.find((ts) => ts.id == arg.id);
            tsk.taskName = arg.data.taskName;
            tsk.teamMember = arg.data.teamMember;
            tsk.project = arg.data.project;
            tsk.deadline = arg.data.deadline;
            tsk.status = arg.data.status;
          })
        );
        // end optimistic status changes
        try {
          await queryFulfilled;
        } catch (err) {
          statusRes.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // task delete using optimistic way
        const deleteRes = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((ts) => ts.id == arg.id);
            draft.splice(index, 1);
          })
        );
        // end task delete using optimistic way

        try {
          await queryFulfilled;
        } catch (err) {
          deleteRes.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useEditTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
