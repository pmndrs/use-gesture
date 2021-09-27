"use strict";

exports.__esModule = true;
exports.jobsV2Reducer = void 0;

const initialState = () => {
  return {
    incomplete: new Map(),
    complete: new Map()
  };
};

const jobsV2Reducer = (state = initialState(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return action.cacheIsCorrupt ? initialState() : state;

    case `CREATE_JOB_V2`:
      {
        const {
          job
        } = action.payload;
        state.incomplete.set(job.contentDigest, {
          job
        });
        return state;
      }

    case `END_JOB_V2`:
      {
        const {
          jobContentDigest,
          result
        } = action.payload;
        const {
          job
        } = state.incomplete.get(jobContentDigest);

        if (!job) {
          throw new Error(`If you encounter this error, it's probably a Gatsby internal bug. Please open an issue reporting us this.`);
        }

        state.incomplete.delete(job.contentDigest); // inputPaths is used to make sure the job is not stale

        state.complete.set(job.contentDigest, {
          result,
          inputPaths: job.inputPaths
        });
        return state;
      }

    case `REMOVE_STALE_JOB_V2`:
      {
        const {
          contentDigest
        } = action.payload;
        state.incomplete.delete(contentDigest);
        state.complete.delete(contentDigest);
        return state;
      }
  }

  return state;
};

exports.jobsV2Reducer = jobsV2Reducer;
//# sourceMappingURL=jobsv2.js.map