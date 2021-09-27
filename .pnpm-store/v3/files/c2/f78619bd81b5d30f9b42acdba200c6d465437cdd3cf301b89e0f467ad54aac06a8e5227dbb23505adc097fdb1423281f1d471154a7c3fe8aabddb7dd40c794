"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnSafeSync = void 0;
const cross_spawn_1 = require("cross-spawn");
const defaultOptions = {
    logStdErrOnError: true,
    throwOnError: true,
};
const spawnSafeSync = (command, args, options) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);
    const result = cross_spawn_1.sync(command, args, options);
    if (result.error || result.status !== 0) {
        if (mergedOptions.logStdErrOnError) {
            if (result.stderr) {
                console.error(result.stderr.toString());
            }
            else if (result.error) {
                console.error(result.error);
            }
        }
        if (mergedOptions.throwOnError) {
            throw result;
        }
    }
    return result;
};
exports.spawnSafeSync = spawnSafeSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bhd25TYWZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NwYXduU2FmZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBK0M7QUFTL0MsTUFBTSxjQUFjLEdBQXFCO0lBQ3ZDLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsWUFBWSxFQUFFLElBQUk7Q0FDbkIsQ0FBQTtBQUVNLE1BQU0sYUFBYSxHQUFHLENBQzNCLE9BQWUsRUFDZixJQUFlLEVBQ2YsT0FBMEIsRUFDMUIsRUFBRTtJQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNoRSxNQUFNLE1BQU0sR0FBRyxrQkFBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEQsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3ZDLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7YUFDeEM7aUJBQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUM1QjtTQUNGO1FBQ0QsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQzlCLE1BQU0sTUFBTSxDQUFBO1NBQ2I7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsYUFBYSxpQkFvQnpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3luYyBhcyBzcGF3blN5bmMgfSBmcm9tIFwiY3Jvc3Mtc3Bhd25cIlxyXG5pbXBvcnQgeyBTcGF3bk9wdGlvbnMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNwYXduU2FmZU9wdGlvbnMgZXh0ZW5kcyBTcGF3bk9wdGlvbnMge1xyXG4gIHRocm93T25FcnJvcj86IGJvb2xlYW5cclxuICBsb2dTdGRFcnJPbkVycm9yPzogYm9vbGVhblxyXG4gIG1heEJ1ZmZlcj86IG51bWJlclxyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0T3B0aW9uczogU3Bhd25TYWZlT3B0aW9ucyA9IHtcclxuICBsb2dTdGRFcnJPbkVycm9yOiB0cnVlLFxyXG4gIHRocm93T25FcnJvcjogdHJ1ZSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwYXduU2FmZVN5bmMgPSAoXHJcbiAgY29tbWFuZDogc3RyaW5nLFxyXG4gIGFyZ3M/OiBzdHJpbmdbXSxcclxuICBvcHRpb25zPzogU3Bhd25TYWZlT3B0aW9ucyxcclxuKSA9PiB7XHJcbiAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxyXG4gIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhjb21tYW5kLCBhcmdzLCBvcHRpb25zKVxyXG4gIGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnN0YXR1cyAhPT0gMCkge1xyXG4gICAgaWYgKG1lcmdlZE9wdGlvbnMubG9nU3RkRXJyT25FcnJvcikge1xyXG4gICAgICBpZiAocmVzdWx0LnN0ZGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0LnN0ZGVyci50b1N0cmluZygpKVxyXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdC5lcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0LmVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWVyZ2VkT3B0aW9ucy50aHJvd09uRXJyb3IpIHtcclxuICAgICAgdGhyb3cgcmVzdWx0XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHRcclxufVxyXG4iXX0=