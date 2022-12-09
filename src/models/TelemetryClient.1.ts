interface TelemetryClient {
  disconnect: () => void;
  getOnlineStatus: () => boolean;
  connect: (telemetryServerConnectionString: string) => void;
  send: (message: string) => void;
  diagnosticMessage: () => string;
  receive: () => string;
}
