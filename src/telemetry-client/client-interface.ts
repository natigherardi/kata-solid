export default interface Client {
  connect: (connectionString: string) => void;
  disconnect: () => void;
  getOnlineStatus: () => boolean;
  diagnosticMessage: () => string;
  send: (message: string) => void;
  receive: () => string;
}
