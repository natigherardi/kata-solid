interface TelemetryClientI {
  disconnect: () => void;
  getOnlineStatus: () => boolean;
  connect: (telemetryServerConnectionString: string) => void;
  send: (message: string) => void;
  diagnosticMessage: () => string;
  receive: () => string;
}

export default TelemetryClientI;
