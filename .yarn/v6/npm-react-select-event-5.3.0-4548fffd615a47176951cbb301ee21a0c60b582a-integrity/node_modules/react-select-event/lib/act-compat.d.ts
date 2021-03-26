/**
 * A simple compatibility method for react's "act".
 * If a recent version of @testing-library/react is already installed,
 * we just use their implementation - it's complete and has useful warnings.
 * Otherwise, we just default to a noop.
 *
 * We need this because react-select-event doesn't actually pin a
 * dependency version for @testing-library/react!
 */
declare type Callback = () => Promise<void | undefined> | void | undefined;
declare type AsyncAct = (callback: Callback) => Promise<undefined>;
declare type SyncAct = (callback: Callback) => void;
declare let act: AsyncAct | SyncAct;
export default act;
