import { isWorker, IGatsbyWorkerMessenger } from "gatsby-worker";
import { ReporterMessagesFromChild } from "gatsby-cli/lib/reporter/types";
import { IJobCreatedMessage, IJobCompletedMessage, IJobFailed } from "../jobs/types";
export declare type MessagesFromParent = IJobCompletedMessage | IJobFailed;
export declare type MessagesFromChild = IJobCreatedMessage | ReporterMessagesFromChild;
export declare type GatsbyWorkerMessenger = IGatsbyWorkerMessenger<MessagesFromParent, MessagesFromChild>;
declare const getGatsbyMessenger: () => GatsbyWorkerMessenger | undefined;
export { isWorker, getGatsbyMessenger as getMessenger };
